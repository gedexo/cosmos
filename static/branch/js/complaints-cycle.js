$(document).ready(function(){
    viewComplaintsCycle()
})

function viewComplaintsCycle(){
    var serviceRequest = $('input[name=service_request]').val();
    $('#cycleComplaintsTable > tr > td').remove();
    $.ajax({
        url: "/branchapi/api/complaints-job-card/?service_request="+serviceRequest,
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
                    $("#cycleComplaintsTable").append(row);
                    row.append($("<td>" + response[i].complaint['complaint'] + "</td>"));
                    row.append($("<td>" + '<button id="btnDltCycleComplaints" type="button" class="btn btn-outline-secondary" value=' + response[i]["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
                }
               
            },
          
        },
    });
};


$("#complaintsC").change(function(){
    var complaintName = $(this).find(":selected").text();
    var complaint = $(this).val();
    var csrf_token = $('input[name=csrfmidddlewaretoken]').val();
    var serviceRequest = $('input[name=service_request]').val();
    data = {
        'service_request':serviceRequest,
        'complaint':complaint,
        'csrfmiddlewretoken':csrf_token
    }
    $.ajax({
        url: "/branchapi/api/complaints-job-card/",
        type: "POST",
        data:data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        statusCode: {
            201: function(response) {
                var row = $("<tr />")
                $("#cycleComplaintsTable").append(row);
                row.append($("<td>" +complaintName + "</td>"));
                row.append($("<td>" + '<button id="btnDltCycleComplaints" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));  
            },
            400: function(){
                swal("Poof! already exists!", {
                    icon: "error",
                });
            }
          
        },
    });

});



$(document).on('click', '#btnDltCycleComplaints', function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this datas!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var id = $(this).val();
                $(this).closest('tr').remove();
                $.ajax({
                    url: "/branchapi/api/complaints-job-card/" + id + "/",
                    type: "DELETE",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(
                            "Authorization",
                            "Token " + localStorage.getItem("token")
                        );
                    },
                    success: function () {
                        swal("Poof! Deleted Successfully!", {
                            icon: "success",
                        });
                    }
                })

            } else {
                swal("Your imaginary file is safe!");
            }
        });
});


