# build environment
FROM node:18-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Bundle static assets with nginx
FROM nginx:alpine as production

# server environment
ENV NODE_ENV production

# Add your nginx.conf
# Copy built assets from `react-build` image
COPY --from=react-build /app/build /usr/share/nginx/html
# Delete default config of nginx
RUN rm /etc/nginx/conf.d/default.conf
# Apply local nginx config
COPY nginx.conf /etc/nginx/conf.d

# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ENV PORT 8080
# ENV HOST 0.0.0.0
# EXPOSE 8080
# CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"