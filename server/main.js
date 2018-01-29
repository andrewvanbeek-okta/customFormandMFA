import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    images = new Mongo.Collection('logoImages');
    navColors = new Mongo.Collection('navColors');
    stylingModels = new Mongo.Collection('styleObjects')
    OktaAppConfigurations = new Mongo.Collection("objects")

});



HEY = "YAKA"

Picker.route('/applinks', function(params, req, res, next) {
console.log("test")

    var yeah = "OK"
  console.log(req.body)
  console.log(params)
  console.log(params.query)

    var userId = params.query.userId

console.log(userId)





var route = "https://vanbeektech.okta.com/api/v1/users/" + userId + "/appLinks"

var result = Meteor.http.get(route, {

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": "SSWS" + Meteor.settings.apiToken// replace with SWSS your Api Token
      }
    });

  var response = {data: result.data, object: stylingModels.find().fetch()}

  var something = JSON.stringify(result.data)
  console.log(something[0])
    res.end(JSON.stringify(response));








});


Picker.route('/colors', function(params, req, res, next){


  if(colors.find().fetch().length > 0){
    console.log("TESSST")
    var colorsForNav = colors.find().fetch()
    res.end(JSON.stringify(colorsForNav) )
  } else {
      images.insert({companyLogo: "#fff"})
  }




})


Picker.route('/mfaRoute', function(params, req, res, next){

  var request = require("request");
console.log(params.query.answer)
var number = params.query.number
var options = { method: 'GET',
  url: 'http://vanbeektech.okta.com/api/v1/users/00u1r5knwoSpMubTC1t7',
  headers:
   { 'Postman-Token': '96fe4cda-f5bd-f6a2-58c9-e24da472b9d8',
     'Cache-Control': 'no-cache',
     Authorization: 'SSWS' + Meteor.settings.apiToken,
     'Content-Type': 'application/json',
     Accept: 'application/json' } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
        var bodyToReturn = JSON.parse(body)
        console.log(number)
        console.log(bodyToReturn["profile"]["randomAnswerOne"])
      if(params.query.answer == bodyToReturn["profile"]["randomAnswerOne"]){
          res.end("true")
      } else {
        res.end(JSON.stringify(bodyToReturn["profile"]["randomQuestionOne"]))
      }
  });






})


var postRoutes = Picker.filter(function(req, res) {
  // you can write any logic you want.
  // but this callback does not run inside a fiber
  // at the end, you must return either true or false
  return req.method == "POST";
});

postRoutes.route('/oktaAuth', function(params, req, res, next) {
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://vanbeektech.okta.com/api/v1/authn',
    headers:
     { 'Postman-Token': 'bffd49bf-9e9c-1787-c268-355125889de3',
       'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Accept: 'application/json' },
    body:
     { username: params.query.username,
       password: params.query.password,
       options:
        { multiOptionalFactorEnroll: true,
          warnBeforePasswordExpired: true } },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);

    res.end(JSON.stringify(body))
  });

})


Picker.route('/postAuth', function(params, req, res, next){

if(OktaAppConfigurations.find().fetch().length > 0){
  console.log("addding the files duuuuuuuuuuuuuuuuude")

  console.log(params.query.url)
  console.log(params.query.clientId)
  OktaAppConfigurations.insert({clientId: params.query.clientId, url: params.query.url})




} else {

  console.log("records added")
  var firstId = stylingModels.find().fetch()[0]._id;
    if(params.query.url != undefined){
      OktaAppConfigurations.update({_id : firstId},{$set:{url: params.query.url}});
    } else if(params.query.clientId != undefined){
        OktaAppConfigurations.update({_id : firstId},{$set:{clientId: params.query.clientId}});


    }

}



})



Picker.route('/logos', function(params, req, res, next){


  if(images.find().fetch().length > 0){
    console.log("TESSST")


  } else {
      images.insert({companyLogo: "oracle"})

  }
    navColors.insert({companyLogo: "#fff"})
    var logos = images.find().fetch()
    var colorsForNav = navColors.find().fetch()
    var data = {logos: logos, colors: colorsForNav}
    res.end(JSON.stringify(data) )


})


Picker.route('/setLogos', function(params, req, res, next){

  var companyString = params.query.logoString
    var firstId = images.find().fetch()[0]._id;
    console.log(companyString)
    images.update({_id : firstId},{$set:{companyLogo : companyString}});


  res.end(images)
})


Picker.route('/styleObject', function(params, req, res, next){


  if(stylingModels.find().fetch().length > 0){
    console.log("TESSST")


  } else {
      stylingModels.insert({companyLogo: "oracle", navColor: "#fff", cardColor: "black", headerColor: "black", buttonColor: "#FFF"})

  }

  var models = stylingModels.find().fetch()

  res.end(JSON.stringify(models))

})


Picker.route('/setStyleObject', function(params, req, res, next){

  console.log(params.query.subjectToChange)
  if(params.query.subjectToChange == "navColorForm"){
    var companyString = params.query.logoString

    var firstId = stylingModels.find().fetch()[0]._id;
    console.log(companyString)
    stylingModels.update({_id : firstId},{$set:{navColor: params.query.logoString}});


  } else if(params.query.subjectToChange == "logoForm"){
    var companyString = params.query.logoString
    console.log("AUIHAUIHFUIEUIHUOHUHOHOIHO")
    console.log(companyString)
    var firstId = stylingModels.find().fetch()[0]._id;
    console.log(companyString)
    stylingModels.update({_id : firstId},{$set:{companyLogo: params.query.logoString}});

  } else if(params.query.subjectToChange == "CardColorForm"){

    console.log(params.query.logoString)
    var firstId = stylingModels.find().fetch()[0]._id;

    stylingModels.update({_id : firstId},{$set:{cardColor: params.query.logoString}});

  } else if(params.query.subjectToChange == "textColorForm"){
     var firstId = stylingModels.find().fetch()[0]._id;
    stylingModels.update({_id : firstId},{$set:{headerColor: params.query.logoString}});
  } else if(params.query.subjectToChange == "buttonColorForm"){
      var firstId = stylingModels.find().fetch()[0]._id;
    stylingModels.update({_id : firstId},{$set:{buttonColor: params.query.logoString}});
  }




})
