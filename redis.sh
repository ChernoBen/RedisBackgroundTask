#!/bin/bash
sudo docker run --name redis -p 6379:6379 -d -t redis:alpine