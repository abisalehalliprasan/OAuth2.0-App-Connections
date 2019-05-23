[![npm (scoped)](https://img.shields.io/npm/v/@cycle/core.svg)]()
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![David](https://img.shields.io/david/expressjs/express.svg)](IntuitDeveloper/OAuth2.0-demo-nodejs)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b079893eb3de99976cf/maintainability)](https://codeclimate.com/github/IntuitDeveloper/OAuth2.0-demo-nodejs/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/anilkumarbp/Glipped/badge.svg?branch=master)](https://coveralls.io/github/anilkumarbp/Glipped?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1a93e14e3fb64451ad707cbd7c843458)](https://www.codacy.com/app/anilkumarbp/OAuth2.0-demo-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=IntuitDeveloper/OAuth2.0-demo-nodejs&amp;utm_campaign=Badge_Grade)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/IntuitDeveloper/OAuth2.0-demo-nodejs/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/IntuitDeveloper/OAuth2.0-demo-nodejs/?branch=master)
 

Sample App to Test App Connections : OAuth2.0-DevX-UI
==========================================================

## Overview

This is a sample `Demo` app built using Node.js and Express Framework to showcase how to Authorize using `OAuth2.0` and/OR `OpenID Connect`. Also, how to make API calls using the [node-quickbooks](https://github.com/mcohen01/node-quickbooks) SDK after Authorization.

We will showcase how to integrate your app with the Intuit Developer Platform. It showcases the following:

* Authorize via [OAuth2.0](https://developer.intuit.com/docs/00_quickbooks_online/2_build/10_authentication_and_authorization/10_oauth_2.0) AND learn more about how to include [OpenIDConnect](https://developer.intuit.com/docs/00_quickbooks_online/2_build/10_authentication_and_authorization/50_identity/20_openid_connect) in your app
* API call using the above generated ( access token / refresh token ) to `GetCompanyInfo` ( refer our [API Explorer](https://developer.intuit.com/v2/apiexplorer?apiname=V3QBO) for more API Endpoints ) 


## Installation

### Via Github Repo (Recommended)

```bash
$ git clone https://github.com/abisalehalliprasan/OAuth2.0-App-Connections
$ cd OAuth2.0-App-Connections
$ npm install
```

## Pre-requisites

* **Create an Intuit Developer account and app**:  
You must have an Intuit Developer account and have created an app. To know more refer ot he [Get Started](https://developer.intuit.com/docs/00_quickbooks_online/1_get_started/00_get_started) 
* **Get client keys**:    
  Obtain OAuth 2.0 client keys from your app's dashboard on developer.intuit.com.  To locate the app's dashboard, sign in to developer.intuit.com and click My Apps. Find and open the app you want. From here, click the `Keys & OAuth` tab. There are two versions of this key:
  * Development keys—use only in the sandbox environment.
  * Production keys—use only in the production environment. 
* **Define redirect URI**:  
 On the app setting page, create one or more redirect URIs. These URIs handle responses from the OAuth 2.0 server and are called after the user authorizes the connection.
* Assumes Node is installed in your machine. 


## Configuration

Copy the contents from `config-sample.json` to `config.json`:
```bash
$ cp config-sample.json config.json
```
Edit the `config.json` file to add your:  

* **clientId:** You can find your `clientId` from the `Keys & OAuth` tab under your `App` listed on the developer portal
* **clientSecret:** You can find your `clientSecret` from the `Keys & OAuth` tab under your `App` 
* **redirectUri:** The `redirectUri` for your app ( **OAuth2.0** )
* **environment:** The `environment` for your app ( **sandbox || production** ) 


** If you are not able to locate your App Credentials (Keys) follow the link [here](https://developer.intuit.com/docs/00_quickbooks_online/1_get_started/40_get_development_keys)

By default, the RedirectURI is set to the following for this demo:

`http://localhost:3000/callback`

## Usage

```bash
$ npm start
```

### Start ngrok (if you are using ngrok )

```bash
$ ngrok http 3000
```

Go to the URL (you must start ngrok if using it):

```
https://755c8b38.ngrok.io/
````









