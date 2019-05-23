/*jslint browser: true*/
/*global $, jQuery, alert*/
(function($) {
    'use strict';

    $(function() {

        $(document).ready(function() {

          /*
          Connect to Quickbooks
           */

            $("#connectToQuickbooks").click(function(e) {


                e.preventDefault();

                console.log('Button clicked ');

                  // Generate the authUri
                  $.get('/authorize', function (uri) {
                    var parameters = "location=1,width=800,height=650";
                    parameters += ",left=" + (screen.width - 800) / 2 + ",top=" + (screen.height - 650) / 2;
                    var win = window.open(uri, 'connectPopup', parameters);
                    var pollOAuth = window.setInterval(function () {
                      try {
                        if (win.document.URL.indexOf("code") != -1) {
                          window.clearInterval(pollOAuth);
                          win.close();
                          location.reload();
                        }
                      } catch (e) {
                        console.log(e)
                      }
                    }, 100);
                  });
            });


            /*
            Function to View the Tokens
             */
            $('#viewToken').click(function(e){

              e.preventDefault();
              $.get('/viewToken', function(data) {
                $("#accessToken").text(data);
              });
            });


          /*
          Function to GetCompanyInfo
           */
            $('#getCompanyInfo').click(function(e){

                e.preventDefault();
                $.post('/getCompanyInfo', function(data) {
                  $("#apiCall").html(JSON.stringify(data, null, 4));
                });
            });


          /*
          Function to Refresh Token
           */
          $('#refreshToken').click(function(e){

            e.preventDefault();
            $.post('/refreshAccessToken', function(data) {
              $("#accessToken").text(data);
            });
          });

        });
    });

}(jQuery, this));