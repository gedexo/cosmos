$("#category").change(function(){
    if($(this).val()=='cycle'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>')
    }
    else if($(this).val()=='fitness'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>','<option value="onsite-service">onsite-service</option>')
    }
    else if($(this).val()=='badminton'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>')
    }
});



$("#service-request-form").validate({
    rules: {
        name: {
            required: true,
        },
        phone: {
            required: true,
        },
        description: {
            required: true,
        },

        messages: {
            name: {
                required: "This filed is required",
            },
            phone: {
                required: "This filed is required",
            },
            description: {
                required: "This filed is required",
            },
        }
    },
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        var phoneNumber = $("#phone").val();
        var countryCode = $("#countryCode").val();
        var phone = '+' + countryCode + phoneNumber
        data[data.length] = { name: "phone", value: phone };
        $.ajax({
            url: "/branchapi/api/create-service-request-branch/",
            type: "POST",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    "Token " + localStorage.getItem("token")
                );
            },
            statusCode: {
                201: function (response) {
                    $('.error').html('')
                    swal("Success!", "Created Successfully!", "success")
                    $("#service-request-form").trigger("reset");
                    var row = $("<tr />")
                    $("#serviceRequestTable").append(row);
                    var status = '<span class="badge bg-primary">' + response["status"] + '</span>'
                    var jobCard = '<a href="/branch/job-card/' + response['id'] + '"><span class="badge bg-success">create</span></a>'
                    row.append($("<td>" +'COSMO0'+response["id"] + "</td>"));
                    row.append($("<td>" + response["date"] + "</td>"));
                    row.append($("<td>" + response["category"] + "</td>"));
                    row.append($("<td>" + response["service_type"] + "</td>"));
                    row.append($("<td>" + response["name"] + "</td>"));
                    row.append($("<td>" + response["phone"] + "</td>"));
                    row.append($("<td>" + response["description"] + "</td>"));
                    row.append($("<td>" + status + "</td>"));
                    row.append($("<td>" + jobCard + "</td>"));
                    row.append($("<td>" + '<button id="btnDelete" value="'+response["id"]+'" type="button" class="btn btn-outline-secondary" deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
                },
                400: function (response) {
                    $('.error').html('Please enter a valid phone number')
                }
            },


        });
    }
});



$(document).on('click', '#btnDelete', function() {
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this service request!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var id = $(this).val();
                $(this).closest('tr').remove();
                $.ajax({
                    url: "/branchapi/api/create-service-request-branch/" + id + "/",
                    type: "DELETE",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(
                            "Authorization",
                            "Token " + localStorage.getItem("token")
                        );
                    },
                    success: function() {
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