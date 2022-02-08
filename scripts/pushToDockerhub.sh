#!/bin/bash

docker build --platform linux/amd64 . -t=superj80820/messfar-frontend
docker push superj80820/messfar-frontend