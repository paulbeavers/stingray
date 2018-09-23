#!/bin/bash

echo Installing prequisites

echo installing node.js

apt-get install node.js
apt-get install npm
cd /home/pbeavers/stingray/restserver
sudo npm install restify
sudo npm install pg
sudo npm install winston

