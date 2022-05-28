$(document).ready(function(){
    return viewAccessoriesCycle()
})

function viewAccessoriesCycle(){
    var serviceRequest = $('input[name=service_request]').val();
    $('#cycleAccessoriesTable > tr > td').remove();
    $.ajax({
        url: "/branchapi/api/accessories-job-card/?service_request="+serviceRequest,
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
                    row.append($("<td>" + '<button id="btnDltCycleAccessories" type="button" class="btn btn-outline-secondary" value=' + response[i]["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
                }
               
            },
          
        },
    });
};


$("#accessoriesC").change(function(){
    var accessoriesName = $(this).find(":selected").text();
    var complaint = $(this).val();
    var csrf_token = $('input[name=csrfmidddlewaretoken]').val();
    var serviceRequest = $('input[name=service_request]').val();
    data = {
        'service_request':serviceRequest,
        'accessories':complaint,
        'csrfmiddlewretoken':csrf_token
    }
    $.ajax({
        url: "/branchapi/api/accessories-job-card/",
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
                $("#cycleAccessoriesTable").append(row);
                row.append($("<td>" +accessoriesName + "</td>"));
                row.append($("<td>" + '<button id="btnDltCycleAccessories" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));  
            },
            400: function(){
                swal("Poof! already exists!", {
                    icon: "error",
                });
            }
          
        },
    });

});



$(document).on('click', '#btnDltCycleAccessories', function () {
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
                    url: "/branchapi/api/accessories-job-card/" + id + "/",
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


