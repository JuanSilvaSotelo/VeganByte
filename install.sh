#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install Node.js first."
    exit
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install npm first."
    exit
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Build the project (optional)
echo "Building the project..."
npm run build

echo "Installation complete. You can now run the project using 'npm start'."