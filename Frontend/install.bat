@echo off

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js could not be found. Please install Node.js first.
    exit /b
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm could not be found. Please install npm first.
    exit /b
)

:: Install project dependencies
echo Installing project dependencies...
npm install

:: Build the project (optional)
echo Building the project...
npm run build

echo Installation complete. You can now run the project using 'npm start'.