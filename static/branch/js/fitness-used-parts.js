function SubTotal(service_charge){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/branchapi/api/used-parts/?service_request=" + serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function (response) {
            sum = ''
            var subTotal = [];
            for (var i = 0; i < response.length; i++) {
                subTotal.push(response[i].amount)
            }
            var sum = subTotal.reduce((partial_sum, a) => partial_sum + a, 0);
                $("#subTotalUsedParts").html(sum) 
                var serviceCharge = $("#serviceChargefitness").val()
                if (serviceCharge != ''){
                    $("#subTotalFitness").val(parseInt(sum)+parseInt(serviceCharge))                       
                }
                else{
                    if (serviceCharge == ''){
                        $("#subTotalFitness").val(sum)              
                    }
                    else{
                        $("#subTotalFitness").val(parseInt(sum)+parseInt(service_charge))                       
                    }
                }
        }
    });
}
$(document).ready(function(){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/branchapi/api/used-parts/?service_request=" + serviceRequest,
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

                var btnDelete = ''
                if($('[id=status]').val() == 'completed'){
                    btnDelete = ''
                }
                else{
                    btnDelete =  '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                }
                var foc = ''
                if(rowData['foc'] == true){
                    foc = 'Foc'
                }
                else{
                    foc = ''
                }
                var row = $("<tr />")
                $("#fitnessUsedPartsTable").append(row);
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));
                row.append($("<td>" + foc + "</td>"));
                row.append($("<td id='tdDelete'>" +btnDelete+ "</td>"));
            
            }
            SubTotal()
            var row = $("<tr />")
            $("#fitnessUsedPartsTable").append(row);
            row.append($("<td id='totalTableFt' style='font-weight: bold;' colspan =2 >Total  </td>"));
            row.append($("<td style='font-weight: bold;' id='subTotalUsedParts'></td>"));
        }
    });
})

$("#btnUsedPartsFitSubmit").click(function(){
    var itemCode = $('input[name=item_code_ft]').val();
    var itemName = $('input[name=item_name_ft]').val();
    var amount = $('input[name=amount_used_parts_ft]').val();
    var csrf_token = $('input[name=csrfmidddlewaretoken]').val();
    var serviceRequest = $('input[name=service_request]').val();

    if(itemCode.length == 0 || itemName.length == 0 || amount.length == 0){
        $('#formAlert1').html('Field cannot be blank')
    }
    else{
        $('#formAlert1').html('')
        var foc = ''
        if($('[id=focF]').prop('checked') == true){
            foc = true
        }
        else{
            foc= false
        }
    
        data = {
            'service_request':serviceRequest,
            'item_name':itemName,
            'item_code':itemCode,
            'amount':amount,
            'foc':foc,
            'csrfmiddlewretoken':csrf_token
        }
        $.ajax({
            url: "/branchapi/api/used-parts/",
            type: "POST",
            data:data,
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
              );
            },
            statusCode: {
                201: function(response) {
                    itemCode = $('input[name=item_code_ft]').val('');
                    itemName = $('input[name=item_name_ft]').val('');
                    amount = $('input[name=amount_used_parts_ft]').val('');
                    var row = $("<tr />")
                    $("#fitnessUsedPartsTable").append(row);
                    var foc = ''
                    if(response['foc'] == true){
                        foc = 'Foc'
                    }
                    else{
                        foc = ''
                    }
                    row.append($("<td>" + response["item_code"] + "</td>"));
                    row.append($("<td>" + response["item_name"] + "</td>"));
                    row.append($("<td>" + response["amount"] + "</td>"));
                    row.append($("<td>" + foc + "</td>"));
                    row.append($("<td>" + '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
                    $("#totalTableFt").remove();
                    $("#subTotalUsedParts").remove();
                    SubTotal()
                    var row = $("<tr />")
                    $("#fitnessUsedPartsTable").append(row);
                    row.append($("<td id='totalTableFt' style='font-weight: bold;' colspan =2 >Total  </td>"));
                    row.append($("<td style='font-weight: bold;' id='subTotalUsedParts'></td>"));
                },
              
            },
        });
    }
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
                    url: "/branchapi/api/used-parts/" + id + "/",
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
                        SubTotal()
                    }
                })

            } else {
                swal("Your imaginary file is safe!");
            }
        });
});


$("#serviceChargefitness").keyup(function(){
    var serviceCharge = $(this).val()
    SubTotal(serviceCharge)
});

