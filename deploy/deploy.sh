#!/bin/bash

# Exit on any error
set -e

gcloud container clusters create movie-cluster-1 --zone asia-east1-a
kubectl create -f ./deploy/secrets.yml
kubectl create -f ./deploy/deployment.yml
kubectl expose deployment movierecapi-deployment --type=LoadBalancer --name=movierecapi-service
mongo --host 130.211.242.156 -u moviedbadmin -p xudk74scgUVG --authenticationDatabase admin
mongoimport --host 35.194.236.2 --port 27017 -u root -p wUn9bakXptqo --authenticationDatabase admin --db moviedb --collection movies --type json --file mongo-sidecar/moviedata.json --jsonArray