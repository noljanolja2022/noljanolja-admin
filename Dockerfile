# build environment
# FROM node:18-alpine as react-build
# WORKDIR /app
# COPY . ./
# RUN yarn
# RUN yarn build

# Bundle static assets with nginx
FROM nginx:alpine as production

# server environment
ENV NODE_ENV production

# Copy built assets from `react-build` image
COPY dist /usr/share/nginx/html
# Apply local nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]