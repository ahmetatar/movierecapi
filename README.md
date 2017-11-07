# Movie Recommendation API

[![CircleCI](https://circleci.com/gh/ahmetatar/movierecapi/tree/master.svg?style=svg)](https://circleci.com/gh/ahmetatar/movierecapi/tree/master)

This is a simple microservice developed with node.js, which suggests random 5 movies when every request is sent.It uses a mongo replicaset managed by kubernetes with a statefulset to store the movie data.In addition, the API application has been exposed out using google cloud container engine.

## Prerequisites

1. Google Cloud SDK
2. Kubectl
3. Docker & Docker Compose
4. Node.js
5. CircleCI account
