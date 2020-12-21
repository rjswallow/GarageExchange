$(document).ready(function() {
    // Getting references to our form and input
    var newPost = $("form.post");
    var itemName = $("input#name");
    var itemDescription = $("input#msg");
    var picture = $("input#customFile");
  
    // When the signup button is clicked, we validate the email and password are not blank
    newPost.on("submit", function(event) {
      event.preventDefault();
      var postUserData = {
        item: itemName.val().trim(),
        description: itemDescription.val().trim()
        // picture: picture.val().trim()
      };
  
    // Does a post to the newPost route. If successful... 
    function newUserPost(item, description, picture) {
      $.post("/api/newPost", {
        item: item,
        description: description,
        picture: picture
      })
        .then(function(data) {
            console.log(data);
          window.location.replace("/");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  