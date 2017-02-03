/**
 * Created by User on 2/1/2017.
 */
var mongoose = require('mongoose');
module.exports =function(){
    mongoose.connect('mongodb://sfi-admin:born77villain77sfi@ds137149.mlab.com:37149/sayfuckit', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
        }
    });
};