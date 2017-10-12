#!/bin/bash

# Exit on any error
set -e

gcloud container clusters create movie-cluster-1 --zone asia-east1-a
kubectl create -f ./configs/secrets.yml
kubectl create -f ./configs/deployment.yml
kubectl expose deployment movierecapi-deployment --type=LoadBalancer --name=movierecapi-service