CordovaBuild
------

[![Build Status](https://travis-ci.org/AlexKvazos/CordovaBuild.svg)](https://travis-ci.org/AlexKvazos/CordovaBuild) [![Cordova Version](http://img.shields.io/badge/Cordova-3.6.3-blue.svg)](http://cordova.apache.org/docs/en/3.6.0/) [![Dependency Status](https://david-dm.org/alexkvazos/CordovaBuild.svg)](https://david-dm.org/alexkvazos/CordovaBuild)

Building Cordova applications is fun, however, there are missing features that could help improve the development process. With this boilerplate, my goal is to provide a better way of making applications with automated tasks using Grunt. I am open to your suggestions.


**By using this boilerplate, you will be able to:**

 - Automate the overall build process with Grunt tasks.
 - Lint your javascript files when building to make sure your application will run.
 - Compress your Javascript into a single file for a lighter file size.
 - Compress your CSS into a single file for a lighter file size.
 - Automate the process of moving the app's icons and splash screens into their folders.
 - Precompile your Handlebars ".hbs" templates for faster render times.
 - Testing with TravisCI
 - *And more features to come...*

-----

**Before you start**

*Be sure that you have a stable version of NodeJS installed as well as Grunt-CLI.*

    brew install node # Required by Cordova and CordovaBuild
    npm install -g grunt-cli # Required by CordovaBuild

-----

**Preparing your workspace**

*This will download the boilerplate and install the npm modules required for everything to work*

    git clone https://github.com/AlexKvazos/CordovaBuild.git
    cd CordovaBuild
    npm install

-----

**Building your application**

*All your application should live in the app/ folder. You will no longer work on the www/ folder.*

    grunt build

-----

**Compiling for iOS**

*This will prepare your iOS application by making an xCode Project and moving the icons/splashscreens into the xCode Resources folder. You should build your application before running this task.*

    grunt ios

-----

**TODO:**

- Automate android building process
- Bower integration