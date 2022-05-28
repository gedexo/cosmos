
$(document).ready(function(){
    if (localStorage.getItem("token")== null){
        window.location="/branch/"
      }
      else{
        $.ajax({
          url: "/branchapi/user-details/",
          type: "GET",
          beforeSend: function (xhr) {
              xhr.setRequestHeader(
                  "Authorization",
                  "Token " + localStorage.getItem("token")
              );
          },
          statusCode: {
            401: function() {
              localStorage.removeItem("token")
              window.location.href="/branch/"
            }
          },
          success:function(response){
            $("[id=userName]").html(response['user']);
            $("#userEmail").html(response['email'])
            $("#branchName").html(response['branch'])
          }
       })
      }
});


$("#logout").click(function(){
  $.ajax({
      url: "/branchapi/logout/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("token")
        );
      },
      statusCode: {
          403: function(response) {
          },
          200:function(response){                
          },
      },
      success:function(){
          localStorage.removeItem("token")
          window.location="/branch/"
      }
  });
});
