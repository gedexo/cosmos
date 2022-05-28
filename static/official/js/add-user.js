$(document).ready(function () {
    $("#successAlert").hide();
});

$("#userForm").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        designation: {
            required: true,
        },
        password: {
            required: true,
        },
        confirm: {
            required: true,
            equalTo: "#password"
        },
        messages: {
            email: {
                required: "This filed is required",
            },
            designation: {
                required: "This field is required"
            },
            password: {
                required: "This filed is required",
            },
            confirm: {
                required: "This field is required"
            }
        }
    },
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        $.ajax({
            url: "/api/user/",
            type: "POST",
            data: data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    "Token " + localStorage.getItem("admin_token")
                );
            },
            statusCode: {
                201: function (response) {
                    $("#expadd").modal('hide');
                    swal("Poof! Created Successfully!", {
                        icon: "success",
                    });
                    $("#userForm").trigger("reset");
                    setTimeout(function () {
                        $("#successAlert").hide();
                    }, 1500);
                    var row = $("<tr />")
                    $("#userTable").append(row);
                    row.append($("<td>" + response["email"] + "</td>"));
                    row.append($("<td>" + response["phone"] + "</td>"));
                    row.append($("<td>" + response["designation"] + "</td>"));
                    row.append($("<td>" + '<button id="btnDelete" type="button" class="btn btn-outline-secondary" onclick=deleteUser(this,' + response["id"] + ')  deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
                },
                400: function (response) {
                    $("#successAlert").show();
                    $("#successAlert").addClass('alert alert-danger')
                    $("#successAlert").html('User with this email already exists')
                    setTimeout(function () {
                        $("#successAlert").hide();
                        $("#successAlert").addClass('alert alert-success')
                    }, 1500);
                }
            }



        });
        return false;
    }
});

function deleteUser(thisProp, deleteId) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this datas!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                var id = deleteId
                data = {
                    'id': id
                }
                $.ajax({
                    url: "/api/user-details/",
                    type: "DELETE",
                    data: data,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(
                            "Authorization",
                            "Token " + localStorage.getItem("admin_token")
                        );
                    },
                    success: function () {
                        $(thisProp).closest('tr').remove();
                        swal("Poof! Deleted Successfully!", {
                            icon: "success",
                        });
                    }

                })

            } else {
                swal("Your imaginary file is safe!");
            }
        });
}

$("#btnReset").click(function () {
    $("#userForm").trigger("reset");
});
