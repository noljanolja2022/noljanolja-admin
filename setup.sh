VERSION=0.1.0
CLUSTER_NAME=development-cluster
REGION=asia-northeast3
APP_NAME=app
IMAGE_NAME=$REGION-docker.pkg.dev/noljanolja2023/noljanolja-admin/$APP_NAME:$VERSION

# Create a Kubernetes Deployment for your `app` Docker image.
kubectl create deployment $APP_NAME --image=$IMAGE_NAME

# Set the baseline number of Deployment replicas to 3.
kubectl scale deployment $APP_NAME --replicas=1

# Create a HorizontalPodAutoscaler resource for your Deployment.
kubectl autoscale deployment $APP_NAME --cpu-percent=80 --min=1 --max=5

# Check pods created (optional)
# kubectl get pods

# Use the kubectl expose command to generate a Kubernetes Service for the app deployment:
kubectl expose deployment $APP_NAME --name=admin-app-service --type=LoadBalancer --port 80 --target-port 80

# Get Current service (optional)
# kubectl get service