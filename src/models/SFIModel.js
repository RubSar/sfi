/**
 * Created by User on 2/1/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
    name: String
});

var SFISchema = new Schema({
    reason: String,
    userId: {type: Schema.ObjectId, ref: 'User'},
    targetId: {type: Schema.ObjectId, ref: 'User'}
});

var UserSchema = new Schema({
    facebookId: String,
    email: String,
    displayName: String,
    fullName: String,
    SFIs: [{type: Schema.ObjectId, ref: 'SFI'}]

});

var TargetSchema = new Schema({
    name: String,
    description: String,
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    SFIs: [{type: Schema.ObjectId, ref: 'SFI'}],
    SFIsCount: {type: Number, default: 0}
});
TargetSchema.index({name: 'text'});


var Category = mongoose.model('Category', CategorySchema);
var User = mongoose.model('User', UserSchema);
var SFI = mongoose.model('SFI', SFISchema);
var Target = mongoose.model('Target', TargetSchema);

module.exports = {
    Category: Category,
    User: User,
    SFI: SFI,
    Target: Target

};


