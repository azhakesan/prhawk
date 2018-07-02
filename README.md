# Welcome to PRHawk

About PRHawk
The PRHawk application listed out all public repo name of user in UI with sorted by open pull request count.
The PRHawk application is developed using below technologies and framework.
   . NodeJs and NPM
   . swagger and jade
The application have two parts.
1. PRHawk API - The API are developed using swagger framework (Please refer YAML file understand more about API i/o design)
   (run: swagger project edit - To edit the swagger design)
2. PRHawk UI - Simple UI page will displayed with all Public Git Repo name associated the user given in the url path parameter. (Jade template framework used to display the UI)
   The UI code will be moved as separate project later.

# Prerequisite
Install NodeJS version 6+ and NPM version 5+ at local system. Please follow the below steps to run the Prerequisite

# Installation
<p>The package.json file contains all dependency NPM modules and follow the steps</p>
 <strong>step 1:</strong> npm install

<p><strong>Step 2:</strong> swagger project start</p>
You can see in console with below localhost url and port. Now, the application is running your system.
project started here: http://localhost:10010/prhawk

<p>To Run the unit test case, please execute the below command. (supertest framework used for testing)</p>
<strong>Step 3:</strong> npm test

<p>To edit the swagger design.</p>
<strong>Step 4:</strong>swagger project edit

# PRHawk API:
<p>[http://localhost:10010/prhawk/{userId}/repo](http://localhost:10010/prhawk/{userId}/repo)</p>
<p>http://localhost:10010/prhawk/user/{userId}?page=1&per_page=1 (with pagination)</p>
e.g
<p>http://localhost:10010/prhawk/azhakesan/repo</p>
<p>http://localhost:10010/prhawk/user/azhakesan?page=1&per_page=1</p>

# PRHawk UI Page
<p>http://localhost:10010/prhawk/user/{userId} </p>
<p>http://localhost:10010/prhawk/user/{userId}?page=1&per_page=1</p>
e.g
<p>http://localhost:10010/prhawk/user/azhakesan </p>
<p>http://localhost:10010/prhawk/user/azhakesan?page=1&per_page=1 (with pagination)</p?

Thank you.!
