
$(document).ready(function () {
    var category = $("#categoryId").val();
    $("[id=successAlert]").hide();
    $.ajax({
        url: "/branchapi/api/technicians/?category=" + category,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=technician]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
            }
        }
    });

    $.ajax({
        url: "/branchapi/api/wheelsize/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=wheelSize]").append($('<option>').text(rowData['size']).attr('value', rowData['id']));
            }
        }
    });
    $.ajax({
        url: "/branchapi/api/complaints/?category=" + category,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=complaintsC]").append($('<option>').text(rowData['complaint']).attr('value', rowData['id']));
                $("[id=complaintsF]").append($('<option>').text(rowData['complaint']).attr('value', rowData['id']));
            }
        }
    });
    $.ajax({
        url: "/branchapi/api/accessories/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=accessoriesC]").append($('<option>').text(rowData['accessories']).attr('value', rowData['id']));
            }
        }
    });
    $.ajax({
        url: "/branchapi/api/model-name/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=modelName]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
            }
        }
    });
    $.ajax({
        url: "/branchapi/api/machine-type/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("#machineType").append($('<option>').text(rowData['type']).attr('value', rowData['id']));
            }
        }
    });

    $.ajax({
        url: "/branchapi/api/model-no/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("#modelNo").append($('<option>').text(rowData['model']).attr('value', rowData['id']));
                $("#model").append($('<option>').text(rowData['model']).attr('value', rowData['id']));

            }
        }
    });
});





$(document).ready(function () {
    var category = $("#categoryId").val();

    $.ajax({
        url: "/branchapi/api/brands/?category=" + category,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                $("[id=brand]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
            }
        }
    });
});

$("#fitnessForm").validate({
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        var editId = $("#fitnessEditId").val();
        if (editId != 0) {
            $.ajax({
                url: "/branchapi/api/fitness-job-card/" + editId + "/",
                type: "PUT",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                statusCode: {
                    200: function (response) {
                        swal("Poof! Updated Successfully!", {
                            icon: "success",
                        });
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }
        else {
            $.ajax({
                url: "/branchapi/api/fitness-job-card/",
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
                        swal("Poof! Created Successfully!", {
                            icon: "success",
                        });
                        $("#fitnessEditId").val(response['id'])
                        $('input[name=attended_date]').val(response['attended_date'])
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }
    }
});


$("#cycleForm").validate({
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        var editId = $("#cycleJobCardId").val();
        if (editId != 0) {
            $.ajax({
                url: "/branchapi/api/cycle-job-card/" + editId + "/",
                type: "PUT",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                error: function (jqXhr, responseText) {
                    alert(jqXhr, responseText)
                },
                statusCode: {
                    200: function (response) {
                        swal("Poof! Updated Successfully!", {
                            icon: "success",
                        });
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }
        else {
            $.ajax({
                url: "/branchapi/api/cycle-job-card/",
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
                        swal("Poof! Created Successfully!", {
                            icon: "success",
                        });
                        $('input[name=attended_date]').val(response['attended_date'])
                        $("#cycleEditId").val(response['id'])
                        $("#cycleJobCardId").val(response['id'])
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }


    }
});

$("#badmintonForm").validate({
    rules: {
    },
    submitHandler: function (e) {

        var data = $(e).serializeArray();
        console.log(data)
        var services = [];
        $('input:checked[id="services"]').each(function () {
            services.push($(this).val());
        });
        data.push({ name: "services", value: services })
        var editId = $("#badmintonEditId").val();
        if (editId != 0) {
            $.ajax({
                url: "/branchapi/api/badminton-job-card/" + editId + "/",
                type: "PUT",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                statusCode: {
                    200: function (response) {
                        swal("Poof! Updated Successfully!", {
                            icon: "success",
                        });
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }
        else {
            $.ajax({
                url: "/branchapi/api/badminton-job-card/",
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
                    
                        $('input[name=attended_date]').val(response['attended_date'])
                        $("#badmintonEditId").val(response['id'])
                        swal("Poof! Created Successfully!", {
                            icon: "success",
                        });
                        var logStatus = 'jobcard status changed to '+response['status']
                        logs(response['service_request'],logStatus)
                    }
                }
            });
        }
    }
});



function logs(serviceRequest,entry){
    data = {
        'entry':entry,
        'service_request':serviceRequest,
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    $.ajax({
        url: "/branchapi/api/logs/",
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
            }
        }
    });
}