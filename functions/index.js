const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');

admin.initializeApp(functions.config().firebase);
const applicationRef = admin.database().ref('/application');
const eventsRef = admin.database().ref('/application/events');
const foodEventsRef = admin.database().ref('/application/foodEvents');

let baseAccount;

applicationRef.on('value', snapshot => {
  baseAccount = snapshot.val().account;
});

exports.updateScreen = functions.https.onRequest((req, res) => {
  const screen = req.query.screen;
  applicationRef.update({ screen }).then(snapshot => {
    res.send(200);
  });
});

exports.updateAccount = functions.https.onRequest((req, res) => {
  const subtractionValue = +(+req.query.value).toFixed(2);
  const preciseCalculation = (baseAccount * 100 - subtractionValue * 100) / 100;
  applicationRef
    .update({ account: preciseCalculation })
    .then(snapshot => {
      res.send(200);
    });
});

exports.addEvent = functions.https.onRequest((req, res) => {
  const str = req.query.str;
  const strSplit = str.split(' on ');
  const title = strSplit[0]
    .split(' ')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
  const date = moment(strSplit[1], 'MMM Do YYYY').format('YYYY-MM-DD');
  eventsRef.push({ title, date }).then(snapshot => {
    res.send(200);
  });
});

exports.addFoodEvent = functions.https.onRequest((req, res) => {
  const str = req.query.str;
  const strSplit = str.split(' on ');
  const title = strSplit[0]
    .split(' ')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
  const date = moment(strSplit[1], 'MMM Do YYYY').format('YYYY-MM-DD');
  foodEventsRef.push({ title, date }).then(snapshot => {
    res.send(200);
  });
});
