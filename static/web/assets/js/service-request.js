$(document).ready(function () {
    $("#successAlert").hide();
});

$("#service-request-form").validate({
    rules: {
        name: {
            required: true,
        },
        phone: {
            required: true,
        },
        branch: {
            required: true,
        },
        address: {
            required: true,
        },

        messages: {
            name: {
                required: "This filed is required",
            },
            phone: {
                required: "This filed is required",
            },
            branch: {
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
            url: "/branchapi/api/service-request/",
            type: "POST",
            data: data,
            statusCode: {
                201: function (response) {
                    $('.error').html('')
                    swal("Success!", "We will get back to you soon!", "success")
                    $("#service-request-form").trigger("reset");
                    $("#modalLoginForm").modal('toggle');
                    $("#btnClose").click();
                },
                400: function (response) {
                    $('.error').html('Please enter a valid phone number')
                }
            },
            success: function () {

            }

        });
    }
});

