$(document).ready(function() {
    // Getting references to our form and inputs
    var postForm = $("form.posts");
    var itemName = $("#name");
    var descriptionInput = $("#msg");
    var image = $("#customFile");

  
    // When the form is submitted, we validate there's an email and password entered
    postForm.on("submit", function(event) {
      event.preventDefault();
      var formData = new FormData(this)
      var postData = {
        name: itemName.val().trim(),
        description: descriptionInput.val().trim(),
        picture: image[0].files[0]

      };
  
      if (!postData.name || !postData.description) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      postItem(formData);
    console.log(image[0].files[0])
      itemName.val("");
      descriptionInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function postItem(postData) {
      $.ajax({url:"/api/post", data: postData, type: "POST", cache: false,
      contentType: false,
      processData: false})
        .then(function() {
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  