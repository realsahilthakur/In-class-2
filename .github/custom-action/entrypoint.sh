#!/bin/sh

echo "Installing dependencies..."
npm install
npm install --save-dev jest

echo "Running tests with Jest..."
npx jest