$(document).ready(function(){
    if (localStorage.getItem("admin_token")== null){
        window.location="/official/"
      }
      else{
        $.ajax({
          url: "/api/user-details/",
          type: "GET",
          beforeSend: function (xhr) {
              xhr.setRequestHeader(
                  "Authorization",
                  "Token " + localStorage.getItem("admin_token")
              );
          },
          statusCode: {
            401: function() {
              localStorage.removeItem("admin_token")
              window.location.href="/official/"
            }
          },
          success:function(response){
            $("[id=userName]").html(response['user']);
            $("#userEmail").html(response['email'])
          }
       })
      }
      mtalkz_balance()
});


$("#logout").click(function(){
  $.ajax({
      url: "/api/logout/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("admin_token")
        );
      },
      statusCode: {
          403: function(response) {
          },
          200:function(response){                
          },
      },
      success:function(){
          localStorage.removeItem("admin_token")
          window.location="/official/"
      }
  });
});

function mtalkz_balance(){
  $.ajax({
    url: "/api/mtalkz/",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
        );
    },
    statusCode: {
      200:function(response){       
        var obj = JSON.parse(response.response[0])
        $("#mtalkzBalance").html('Mtalkz Sms Balance :'+obj.data.balance)
      },
  },
  });
}
// $("#logout").click(function(){
//   $.ajax({
//       url: "/api/logout/",
//       type: "GET",
//       beforeSend: function (xhr) {
//         xhr.setRequestHeader(
//           "Authorization",
//           "Token " + localStorage.getItem("admin_token")
//         );
//       },
//       statusCode: {
//           403: function(response) {
//           },
//           200:function(response){                
//           },
//       },
//       success:function(){
//           localStorage.removeItem("admin_token")
//           window.location="/official/"
//       }
//   });
// });
