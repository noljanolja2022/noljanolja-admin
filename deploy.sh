# Fetch app version from package.json
VERSION='latest';
re="\"(version)\": \"([^\"]*)\"";

while read -r l; do
    if [[ $l =~ $re ]]; then
        value="${BASH_REMATCH[2]}";
        VERSION="$value";
    fi
done < package.json;
ENV=$1
if [[ $1 == 'prod' ]]; 
then
    CLUSTER_NAME="production-cluster"
    PROJECT_NAME="nolgobulja-2023"
    ARTIFACT_FOLDER="nolgobulja-admin"
else
    CLUSTER_NAME="development-cluster"
    PROJECT_NAME="noljanolja2023"
    ARTIFACT_FOLDER="noljanolja-admin"
fi

REGION=asia-northeast3
APP_NAME=admin-app
IMAGE_NAME=$REGION-docker.pkg.dev/$PROJECT_NAME/$ARTIFACT_FOLDER/$APP_NAME:$VERSION

# Choose appropriate project
gcloud config set project $PROJECT_NAME

# Ensure that you are connected to your GKE cluster.
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION

# Build docker image
docker build --platform linux/amd64 --no-cache . -t $IMAGE_NAME

# Push image to artifact registry
docker push $IMAGE_NAME

# IF FIRST TIME SETUP, RUN THIS
# ./setup.sh $APP_NAME $IMAGE_NAME

# ELSE IF Update existing deployment with new version, RUN THIS
kubectl set image deployment/$APP_NAME $APP_NAME=$IMAGE_NAME
kubectl rollout restart deployment/$APP_NAME 

#uncomment this to debug
# exec $SHELL