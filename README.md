# ionwc-client
Javascript web client for Eye on Western Canada

Author: Dylan Grandmont, (C) 2016-2018


# Introduction

Eye on Western Canada (IONWC) has three components: 
* Web client: web-based mapping platform hosted at http://ionwc.com/map.
See https://github.com/dylangrandmont/ionwc-client
* Database Parser: collection of code to download, update, and parse data for mapping.
See https://github.com/dylangrandmont/ionwc
* Google Account: hosts Fusion Tables, which act as the database which is read by (1). The account name is ionwestcan@gmail.com


# Getting Started

## System Requirements

Depedencies:
* Node.js

## Building the web client

On the command line, run the following
```
npm install browser-sync --save-dev
npm install --save-dev gulp-zip
npm install --save-dev gulp-chmod
npm install --save-dev gulp-jasmine
npm install karma --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-jasmine --save-dev
```

To run the web client, execute
```
gulp watch
```

# Information for Developers

## Running Unit Tests

To run the full suite, execute
```
gulp test
```

## Looking to Contribute?
Below is a list of potential improvements

### Add Facilities Map
* Need to introduce a facilities view

### Unit Test Coverage
* Increase coverage of Javascript unit test coverage


# Copyright Notice
This README and the entire contents of this directory are copyright of Dylan Grandmont, 2016-2018.
