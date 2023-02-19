VERSION=0.1.4
CLUSTER_NAME=development-cluster
REGION=asia-northeast3
APP_NAME=app
IMAGE_NAME=$REGION-docker.pkg.dev/noljanolja2023/noljanolja-admin/$APP_NAME:$VERSION

# Build docker image
docker build . -t $IMAGE_NAME

# Push image to artifact registry
docker push $IMAGE_NAME

# IF FIRST TIME SETUP, RUN THIS
# setup.sh

# Ensure that you are connected to your GKE cluster.
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION

# Update existing deployment with this new version
kubectl set image deployment/$APP_NAME $APP_NAME=$IMAGE_NAME

#uncomment this to debug
# exec $SHELL 