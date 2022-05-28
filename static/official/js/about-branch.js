$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "/api/official/about-branch/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            drawTable(response);
            console.log(response)
            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                } 
            }
            function drawRow(rowData) {
                var tableData = [];
                var table = $("#blogTable").DataTable();  
                var branch = rowData.branches
                var cyclestore_content =rowData.cyclestore_content.slice(0,100)+'...'
                var sports_content =rowData.sports_content.slice(0,100)+'...'
                var fitness =rowData.fitness.slice(0,100)+'...'
                
                var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + rowData["id"] + '">edit</button><\a>'
                var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + rowData["id"] + '">delete</button>'
                tableData.push([branch,sports_content,cyclestore_content,fitness,edit,Delete])
                table.draw();
                table.rows.add(tableData).draw();

            }
        }
    });
});

$(document).ready(function () {
    $("#blogForm").submit(function (e) {
        var data = $(this).serializeArray();
        console.log(data)
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "/api/official/about-branch/"+id+"/",
                type: "PUT",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token"),
                    );
                },
                success:function(){
                    swal("Poof! Updated Successfully!", {
                        icon: "success",
                    });
                    $("#editId").val(0)
                    setTimeout(function () {
                        return tableUpdate()
                    }, 1500);   
                }
            });           
        }
        else {

                $.ajax({
                    url: "/api/official/about-branch/",
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
                            $("#blogForm").trigger("reset");
                            swal("Poof! Saved Successfully!", {
                                icon: "success",
                            });
                            var tableData = [];
                            var table = $("#blogTable").DataTable();  
                            var branch = response.branches
                var cyclestore_content =response.cyclestore_content.slice(0,100)+'...'
                var sports_content =response.sports_content.slice(0,100)+'...'
                var fitness =response.fitness.slice(0,100)+'...'
                
                var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + response["id"] + '">edit</button><\a>'
                var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + response["id"] + '">delete</button>'
                tableData.push([branch,sports_content,cyclestore_content,fitness,edit,Delete])
                table.draw();
                table.rows.add(tableData).draw();
                                
                        },
                    },
                });
            }
        
    });
   
    
});


$("#btnReset").click(function () {
    $('#blogForm')[0].reset();
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
            $(this).closest('tr').remove ();
            $.ajax({
                url: "/api/official/about-branch/"+id+"/",
                type: "DELETE",
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
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



$(document).on('click', '#btnEdit', function () {
    var id = $(this).val();
    $.ajax({
        url: "/api/official/about-branch/"+id+"/",
        type: "GET",
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            $("select[name=branches]").val(response['branches'])
            $("textarea[name=sports_content]").val(response['sports_content'])
            $("textarea[name=cyclestore_content]").val(response['cyclestore_content'])
            $("textarea[name=fitness]").val(response['fitness'])
        }
      })
    var thisProp = $(this)
    var title = $(this).closest('tr').find("td:eq(0)").html();    
    var id = $(this).val();
    $('input[name=heading]').val(title);
    $("#editId").val(id)

});

function tableUpdate(){
    location.reload();
}
$(document).on('click', '#btnContentView', function () {
    var id = $(this).val();
    $.ajax({
        url: "/api/official/about-branch/"+id+"/",
        type: "GET",
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            console.log(response)
            $("#contentDiv").append(response['content'])
        }
      })
});

