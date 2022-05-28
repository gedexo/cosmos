

$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "/api/official/products/",
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
                var table = $("#productTable").DataTable();
                var bestseller = ''
                if (rowData['best_seller'] == true){
                    bestseller = 'Yes'
                }
                else{
                    bestseller = 'No'
                }
                var image = '<img src="' + rowData.image["small_square_crop"] + '">'
                var edit = '<a href="#formDiv"><button class="btn btn-outline-success" id="btnEdit" value="' + rowData["id"] + '">edit</button></a>'
                var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + rowData["id"] + '">delete</button>'
                tableData.push([rowData['title'], rowData['previous_price'], rowData['current_price'], rowData['url'], image,bestseller,edit, Delete])
                table.draw();
                table.rows.add(tableData).draw();

            }
        }
    });
});

$(document).ready(function () {
    $("#productForm").submit(function (e) {
        var formData = new FormData(e.target);
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "/api/official/products/" + id + "/",
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
                statusCode: {
                    400: function (response) {
                        swal("Poof! url is not valid!", {
                            icon: "error",
                        });
                    }
                },
                success: function () {
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
            if ($("#image")[0].files.length == 0) {
                $("#alertPTag").html('Image cannot be null')
            }
            else {
                $("#alertPTag").html('')
                $.ajax({
                    url: "/api/official/products/",
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
                            $("#productForm").trigger("reset");
                            swal("Poof! Saved Successfully!", {
                                icon: "success",
                            });
                            var tableData = [];
                            var table = $("#productTable").DataTable();
                            var bestseller = ''
                            if (response['best_seller'] == true){
                                bestseller = 'Yes'
                            }
                            else{
                                bestseller = 'No'
                            }
                            var image = '<img src="' + response.image["small_square_crop"] + '">'
                            var edit = '<button class="btn btn-outline-success" id="btnEdit" value="' + response["id"] + '">edit</button>'
                            var Delete = '<button class="btn btn-outline-danger" id="btnDelete" value="' + response["id"] + '">delete</button>'
                            tableData.push([response['title'], response['previous_price'], response['current_price'], response['url'],image,bestseller,edit, Delete])
                            table.draw();
                            table.rows.add(tableData).draw();

                        },
                        400: function (response) {
                            swal("Poof! url is not valid!", {
                                icon: "error",
                            });
                        }
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
                $(this).closest('tr').remove();
                $.ajax({
                    url: "/api/official/products/" + id + "/",
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
    var thisProp = $(this)
    var title = $(this).closest('tr').find("td:eq(0)").html();
    var priceOld = $(this).closest('tr').find("td:eq(1)").html();
    var priceNew = $(this).closest('tr').find("td:eq(2)").html();
    var url = $(this).closest('tr').find("td:eq(3)").html();
    var bestSeller = $(this).closest('tr').find("td:eq(5)").html();
    if(bestSeller == 'Yes'){
        $("#bestSeller").prop('checked',true)
    }
    var id = $(this).val();
    $('input[name=title]').val(title);
    $('input[name=previous_price]').val(priceOld);
    $('input[name=current_price]').val(priceNew);
    $('input[name=url]').val(url);
    $("#editId").val(id)

});

function tableUpdate() {
    location.reload();
}