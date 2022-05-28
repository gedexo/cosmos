$(document).ready(function(){
    viewComplaintsCycle();
    viewAccessoriesCycle();
    viewComplaintsFitness();

})

function viewComplaintsCycle(){
    var serviceRequest = $('input[name=service_request]').val();
    $('#cycleComplaintsTable > tr > td').remove();
    $.ajax({
        url: "http://127.0.0.1:8000/api/official/complaints/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        statusCode: {
            200: function(response) {
                console.log(response)
                for(var i=0; i<response.length; i++){
                    var row = $("<tr />")
                    $("#cycleComplaintsTable").append(row);
                    row.append($("<td>" + response[i].complaint['complaint'] + "</td>"));
                }
               
            },
          
        },
    });
};


function viewAccessoriesCycle(){
    var serviceRequest = $('input[name=service_request]').val();
    $('#cycleAccessoriesTable > tr > td').remove();
    $.ajax({
        url: "http://127.0.0.1:8000/branchapi/api/accessories-job-card/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        statusCode: {
            200: function(response) {
                for(var i=0; i<response.length; i++){
                    var row = $("<tr />")
                    $("#cycleAccessoriesTable").append(row);
                    row.append($("<td>" + response[i].accessories['accessories'] + "</td>"));
                }
               
            },
          
        },
    });
};


function viewComplaintsFitness(){
    var serviceRequest = $('input[name=service_request]').val();
    $('#fitnessComplaintsTable > tr > td').remove();
    $.ajax({
        url: "http://127.0.0.1:8000/branchapi/api/complaints-job-card/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        statusCode: {
            200: function(response) {
                for(var i=0; i<response.length; i++){
                    var row = $("<tr />")
                    $("#fitnessComplaintsTable").append(row);
                    row.append($("<td>" + response[i].complaint['complaint'] + "</td>"));
                }
               
            },
          
        },
    });
};
