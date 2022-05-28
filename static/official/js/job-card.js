$("#fitnessForm :input").prop("disabled", true);
$("#cycleForm :input").prop("disabled", true);

$(document).ready(function(){
     $.ajax({
         url: "/api/official/technician/",
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
                $("[id=technician]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
             }
         }
     });
     $.ajax({
        url: "/api/official/brand/",
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
               $("[id=brand]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
            }
        }
    });


    $.ajax({
        url: "/api/official/wheelsize/",
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
               $("[id=wheelSize]").append($('<option>').text(rowData['size']).attr('value', rowData['id']));
            }
        }
    });

    
    $.ajax({
        url: "/api/official/model-name/",
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
               $("[id=modelName]").append($('<option>').text(rowData['name']).attr('value', rowData['id']));
            }
        }
    });

    $.ajax({
        url: "/api/official/machine-type/",
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
                $("#machineType").append($('<option>').text(rowData['type']).attr('value', rowData['id']));
            }
        }
    });

    $.ajax({
        url: "/api/official/model-no/",
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
                $("#modelNo").append($('<option>').text(rowData['model']).attr('value', rowData['id']));
                $("#model").append($('<option>').text(rowData['model']).attr('value', rowData['id']));
            }
        }
    });
});

$(document).ready(function() {
    $("#fitnessJobCardDiv").hide();
    $("#cycleJobCardDiv").hide();
    $("#shuttleJobCardDiv").hide();
    var category = $("#categoryId").val();
    if (category == 'cycle') {
        if ($("#cycleJobCardId") != null) {
            var id = $("#cycleJobCardId").val();
            $.ajax({
                url: "/api/official/cycle/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
                    );
                },
                statusCode: {
                    200: function(response) { 
                        $('textarea[name=customer_address]').val(response['customer_address']);
                        $('select[name=customer_attended_technician]').val(response['customer_attended_technician']);
                        $('select[name=model_name]').val(response['model_name']);
                        $('select[name=brand]').val(response['brand']);
                        $('input[name=color]').val(response['color']);
                        $('select[name=size]').val(response['size']);
                        $('input[name=date_of_purchase]').val(response['date_of_purchase']);
                        $('input[name=attended_date]').val(response['attended_date'])
                        $('input[name=service_attended_date]').val(response['service_attended_date'])
                        $('input[name=frame_no]').val(response['frame_no']);
                        $('#serviceChargeCycle').val(response['service_charge']);
                        $('textarea[name=action_taken]').val(response['action_taken']);
                        $('select[name=technician_name]').val(response['technician_name']);
                        $('textarea[name=remarks]').val(response['remarks']);

                        if(response['status'] =='open'){
                        $('select[name=status]').val('attended')
                        }
                        else{
                            $('select[name=status]').val(response['status'])

                        }
                        if (response['status'] == 'pending') {
                            $('input[name=pending_reason]').val(response['pending_reason'])
                            $("[id=pendingReasonDiv]").show();
                        } else if (response['status'] == 'completed') {
                            $('input[name=completed_date]').val(response['completed_date'])
                            $("[id=completedDateDiv]").show();
                            $("#btnCycleFormSubmit").hide()
                            $("#thDeleteCle").hide()
                            $("#btnUsedPartsSubmit").hide()
                        }
                        if (response['water_service'] == true) {
                            $("#waterServiceTrue").attr('checked', true)
                        } else {
                            $("#waterServiceFalse").attr('checked', true)
                        }
                        if (response['has_warranty'] == true) {
                            $("[id=warrantyTrue]").attr('checked', true)
                        } else {
                            $("[id=warrantyFalse]").attr('checked', true)
                        }
                    }
                }
            });
        }
        $("#cycleJobCardDiv").show();
    } else if (category == 'badminton') {
        if ($("#badmintonJobCardId") != 0) {
            var id = $("#badmintonJobCardId").val();
            $.ajax({
                url: "/api/official/badminton/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
                    );
                },
                statusCode: {
                    200: function(response) {     
                        $("#badmintonForm :input").prop("disabled", true);
                        $('select[name=nearest_branch]').val(response['nearest_branch']);
                        $('input[name=jobcard_no]').val(response['jobcard_no']);
                        $('input[name=attended_date]').val(response['attended_date']);
                        $('select[name=brand]').val(response['brand']);
                        $('select[name=model]').val(response['model']);
                        $('select[name=technician]').val(response['technician']);
                        $('input[name=remarks]').val(response['remarks']);
                        $('input[name=item_name]').val(response['item_name']);
                        $('input[name=code]').val(response['code']);
                        $('input[name=color]').val(response['color']);
                        $('input[name=lbs]').val(response['lbs']);
                        $('input[name=amount]').val(response['amount'])
                        $('input[name=expected_time]').val(response['expected_time']);
                        $('textarea[name=remarks]').val(response['remarks']);
                        if(response['advance_payment'] == true){
                            $("#advancePayment").prop('checked',true)
                        }
                        if(response['status'] =='open'){
                            $('select[name=status]').val('attended')
                            }
                        else{
                            $('select[name=status]').val(response['status'])

                        }
                        if (response['status'] == 'pending') {
                            $('input[name=pending_reason]').val(response['pending_reason'])
                            $("[id=pendingReasonDiv]").show();
                        } else if (response['status'] == 'completed') {
                            $('input[name=completed_date]').val(response['completed_date'])
                            $("[id=completedDateDiv]").show();
                            $('[id=btnPrint]').hide();
                            $('[id=btnSubmit]').hide();
                        }

                        if (response['bat_type'] != null){
                            var batTpe = response['bat_type'].split(","),
                            $elements = $('input[name="bat_type"]');
                            for (var j = 0; j < batTpe.length; j++) {
                                $elements.filter('[value="' + batTpe[j] + '"]').attr("checked","checked");
                            }
    
                        }
                        if (response['services'] != null){
                            var services = response['services'].split(","),
                            $elements = $('input[id="services"]');
                            for (var j = 0; j < services.length; j++) {
                                if(services[j] == 'Gutting'){
                                    $("#guttingDetailsDiv").show();
                                }
                                $elements.filter('[value="' + services[j] + '"]').attr("checked","checked");
                            }
                        
                        }
                        if(response['cover'] != null){
                            var cover = response['cover'].split(",")
                            $elements = $('input[name="cover"]');
                            for (var j = 0; j < cover.length; j++) {
                                $elements.filter('[value="' + cover[j] + '"]').attr("checked","checked");
                            }
                        }
                        if(response['payment_recieved'] != null){
                            var payment = response['payment_recieved'].split(",")
                            $elements = $('input[name="payment_recieved"]');
                            for (var j = 0; j < payment.length; j++) {
                                $elements.filter('[value="' + payment[j] + '"]').attr("checked","checked");
                            }
                        }

                    }
                }
            });
        }
        $("#shuttleJobCardDiv").show();
    } else if(category == 'fitness') {
        if ($("#fitnesesJobCardId") != 0) {
            var id = $("#fitnesesJobCardId").val();
            $.ajax({
                url: "/api/official/fitness/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
                    );
                },
                statusCode: {
                    200: function(response) {
                        $('textarea[name=customer_address]').val(response['customer_address'])
                        $('select[name=machine_type]').val(response['machine_type'])
                        $('select[name=model_no]').val(response['model_no'])
                        $('input[name=date_of_purchase]').val(response['date_of_purchase'])
                        $('textarea[name=remark]').val(response['remark'])
                        $('select[name=customer_attended_technician]').val(response['customer_attended_technician'])
                        $('select[name=technician_name]').val(response['technician_name'])
                        $('textarea[name=action_taken]').val(response['action_taken'])
                        $('input[name=attended_date]').val(response['attended_date'])
                        $('#serviceChargefitness').val(response['service_charge'])
                        if(response['status'] =='open'){
                            $('select[name=status]').val('attended')
                            }
                        else{
                            $('select[name=status]').val(response['status'])

                        }
                        if (response['status'] == 'pending') {
                            $('input[name=pending_reason]').val(response['pending_reason'])
                            $("[id=pendingReasonDiv]").show();
                        } else if (response['status'] == 'completed') {
                            $('input[name=completed_date]').val(response['completed_date'])
                            $("[id=completedDateDiv]").show();

                        }
                        if (response['amc'] == true) {
                            $("#amcTrue").attr('checked', true)
                        } else {
                            $("#amcFalse").attr('checked', true)
                        }
                        if (response['has_warranty'] == true) {
                            $("[id=warrantyTrue]").attr('checked', true)
                        } else {
                            $("[id=warrantyFalse]").attr('checked', true)
                        }
                        // $('textarea[name=customer_address]').val(response['customer_address'])
                        // $('input[name=reported_date]').val(response['reported_date'])
                        // $('select[name=machine_type]').val(response['machine_type'])
                        // $('select[name=model_no]').val(response['model_no'])
                        // $('input[name=date_of_purchase]').val(response['date_of_purchase'])
                        // $('textarea[name=complaints]').val(response['complaints'])
                        // $('input[name=billno]').val(response['billno'])
                        // $('select[name=technician_name]').val(response['technician_name'])
                        // $('textarea[name=action_taken]').val(response['action_taken'])
                        // $('input[name=attended_date]').val(response['attended_date'])
                        // $('#serviceChargefitness').val(response['service_charge'])
                        // if(response['status'] =='open'){
                        //     $('select[name=status]').val('attended')
                        //     }
                        // else{
                        //     $('select[name=status]').val(response['status'])

                        // }
                        // if (response['status'] == 'pending') {
                        //     $('input[name=pending_reason]').val(response['pending_reason'])
                        //     $("[id=pendingReasonDiv]").show();
                        // } else if (response['status'] == 'completed') {
                        //     $('input[name=completed_date]').val(response['completed_date'])
                        //     $("[id=completedDateDiv]").show();

                        // }
                        // if (response['amc'] == true) {
                        //     $("#amcTrue").attr('checked', true)
                        // } else {
                        //     $("#amcFalse").attr('checked', true)
                        // }
                        // if (response['has_warranty'] == true) {
                        //     $("[id=warrantyTrue]").attr('checked', true)
                        // } else {
                        //     $("[id=warrantyFalse]").attr('checked', true)
                        // }
                    }
                }
            });
        }
        $("#fitnessJobCardDiv").show();
    }
})
$(document).ready(function() {
    $("[id=pendingReasonDiv]").hide();
    $("[id=completedDateDiv]").hide();
});

$("[id=status]").change(function() {

    if ($(this).val() == 'pending') {
        $("[id=completedDate]").val('');
        $("[id=completedDateDiv]").hide();
        $("[id=pendingReasonDiv]").show();
    } else if ($(this).val() == 'completed') {
        $("[id=pendingReason]").val('');
        $("[id=pendingReasonDiv]").hide();
        $("[id=completedDateDiv]").show();
    } else {
        $("[id=pendingReason]").val('');
        $("[id=completedDate]").val('');
        $("[id=pendingReasonDiv]").hide();
        $("[id=completedDateDiv]").hide();
    }

});

$("[id=amcTrue]").click(function() {
    $("[id=amcFalse]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=amcFalse]").click(function() {
    $("[id=amcTrue]").prop("checked", false);
    $(this).prop("checked", true);
});


$("[id=warrantyTrue]").click(function() {
    $("[id=warrantyFalse]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=warrantyFalse]").click(function() {
    $("[id=warrantyTrue]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=waterServiceTrue]").click(function() {
    $("[id=waterServiceFalse]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=waterServiceFalse]").click(function() {
    $("[id=waterServiceTrue]").prop("checked", false);
    $(this).prop("checked", true);
});