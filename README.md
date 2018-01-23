
# portalforifp

This project uses meteor so to install meteor by following this guide:
https://guide.meteor.com/#quickstart

Once meteor is installed

cd into portalforifp(or whatever repo/folder you name it)
meteor npm install

also run npm install to install the npms(just to be sure)

also run

meteor add session

meteor add http

meteor add meteorhacks:picker

then run
meteor --settings settings.json


then you should see Meteor server running on: http://localhost:3000/

create a settings json.

format should be like so

{"public": {
  "clientId": "your client id from okta",
  "oktaUrl": "your okta url"
},
  "apiToken": "your token",
}


From there just edit all the values in the settings.json to match your okta tenant.  

Make sure to generate an Okta api Token and replace it in server > main.js file.

okta doc: https://developer.okta.com/docs/api/getting_started/getting_a_token.html

Also add http://localhost:3000 to your cors trust origins in your okta tenant.

okta doc: https://developer.okta.com/docs/api/getting_started/enabling_cors.html

Then done!
