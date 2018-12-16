// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-expense").on("click", function(event) {
    var id = $(this).data("id");
    var newExpense = $(this).data("newExpense");

    var newExpenseState = {
      expense: newExpense
    };

    // Send the PUT request.
    $.ajax("/api/budget/" + id, {
      type: "PUT",
      data: newExpenseState
    }).then(
      function() {
        console.log("changed expense to", newExpense);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newLine = {
      name: $("#ca").val().trim(),
      expense: $("[name=expense]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/budget", {
      type: "POST",
      data: newLine
    }).then(
      function() {
        console.log("created new line");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-expense").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/budget/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted line", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
