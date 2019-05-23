require('dotenv').config();

const config = require('./config.json');
const OAuthClient = require('intuit-oauth');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const ngrok =  (config.ngrok_enabled === true) ? require('ngrok'):null;



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*
App Variables
 */
var oauth2_token_json=null,
    realmId = '',
    accessToken = '',
    payload = '';
    scope='';
var fields = ['realmId', 'name', 'id', 'operation', 'lastUpdated'];
var newLine= "\r\n";

/**
 * Instantiate new Client
 * @type {OAuthClient}
 */

var oauthClient = new OAuthClient({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  environment: config.environment,
  redirectUri: config.redirectUri
});

app.use(express.static('views'));

app.get('/', function(req, res) {

    // Render home page with params
    res.render('index', {
        redirect_uri: config.redirectUri,
        oauth2_token_json: oauth2_token_json
    });
});


app.get('/authorize', urlencodedParser, function(req,res) {

  var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting],state:'intuit-test'});
  res.send(authUri);

});


app.get('/callback', urlencodedParser, function(req, res) {

  console.log('The callback called ');
  oauthClient.createToken(req.url)
    .then(function(authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
      console.log('The callback called inside '+oauth2_token_json);
      accessToken = authResponse.getJson();
      // oauth2_token_json = JSON.stringify(accessToken, null,2);
      // console.log('The access tokeb is inside:'+oauth2_token_json);
      res.send('');
    })
    .catch(function(e) {
      console.error(e);
    });

  // res.send('Thanks');

       
});

app.get('/viewToken', urlencodedParser, function(req,res){

  res.send(oauth2_token_json);

})

app.get('/connected', function(req, res) {

    console.log("The value of token is  coinnected :"+oauth2_token_json);
    res.render('index', {
        oauth2_token_json: oauth2_token_json,
        test: 'tresttet'
    });
});


app.post('/refreshAccessToken', urlencodedParser, function(req,res){

  oauthClient.refresh()
    .then(function(authResponse){
      console.log('The Refresh Token is  '+ JSON.stringify(authResponse.getJson()));
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
      res.send(oauth2_token_json);
    })
    .catch(function(e) {
      console.error(e);
    });

});


app.get('/launch', urlencodedParser , function(req,res) {

  var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.OpenId,OAuthClient.scopes.Email,OAuthClient.scopes.Profile,OAuthClient.scopes.Address,OAuthClient.scopes.Address],state:'intuit-test'});
  res.send(authUri);

});


app.post('/getCompanyInfo', urlencodedParser , function(req,res){

  const companyID = oauthClient.getToken().realmId;
  const url = config.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;

  oauthClient.makeApiCall({url: url + 'v3/company/' + companyID +'/companyinfo/' + companyID})
    .then(function(authResponse){
      console.log("The response for API call is :"+JSON.stringify(authResponse));
      // const apiResp = JSON.stringify(aut
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function(e) {
      console.error(e);
    });
});



// Start server on HTTP (will use ngrok for HTTPS forwarding)
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

