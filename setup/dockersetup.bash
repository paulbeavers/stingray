#!/bin/bash

echo Installing prequisites

echo installing node.js

apt-get install node.js
apt-get install npm
cd /opt/stingray/restserver
npm install restify
npm install pg
npm install winston

