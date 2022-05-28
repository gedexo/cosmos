$(document).ready(function(){
 
    $('#technicianTable').DataTable();
    $("#successAlert").hide();
     $.ajax({
         url: "/branchapi/api/technicians/",
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
                table = $("#technicianTable").DataTable();            
                 var edit ='<button id="btnEdit" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + '  data-bs-toggle="modal" data-bs-target="#expedit"><i class="icofont-edit text-success"></i></button>'
                 var deleteRequest = '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                 tableData.push([rowData["technician_id"],rowData["name"],rowData["category"],rowData["phone"],rowData["address"], edit, deleteRequest])
                 table.draw();
                 table.rows.add(tableData).draw();
             }
         }
     });
});


$("#technicianForm").validate({
    rules: {
        name: {
            required: true,
        },
        technician_id:{
            required:true,
        },
        phone:{
            required:true,
        },

        messages: {
            name: {
                required: "This filed is required",
            },
            technician_id:{
                required:"This field is required",
            },
            phone:{
                required:"This field is required",
            },
            }
    },
    submitHandler: function (e) {
        var data = $(e).serializeArray();
        var editId = $("#editId").val();
        if (editId != 0) {
            $.ajax({
                url: "/branchapi/api/technicians/" + editId + "/",
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
                    $("#technicianForm").trigger("reset");
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
                url: "/branchapi/api/technicians/",
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
                        table = $("#technicianTable").DataTable();            
                        var edit ='<button id="btnEdit" type="button" class="btn btn-outline-secondary" value=' + response["id"] + '  data-bs-toggle="modal" data-bs-target="#expedit"><i class="icofont-edit text-success"></i></button>'
                        var deleteRequest = '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                        tableData.push([response["technician_id"],response["name"],response["category"],response["phone"],response["address"], edit, deleteRequest])
                        table.draw();
                        table.rows.add(tableData).draw();
                        }
                    }
                });
        }

        return false;
    }
});


$(document).on('click', '#btnEdit', function () {
    var technicianId = $(this).closest('tr').find("td:eq(0)").html();
    var name = $(this).closest('tr').find("td:eq(1)").html();
    var category = $(this).closest('tr').find("td:eq(2)").html();
    var phone = $(this).closest('tr').find("td:eq(3)").html();
    var address = $(this).closest('tr').find("td:eq(4)").html();
    var id = $(this).val();
    $('input[name=technician_id]').val(technicianId);
    $('input[name=name]').val(name);
    $('input[name=phone]').val(phone);
    $('select[name=category]').val(category);
    $('textarea[name=address]').val(address);
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
                    url: "/branchapi/api/technicians/" + id + "/",
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

$("#btnReset").click(function () {
    $("#technicianForm").trigger("reset");
});


