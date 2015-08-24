var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Job.findAll({
    include: [ models.Task ]
  }).then(function(jobs) {
    res.render('index', {
      title: 'Business Scheduler',
      jobs: jobs
    });
  });
});

module.exports = router;
