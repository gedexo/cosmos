function SubTotals(service_charge){
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
                var row = $("<tr />")
                $("#cycleUsedPartsTable").append(row);
                var btnDelete = ''
                if($('[id=status]').val() == 'completed'){
                    btnDelete = ''
                }
                else{
                    btnDelete = '<button id="btnDlt" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                }
                var foc = ''
                if(rowData['foc'] == true){
                    foc = 'Foc'
                }
                else{
                    foc = ''
                }
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));
                row.append($("<td>" + foc + "</td>"));
                row.append($("<td>" + btnDelete + "</td>"));
            
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
    var csrf_token = $('input[name=csrfmiddlewaretoken]').val();
    var serviceRequest = $('input[name=service_request]').val();
    var foc = ''
    if($('[id=foc]').prop('checked') == true){
        foc = true
    }
    else{
        foc= false
    }
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
            'foc':foc,
            'csrfmiddlewaretoken':csrf_token
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
                    itemCode = $('input[name=item_code]').val('');
                    itemName = $('input[name=item_name]').val('');
                    amount = $('input[name=amount_used_parts]').val('');
                    var row = $("<tr />")
                    $("#cycleUsedPartsTable").append(row);
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
                    row.append($("<td>" + '<button id="btnDlt" type="button" class="btn btn-outline-secondary" value=' + response["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>' + "</td>"));
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

$(document).on('click', '#btnDlt', function () {
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
                        SubTotals()
                    }
                })

            } else {
                swal("Your imaginary file is safe!");
            }
        });
});


$("#serviceChargeCycle").keyup(function(){
    var serviceCharge = $(this).val()
    SubTotals(serviceCharge)
})