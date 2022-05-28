
$("#machineTypeForm").submit(function(values){
    var data = $(this).serializeArray();
    $.ajax({
        url: "/branchapi/api/machine-type/",
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
                $("#machineTypeForm").trigger("reset");
                $("#machineTypeModal").modal('hide')
                $("#machineType").append($('<option>').text(response['type']).attr('value', response['id']));
                $("#machineType").val(response['id'])
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#machineTypeModal").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#machineTypeForm").trigger("reset");
                }
            },
        }); 
        return false;
});


$("#modelNoForm").submit(function(values){
    var data = $(this).serializeArray();
    $.ajax({
        url: "/branchapi/api/model-no/",
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
                $("#modelNoForm").trigger("reset");
                $("#modelNoModel").modal('hide')
                $("[id=modelNo]").append($('<option>').text(response['model']).attr('value', response['id']));
                $("[id=modelNo]").val(response['id']);
                $("[id=model]").append($('<option>').text(response['model']).attr('value', response['id']));
                $("[id=model]").val(response['id']);
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#modelNoModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#modelNoForm").trigger("reset");
                }
            },
        }); 
        return false;
});

$("#complaintsFormFitness").submit(function(){
    var data = $(this).serializeArray();
    data[data.length] = { name: "category", value: 'fitness' };

    $.ajax({
        url: "/branchapi/api/complaints/",
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
                $("#complaintsForm").trigger("reset");
                $("#complaintsModel").modal('hide')
                $("[id=complaintsF]").append($('<option>').text(response['complaint']).attr('value', response['id']));
                $("[id=complaintsF]").val(response['id']);
                $('.sltFitness option[value='+response['id']+']').prop('selected', 'selected').change();
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#complaintsModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#complaintsForm").trigger("reset");
                }
            },
        }); 
        return false;

});


$("#modelNameForm").submit(function(values){

    var data = {
        'name':$('input[name=model_namec]').val(),
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    }
    $.ajax({
        url: "/branchapi/api/model-name/",
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
                $("#modelNameForm").trigger("reset");
                $("#modelNameModel").modal('hide')
                $("[id=modelName]").append($('<option>').text(response['name']).attr('value', response['id']));
                $("[id=modelName]").val(response['id'])
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#modelNameModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#modelNameForm").trigger("reset");
                }
            },
        }); 
        return false;
});



$("#brandForm").submit(function(values){
    var category = $("#categoryId").val();

    var data = {
        'name':$('input[name=brandname]').val(),
        'category':category,
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
    }
    $.ajax({
        url: "/branchapi/api/brands/",
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
                $("#brandForm").trigger("reset");
                $("#brandModel").modal('hide')
                $("[id=brand]").append($('<option>').text(response['name']).attr('value', response['id']));
                $("[id=brand]").val(response['id'])
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#brandModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#brandForm").trigger("reset");
                }
            },
        }); 
        return false;
});


$("#wheelSizeForm").submit(function(values){
    var data = $(this).serializeArray();
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
                $("#wheelSizeForm").trigger("reset");
                $("#wheelSizeModel").modal('hide')
                $("[id=wheelSize]").append($('<option>').text(response['size']).attr('value', response['id']));
                $("[id=wheelSize]").val(response['id'])
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#wheelSizeModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#wheelSizeForm").trigger("reset");
                }
            },
        }); 
        return false;
});


$("#complaintsFormCycle").submit(function(){
    var data = $(this).serializeArray();
    data[data.length] = { name: "category", value: 'cycle' };
    $.ajax({
        url: "/branchapi/api/complaints/",
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
                $("#complaintsFormCycle").trigger("reset");
                $("#complaintsModelCycle").modal('hide')
                $("[id=complaintsC]").append($('<option>').text(response['complaint']).attr('value', response['id']));
                $("[id=complaintsC]").val(response['id']);
                $('.sltCycle option[value='+response['id']+']').prop('selected', 'selected').change();
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#complaintsModelCycle").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#complaintsFormCycle").trigger("reset");
                }
            },
        }); 
        return false;

});

$("#accessoriesForm").submit(function(){
    var data = $(this).serializeArray();
    $.ajax({
        url: "/branchapi/api/accessories/",
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
                $("#accessoriesForm").trigger("reset");
                $("#accessoriesModel").modal('hide')
                $("[id=accessoriesC]").append($('<option>').text(response['accessories']).attr('value', response['id']));
                $("[id=accessoriesC]").val(response['id']);
                $('.acsCycle option[value='+response['id']+']').prop('selected', 'selected').change();
                swal("Poof! Created Successfully!", {
                    icon: "success",
                });
                },
                500: function(){
                    $("#accessoriesModel").modal('hide')
                    swal("Poof! already exists!", {
                        icon: "error",
                    });
                     $("#accessoriesForm").trigger("reset");
                }
            },
        }); 
        return false;

});