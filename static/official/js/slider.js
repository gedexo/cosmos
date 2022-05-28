$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "/api/official/slider/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
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
                var table = $("#sliderTable").DataTable();  
                var image = '<img src="' + rowData.image["small_square_crop"] + '">'
                var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + rowData["id"] + '">edit</button><\a>'
                var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + rowData["id"] + '">delete</button>'
                tableData.push([rowData['title'],rowData['paragraph'],rowData['url'],image,edit,Delete])
                table.draw();
                table.rows.add(tableData).draw();

            }
        }
    });
});

$(document).ready(function () {
    $("#sliderForm").submit(function (e) {
        var formData = new FormData(e.target);
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "/api/official/slider/"+id+"/",
                type: "PUT",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
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
            if ($("#image")[0].files.length == 0 ){
                $("#alertPTag").html('Image cannot be null')
            }
            else{
                $("#alertPTag").html('')

                $.ajax({
                    url: "/api/official/slider/",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    cache: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(
                            "Authorization",
                            "Token " + localStorage.getItem("admin_token")
                        );
                    },
                    statusCode: {
                        201: function (response) {
                            $("#sliderForm").trigger("reset");
                            swal("Poof! Saved Successfully!", {
                                icon: "success",
                            });
                            var tableData = [];
                            var table = $("#sliderTable").DataTable();  
                            var image = '<img src="' + response.image["small_square_crop"] + '">'
                            var edit = '<button class="btn btn-outline-success" id="btnEdit" value="' + response["id"] + '">edit</button>'
                            var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + response["id"] + '">delete</button>'
                            tableData.push([response['title'],response['paragraph'],response['url'],image,edit,Delete])
                            table.draw();
                            table.rows.add(tableData).draw();
                          
                        },
                    },
                });
            }
        }
    });
   
    
});


$("#btnReset").click(function () {
    $('#successStoriesForm')[0].reset();
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
                url: "/api/official/slider/"+id+"/",
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
    $("body").scrollTop(0);
    var thisProp = $(this)
    var title = $(this).closest('tr').find("td:eq(0)").html();
    var content = $(this).closest('tr').find("td:eq(1)").html();
    var url = $(this).closest('tr').find("td:eq(2)").html();
    
    var id = $(this).val();
    $('input[name=title]').val(title);
    $('input[name=paragraph]').val(content);
    $('input[name=url]').val(url);
    $("#editId").val(id)

});

function tableUpdate(){
    location.reload();
}