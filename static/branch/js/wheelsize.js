$(document).ready(function(){
 
    $('#brandsTable').DataTable();
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
                var tableData = [];
                table = $("#wheelSizeTable").DataTable();            
                 var edit ='<button id="btnEdit" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + '  data-bs-toggle="modal" data-bs-target="#expedit"><i class="icofont-edit text-success"></i></button>'
                 var deleteRequest = '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                 tableData.push([rowData["size"],edit,deleteRequest])
                 table.rows.add(tableData).draw();
             }
         }
     });
});


$("#wheelSizeForm").validate({
    rules: {
        name: {
            required: true,
        },
        messages: {
            name: {
                required: "This filed is required",
            },
            }
    },
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        var editId = $("#editId").val();
        if (editId != 0) {
            $.ajax({
                url: "/branchapi/api/wheelsize/" + editId + "/",
                type: "PUT",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                success: function () {
                    $("#expadd").modal('hide');
                    $("#WheelSizeForm").trigger("reset");
                    swal("Poof! Updted Successfully!", {
                        icon: "success",
                    });
                    setTimeout(function() {
                        location.reload()
                    }, 1500); 
                }

            });
        }
        else {
            $.ajax({
                url: "/branchapi/api/wheelsize/",
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
                        $("#expadd").modal('hide')
                        var tableData = [];
                        swal("Poof! Created Successfully!", {
                            icon: "success",
                        });
                        table = $("#wheelSizeTable").DataTable();            
                        var edit ='<button id="btnEdit" type="button" class="btn btn-outline-secondary" value=' + response["id"] + '  data-bs-toggle="modal" data-bs-target="#expedit"><i class="icofont-edit text-success"></i></button>'
                        var deleteRequest = '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                        tableData.push([response["size"],edit,deleteRequest])
                        table.rows.add(tableData).draw();
                        },
                        500: function(){
                            swal("Poof! already exists!", {
                                icon: "error",
                            });
                            $("#expadd").modal('hide')
                             $("#WheelSizeForm").trigger("reset");
                        }
                    }
                });
        }

        return false;
    }
});


$(document).on('click', '#btnEdit', function () {
    var name = $(this).closest('tr').find("td:eq(0)").html();
    var id = $(this).val();
    $('input[name=size]').val(name);
    $("#editId").val(id)
    $("#expadd").modal('show');
});


$(document).on('click', '#btnDelete', function () {
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
                    url: "/branchapi/api/wheelsize/" + id + "/",
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



