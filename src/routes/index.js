var express = require('express');
var router = express.Router();
var models = require('../models/SFIModel.js');


/* GET home page. */
router.get('/', function (req, res, next) {
    var tags = [
        {
            id: 1,
            name: 'Business'
        },
        {
            id: 2,
            name: 'Political'
        },
        {
            id: 3,
            name: 'Show Business'
        },
        {
            id: 4,
            name: 'Work Place'
        },
        {
            id: 5,
            name: 'Food'
        },
        {
            id: 6,
            name: 'Sport'
        },
        {
            id: 7,
            name: 'People'
        },
        {
            id: 8,
            name: 'Other'
        }
    ];
    res.render('index',
        {
            title: 'Express',
            topTags: tags
        });
});

router.post('/sfi/create', function (req, res, next) {
    var body = req.body;
    models.Target.find({'name': new RegExp(body.target, "i")})
        .exec(function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result.length && result.length > 0) {
                res.redirect('/didYouMean/' + body.target);
            } else {
                res.redirect('/lastStep/' + body.target);
            }
        });


});

router.get('/didYouMean/:name', function (req, res, next) {
    var params = req.params;
    models.Target.find({name: new RegExp(params.name, 'i')})
        .exec(function (err, results) {
            if (err) {
                console.log(err);
            }
            res.render('didYouMean', {
                target: params.name,
                coincidence: results
            })
        });
});

router.get('/lastStep/:name', function (req, res, next) {
    var params = req.params;
    res.render('lastStep', {
        target: params.name
    });

});

router.post('/createNew', function (req, res, next) {
    var body = req.body;
    console.log(body.category);
    //1. create new target
    var target = new models.Target();
    target.name = body.target;
    target.SFIsCount = 1;

    //2. check category exist or not
    models.Category.findOne({name: body.category}, function (err, category) {
        if (err) {
            console.log(err);
        } else {
            if (category) {
                //if category already exist
                target.categories.push(category._id);
                target.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        var sfi = new models.SFI();
                        sfi.reason = body.reason;
                        sfi.targetId = doc._id;
                        sfi.userId = 1;
                        //push sfi id to the user.SFIs and save user
                        target.SFIs.push(doc._id);
                        target.save();
                        res.redirect('/to/' + target.name);
                    }
                });
            } else {
                //if category does not exist create new
                var newCategory = new models.Category();
                newCategory.name = body.category;
                newCategory.save(function (err, docCategory) {
                    if (err) {
                        console.log(err);
                    } else {
                        target.categories.push(docCategory._id);
                        target.save(function (err, doc) {
                            if (err) {
                                console.log(err);
                            } else {
                                var sfi = new models.SFI();
                                sfi.reason = body.reason;
                                sfi.targetId = doc._id;
                                sfi.userId = 1;
                                //push sfi id to the user.SFIs and save user
                                target.SFIs.push(doc._id);
                                target.save();
                                res.redirect('/to/' + target.name);
                            }
                        });
                    }
                });
            }
        }
    });


});

router.get('/to/:name', function (req, res, next) {
    var params = req.params;
    models.Target.findOne({name: params.name}, function (err, target) {
        if (err) {
            console.log(err);
        } else {
            res.render('sfiView', {
                title: target.name,
                target: target
            });
        }
    });
});

module.exports = router;
