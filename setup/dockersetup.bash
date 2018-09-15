#!/bin/bash

echo Installing prequisites

echo installing node.js

apt-get -y install node.js
apt-get -y install npm
cd /opt/stingray/restserver
npm install restify
npm install pg
npm install winston

