#!/bin/bash

echo Installing prequisites

echo installing node.js

sudo apt-get install node.js
sudo apt-get install npm
cd ../restserver
sudo npm install restify
sudo npm install pg

