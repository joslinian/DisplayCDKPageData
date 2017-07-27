# DisplayCDKPageData
Gives a link to CDK page in local server context, hydra context, HAR data and data layer. Shows debug parameters as easy to read json objects for given CDK hydra page in one click.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. Clone repo http://stash.cdk.com/projects/WH/repos/displaycdkpagedata/browse to your chosen directory.
2. Open: chrome://extensions
3. Choose: "Load unpacked extensions" (Button near the top left of the browser window)
4. Using the "select extension directory" popup, navigate to the directory with the repo. Then navigate to the "app" directory within the repo and press "select". DO NOT select froom the root directory or the extension wont work.
5. You should now have a working extension.

### Be Aware:
1. This extension is meant to make the internal development process at CDK easier. It will not work on non CDK websites, nor will it work outside CDK network, so you will need to be logged into VPN if you are WFH.

### Development:
#### If you wish to extend / develop this extension please know the following:
1. Development should be done in "src/" directory. You can use ES6 and any isomorphic (not server runtime dependant) npm modules and / LESS for CSS preprocessing. The build system will compile all this to minified, browser-compliant ES5 using Babel, Browserify.

2. You can check your code for any extension-breaking issues with:
```
npm run lint
```
3. You can compile and minify everything in "src/" and send the results to "/app" where the code will run with:
```
npm run build
```
4. If you want to run the build everytime you save a change during dev process, you can run:
```
npm run watch
```
This will run the build everytime a file change is detected in "src/"
5. If you clone this repo and have any trouble installing dependancies or have any other dependancy related problems - try running:
```
npm run installClean
```
This will wipe all modules and reinstall from scratch. MAKE SURE YOU USE registry=https://registry.npmjs.org/ and not registry=http://artifactory.cobalt.com/artifactory/api/npm/npm-repo in your .npmrc file as artifactory does not have all dependancies for developing this extension.
