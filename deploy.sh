#!/bin/bash

# Exit on any error
set -e

sudo /opt/google-cloud-sdk/bin/gcloud docker push us.gcr.io/${PROJECT_NAME}/api
sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube
kubectl patch deployment movie-recommendation-api -p '{"spec":{"template":{"spec":{"containers":[{"name":"movie-recommendation-api","image":"us.gcr.io/circle-ctl-test/api:'"$CIRCLE_SHA1"'"}]}}}}'