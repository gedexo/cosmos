$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "/api/official/ads/",
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
                var table = $("#adsTable").DataTable();  
                var image_one = '<img src="' + rowData.image_one["small_square_crop"] + '">'
                var image_two = '<img src="' + rowData.image_two["small_square_crop"] + '">'
                var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + rowData["id"] + '">edit</button><\a>'
                var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + rowData["id"] + '">delete</button>'
                tableData.push([rowData['title'],rowData['description'],rowData['url'],image_one,image_two,edit,Delete])
                table.draw();
                table.rows.add(tableData).draw();

            }
        }
    });
});

$(document).ready(function () {
    $("#adsForm").submit(function (e) {
        var formData = new FormData(e.target);
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "/api/official/ads/"+id+"/",
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
            if ($("#image_one")[0].files.length == 0 ){
                $("#alertPTag1").html('Image cannot be null')
            }
            else if($("#image_two")[0].files.length == 0 ){
                $("#alertPTag2").html('Image cannot be null')
            }
            else{
                $("#alertPTag").html('')

                $.ajax({
                    url: "/api/official/ads/",
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
                            $("#adsForm").trigger("reset");
                            swal("Poof! Saved Successfully!", {
                                icon: "success",
                            });
                            var tableData = [];
                            var table = $("#adsTable").DataTable();  
                            var image_one = '<img src="' + response.image_one["small_square_crop"] + '">'
                            var image_two = '<img src="' + response.image_two["small_square_crop"] + '">'
                            var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + response["id"] + '">edit</button><\a>'
                            var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + response["id"] + '">delete</button>'
                            tableData.push([response['title'],response['description'],response['url'],image_one,image_two,edit,Delete])
                            table.draw();
                            table.rows.add(tableData).draw();
                                
                        },
                    },
                });
            }
        }
    });
   
    
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
                url: "/api/official/ads/"+id+"/",
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
        url: "/api/official/ads/"+id+"/",
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
            $("textarea[name=content]").val(response['content'])
        }
      })
    var thisProp = $(this)
    var title = $(this).closest('tr').find("td:eq(0)").html();    
    var description = $(this).closest('tr').find("td:eq(1)").html();    
    var url = $(this).closest('tr').find("td:eq(2)").html();    
    var id = $(this).val();
    $('input[name=title]').val(title);
    $('textarea[name=description]').val(description);
    $('input[name=url]').val(url);
    $("#editId").val(id)
});

function tableUpdate(){
    location.reload();
}
