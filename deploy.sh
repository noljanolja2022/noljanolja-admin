# Fetch app version from package.json
VERSION='latest';
re="\"(version)\": \"([^\"]*)\"";

while read -r l; do
    if [[ $l =~ $re ]]; then
        value="${BASH_REMATCH[2]}";
        VERSION="$value";
    fi
done < package.json;
CLUSTER_NAME=development-cluster
REGION=asia-northeast3
APP_NAME=admin-app
IMAGE_NAME=$REGION-docker.pkg.dev/noljanolja2023/noljanolja-admin/$APP_NAME:$VERSION
# Build docker image
docker build --no-cache . -t $IMAGE_NAME

# Push image to artifact registry
docker push $IMAGE_NAME

# Ensure that you are connected to your GKE cluster.
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION

# IF FIRST TIME SETUP, RUN THIS
# ./setup.sh $APP_NAME $IMAGE_NAME

# ELSE IF Update existing deployment with new version, RUN THIS
kubectl set image deployment/$APP_NAME $APP_NAME=$IMAGE_NAME
# kubectl rollout restart deployment/$APP_NAME 

#uncomment this to debug
# exec $SHELL