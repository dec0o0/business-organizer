var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/all', function(req, res){
  models.Job.findAll({
    include: [models.Task]
  }).complete(function(err, data){
      res.json(data);
  });
});

router.post('/create', function(req, res) {
  models.Job.create({
    title: req.param('title'),
    begin: req.param('begin'),
    end: req.param('end'),
    urgency: req.param('urgency'),
    state: 'unassigned'
  }).then(function() {
    res.status(200).send('created');
    //res.redirect('/');
  });
});

router.delete('/:job_id/destroy', function(req, res){
  models.Job.find({
    where: {id: req.param('job_id')},
    include: [models.Task]
  }).then(function(job) {
    models.Task.destroy(
      {where: {JobId: job.id}}
    ).then(function(affectedRows) {
      job.destroy().then(function() {
        res.status(200).send('deleted');
        //redirect('/');
      });
    });
  });
});

router.get('/:job_id/destroy', function(req, res, next) {
  models.Job.find({
    where: {id: req.param('job_id')},
    include: [models.Task]
  }).then(function(job) {
    models.Task.destroy(
      {where: {JobId: job.id}}
    ).then(function(affectedRows) {
      job.destroy().then(function() {
        res.redirect('/');
      });
    });
  });
});


router.post('/:job_id/tasks/create', function (req, res) {
  models.Job.find({
    where: { id: req.param('job_id') }
  }).then(function(job) {
    models.Task.create({
      title: req.param('title')
    }).then(function(title) {
      title.setJob(job).then(function() {
        res.redirect('/');
      });
    });
  });
});

router.get('/:job_id/tasks/:task_id/destroy', function (req, res) {
  models.Job.find({
    where: { id: req.param('job_id') }
  }).then(function(job) {
    models.Task.find({
      where: { id: req.param('task_id') }
    }).then(function(task) {
      task.setJob(null).then(function() {
        task.destroy().then(function() {
          res.redirect('/');
        });
      });
    });
  });
});


module.exports = router;
