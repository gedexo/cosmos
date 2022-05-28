function SubTotal(service_charge){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/api/official/used-parts/?service_request=" + serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
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

$(document).ready(function() {
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/api/official/service-requests/" + serviceRequest + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        statusCode: {
            200: function(response) { 
                $('input[name=name]').val(response['name'])
                $('input[name=phone]').val(response['phone'])
                $('textarea[name=issues]').val(response['description'])
                var d = response['date']
                d = d.split(' ')[0];
                $('input[name=reported_date]').val(d)
            }
        }
    });
});

$(document).ready(function(){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/api/official/used-parts/?service_request=" + serviceRequest,
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
                var row = $("<tr />")
                $("#fitnessUsedPartsTable").append(row);
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));
            
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
        data = {
            'service_request':serviceRequest,
            'item_name':itemName,
            'item_code':itemCode,
            'amount':amount,
            'csrfmiddlewretoken':csrf_token
        }
        $.ajax({
            url: "/api/official/used-parts/",
            type: "POST",
            data:data,
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
              );
            },
            statusCode: {
                201: function(response) {
                    itemCode = $('input[name=item_code_ft]').val('');
                    itemName = $('input[name=item_name_ft]').val('');
                    amount = $('input[name=amount_used_parts_ft]').val('');
                    var row = $("<tr />")
                    $("#fitnessUsedPartsTable").append(row);
                    row.append($("<td>" + response["item_code"] + "</td>"));
                    row.append($("<td>" + response["item_name"] + "</td>"));
                    row.append($("<td>" + response["amount"] + "</td>"));
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



$("#serviceChargefitness").keyup(function(){
    var serviceCharge = $(this).val()
    SubTotal(serviceCharge)
});

function SubTotals(service_charge){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/api/official/used-parts/?service_request=" + serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            sum = ''
            var subTotal = [];
            for (var i = 0; i < response.length; i++) {
                subTotal.push(response[i].amount)
            }
            var sum = subTotal.reduce((partial_sum, a) => partial_sum + a, 0);

                $("#subTottalUsedParts").html(sum) 
                var serviceCharge = $("#serviceChargeCycle").val()
                if (serviceCharge != ''){
                    $("#subTotalCycle").val(parseInt(sum)+parseInt(serviceCharge))                       
                }
                else{
                    if (serviceCharge == ''){
                        $("#subTotalCycle").val(sum)              
                    }
                    else{
                        $("#subTotalCycle").val(parseInt(sum)+parseInt(service_charge))                       
                    }
                }
        }
    });
}
$(document).ready(function(){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/api/official/used-parts/?service_request=" + serviceRequest,
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
                var row = $("<tr />")
                $("#cycleUsedPartsTable").append(row);
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));
            
            }
            SubTotals()
            var row = $("<tr />")
            $("#cycleUsedPartsTable").append(row);
            row.append($("<td id='totalTable' style='font-weight: bold;' colspan =2 >Total  </td>"));
            row.append($("<td style='font-weight: bold;' id='subTottalUsedParts'></td>"));
        }
    });
})

$("#btnUsedPartsSubmit").click(function(){
    var itemCode = $('input[name=item_code]').val();
    var itemName = $('input[name=item_name]').val();
    var amount = $('input[name=amount_used_parts]').val();
    var csrf_token = $('input[name=csrfmidddlewaretoken]').val();
    var serviceRequest = $('input[name=service_request]').val();

    if(itemCode.length == 0 || itemName.length == 0 || amount.length == 0){
        $('#formAlert').html('Field cannot be blank')
    }
    else{
        $('#formAlert').html('')
        data = {
            'service_request':serviceRequest,
            'item_name':itemName,
            'item_code':itemCode,
            'amount':amount,
            'csrfmiddlewretoken':csrf_token
        }
        $.ajax({
            url: "/api/official/used-parts/",
            type: "POST",
            data:data,
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
              );
            },
            statusCode: {
                201: function(response) {
                    itemCode = $('input[name=item_code]').val('');
                    itemName = $('input[name=item_name]').val('');
                    amount = $('input[name=amount_used_parts]').val('');
                    var row = $("<tr />")
                    $("#cycleUsedPartsTable").append(row);
                    row.append($("<td>" + response["item_code"] + "</td>"));
                    row.append($("<td>" + response["item_name"] + "</td>"));
                    row.append($("<td>" + response["amount"] + "</td>"));
                    $("#totalTable").remove();
                    $("#subTottalUsedParts").remove();
                    SubTotals()
                    var row = $("<tr />")
                    $("#cycleUsedPartsTable").append(row);
                    row.append($("<td id='totalTable' style='font-weight: bold;' colspan =2 >Total  </td>"));
                    row.append($("<td style='font-weight: bold;' id='subTottalUsedParts'></td>"));
                },
              
            },
        });
    }
});



$("#serviceChargeCycle").keyup(function(){
    var serviceCharge = $(this).val()
    SubTotals(serviceCharge)
})