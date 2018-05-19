// Jan 1st 1970 00:00:00 am

// let date = new Date();
// let months = ['Jan', 'Feb'];
// console.log(date.getMonth());


const moment = require('moment');

// let date = moment();
// console.log(date.format('MMM Do, YYYY'));
//
// let date = moment();
// console.log(date.format('h:mm a'));

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

let date = moment(someTimeStamp);
console.log(date.format('h:mm a'));