module.exports = function(app) {
  var express = require('express');
  var <%= camelizedModuleName %>Router = express.Router();

  // Set a delay in ms to test slow responses
  var responseDelay = 1000;

  // Populate your <%= camelizedModuleName %> values here
  var values = [
    {
      id: 1,
      // ...
    }
  ];

  <%= camelizedModuleName %>Router.get('/', function(req, res) {
    // Returns all values
    res.send({
      '<%= dasherizedModuleName %>': values
    });
  });

  <%= camelizedModuleName %>Router.post('/', function(req, res) {
    // Adds a new <%= camelizedModuleName %> value
    var <%= camelizedModuleName %>Value = {};
    Object.keys(req.params).forEach(function(key) {
      <%= camelizedModuleName %>Value[key] = req.params[key];
    });
    values.push(<%= camelizedModuleName %>Value);
    setTimeout(function() {
      res.status(201).end();
    }, responseDelay);
  });

  <%= camelizedModuleName %>Router.get('/:id', function(req, res) {
    // Find the <%= camelizedModuleName %> value in our arra and return it
    var <%= camelizedModuleName %>Value = {
      id: req.params.id
    };
    if (values.some(function(value, index) {
      if (value.id.toString() === req.params.id) {
        setTimeout(function() {
          res.send({
          '<%= dasherizedModuleName %>': value
          });
        }, responseDelay);
        return true; // break and exit
      }
      return false; // continue
    })) {
      return; // if an item was found
    }
    // Otherwise throw a 404
    setTimeout(function() {
      res.status(404).end();
    }, responseDelay);
  });

  <%= camelizedModuleName %>Router.put('/:id', function(req, res) {
    // Update the <%= camelizedModuleName %> value for the given id
    var <%= camelizedModuleName %>Value = null;
    values.some(function(value) {
      if (value.id.toString() === req.params.id) {
        Object.keys(req.params).forEach(function(key) {
          values[index][key] = req.params[key];
        });
        <%= camelizedModuleName %>Value = values[index];
        return true; // break
      }
      return false; // continue
    });
    // If no value was found, create a new one
    if (<%= camelizedModuleName %>Value === null) {
      <%= camelizedModuleName %>Value = {};
      Object.keys(req.params).forEach(function(key) {
        <%= camelizedModuleName %>Value[key] = req.params[key];
      });
      values.push(<%= camelizedModuleName %>Value);
    }
    // Then return it
    setTimeout(function() {
      res.send({
        '<%= dasherizedModuleName %>': <%= camelizedModuleName %>Value
      });
    }, responseDelay);
  });

  <%= camelizedModuleName %>Router.delete('/:id', function(req, res) {
    // Delete the <%= camelizedModuleName %> value for the given id
    values.some(function(value, index) {
      if (value.id.toString() === req.params.id) {
        values.splice(index, 1);
        return true; // break
      }
      return false; // continue
    });
    setTimeout(function() {
      res.status(204).end();
    }, responseDelay);
  });

  app.use('/api/<%= decamelizedModuleName %>', <%= camelizedModuleName %>Router);
};
