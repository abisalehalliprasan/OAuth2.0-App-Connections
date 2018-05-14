[![Build Status](https://travis-ci.org/IntuitDeveloper/OAuth2.0-demo-nodejs.svg?branch=master)](https://travis-ci.org/IntuitDeveloper/OAuth2.0-demo-nodejs)
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
$ git clone https://github.com/IntuitDeveloper/OAuth2.0-DevX-UI
$ cd OAuth2.0-DevX-UI
$ npm install
```

## Pre-requisites

* **Create an Intuit Developer account and app**:  
You must have an Intuit Developer account and have created an app. To know more refer ot he [Get Started](https://developer.intuit.com/docs/00_quickbooks_online/1_get_started/00_get_started) 
* **Get client keys**:    
  Obtain OAuth 2.0 client keys from your app's dashboard on developer.intuit.com.  To locate the app's dashboard, sign in to developer.intuit.com and click My Apps. Find and open the app you want. From here, click the Keys tab. There are two versions of this key:
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

* **clientId:** You can find your `clientId` from the `Keys` tab under your `App` listed on the developer portal
* **clientSecret:** You can find your `clientSecret` from the `Keys` tab under your `App` 
* **redirectUri:** The `redirectUri` for your app ( **OAuth2.0** )
* **useSandbox:** `true` for Sandbox ; `false` for Production 

** If you are not able to locate your App Credentials (Keys) follow the link [here](https://developer.intuit.com/docs/00_quickbooks_online/1_get_started/40_get_development_keys)

By default, the RedirectURI is set to the following for this demo:

`http://localhost:3000/callback`


## Instruction on Deploying it to AWS using Sceptre

Creating AWS stack :

1.) Have a Learning / Staging / Production Account

2.) Follow the steps mentioned in the awesome-service-aws repo to get your environment created for running the scripts:  
    https://github.intuit.com/idg/awesome-service-aws-config

3.) Follow the Pre-Requisites mentioned in the repository above.

4.) Set the config credentials under ~/.ssh
	
      ~/.ssh  ( goto Finder -> Go -> Go to Folder -> ~/.ssh )
          
* Create a file named config and copy the below:

	```Host review-service-bastion-prod
	Hostname {hostname of Bastion Instance}
	User ec2-user
	IdentityFile ~/.ssh/sbg-idg-awesome-preprod.pem 
	ForwardAgent yes

	Host review-service-prod-1
	Hostname  {hostname / private IP of the instance that you are SSH’ing into}
	ProxyCommand ssh -W %h:%p review-service-bastion-prod
	User ec2-user
	IdentityFile ~/.ssh/sbg-idg-awesome-preprod.pem 
	ServerAliveInterval 60
	  ForwardAgent yes
	  ForwardX11 yes
	  LogLevel QUIET
	  ServerAliveInterval 60
	  StrictHostKeyChecking no
	  UserKnownHostsFile /dev/null
	  TCPKeepAlive yes
	Host *.a.intuit.com
	  User ec2-user```

* Change the values in the above file 

	```
	IdentityFile ~/.ssh/sbg-idg-awesome-preprod.pem
	
	( make sure this reflects the name of the security file created by the stack )     
	```

5.) Set the config credentials under ~/.aws
 
	~/.aws  ( goto Finder -> Go -> Go to Folder -> ~/.aws )

*  Create a file named config 

    ```
    [default]
	    region = us-west-2    
        output = json  
	    [profile preprod]  
        s3 =
        signature_version = s3v4
    ```
* Create a file named credentials and paste your temporary API Keys from AWS ( developer portal ) : https://devportal.intuit.com

    ```
        [preprod]
        aws_access_key_id = << Enter your aws_access_key_id >>
        aws_secret_access_key = << Enter your secret_access_key >>
        aws_session_token = << Enter your aws_session_token >> 
    
    ```
5.) Launch the Environment ( creates the AWS stack ) :  
      https://github.intuit.com/idg/awesome-service-aws-config#launch-environment-preprod-example    

6.) You can deploy the code to the new environment using the steps mentioned in the above link.   
     **Ex** : aws s3 cp awesome-service-deploy/target/awesome-service.zip s3://awesome-service-codepipeline-source-{{AWS_ACCOUNT_ID}}-us-west-2/awesome-service-pipeline/awesome-service.zip  
     **Note** : the path awesome-service-deploy/target/awesome-service.zip —> refers to the zip file of your code.  
     
In addition you would need to create a `appspec.yml` with a `scripts` folder to guide Code-Deploy to Deploy your app.


## Manually Deploying Code to S3 Bucket

If you are manually deploying code to S3 Bucket. Make sure you create a folder inside `{sample-app-name}-codepipeline-source-xxxxxxxxx-us-west-2`:

```
{sample-app-name}-pipeline
```

1.) Zip your code at the root level ( where you specify the `appspec.yml`) : For Mac use the below command to .zip yout code:    
2.) cd into the root folder of your app to be deployed

```
zip -r -X /awesome-service.zip ./
```








