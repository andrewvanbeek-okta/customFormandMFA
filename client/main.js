import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


var Ajax = require('simple-ajax');

var hey = []



console.log(OktaAppConfigurations.find().fetch())


console.log()

OktaUrls = new Mongo.Collection('urls')
ClientIds = new Mongo.Collection('clientIds')



if(Meteor.is_client) {
  OktaUrls.allow({
           insert: function () {
           return true;
           },
           update: function () {
           return true;
           },
            publish: function () {
           return true;
           },
           remove: function () {
           return true;
           }
           });
}


import './main.html';



  var authClient = new OktaAuth({
    url: Meteor.settings.public.oktaUrl,
    clientId: Meteor.settings.public.clientId,
    redirectUri: 'http://localhost:3000/authorization-code/callback'
	});

var signIn = new OktaSignIn({
  baseUrl: Meteor.settings.public.oktaUrl,
  logo: '/userLogin.png',
  clientId: Meteor.settings.public.clientId,
  redirectUri: 'http://localhost:3000/authorization-code/callback',
  authParams: {
// display: 'page',
  responseType: 'code',
  scopes: ['openid']
  }
});





  signIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {
        console.log(response)
        $("#userName").append(response.login)
         Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged in")
      } else {
        Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged out")
      }
  });







Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.apps.helpers({
  appsTabs: Session.get("appLinksToShow")
})



Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

 Template.login.events({
    'click .button': function (e) {
      console.log("gets here")

   var signIn = new OktaSignIn({
  baseUrl: Meteor.settings.public.oktaUrl,
  clientId: Meteor.settings.public.clientId,
  redirectUri: 'http://localhost:3000/authorization-code/callback',
  authParams: {
// display: 'page',
  responseType: 'code',
  scopes: ['openid']}
  });

  signIn.session.get((response) => {
      if (response.status !== 'INACTIVE') {

         Session.set("loggedOut", response.status == 'INACTIVE')

      } else {
        Session.set("loggedOut", response.status == 'INACTIVE')
        console.log("logged out")
      }
      console.log(response.status)

  });

    }

  });


Template.body.rendered = function() {

}

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});



console.log("HI")
console.log(Session.get("loggedOut"))

Template.body.helpers({

	showLogin() { return Session.get("loggedOut") }

})
