#!/bin/bash

if [ ! -f initdb ]
then
    mongoimport --host mongodb --port 27017 --db moviedb --collection movies --type json --file /tmp/moviedata.json --jsonArray
    touch initdb
fi