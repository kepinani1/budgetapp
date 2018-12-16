var express = require("express");

var router = express.Router();

// Import the model (budget.js) to use its database functions.
var line = require("../models/lines.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  line.all(function(data) {
    var hbsObject = {
      budget: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/lines", function(req, res) {
  line.create([
    "name", "expense"
  ], [
    req.body.name, req.body.expense
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/lines/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  line.update({
    line: req.body.expense
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/lines/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  line.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
