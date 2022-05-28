


$(document).ready(function(){
    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/branchapi/api/get-service-request-dashboard/" + serviceRequest + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
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

$(document).ready(function() {

    var serviceRequest = $('input[name=service_request]').val();
    $.ajax({
        url: "/branchapi/api/get-service-request-dashboard/" + serviceRequest + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        statusCode: {
            200: function(response) { 
                $('input[name=name]').val(response['name'])
                $('input[name=phone]').val(response['phone'])
                var d = response['date']
                d = d.split(' ')[0];
                $('input[name=reported_date]').val(d)
            }
        }
    });

    $("#fitnessJobCardDiv").hide();
    $("#cycleJobCardDiv").hide();
    $("#shuttleJobCardDiv").hide();
    var category = $("#categoryId").val();
    if (category == 'cycle') {
        if ($("#cycleJobCardId") != null) {
            var id = $("#cycleJobCardId").val();
            $.ajax({
                url: "/branchapi/api/cycle-job-card/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                statusCode: {
                    200: function(response) { 
                        $('input[name=reported_date]').val(response.service_requests['date'])
                        $('textarea[name=customer_address]').val(response['customer_address'])
                        $('select[name=customer_attended_technician]').val(response['customer_attended_technician'])
                        $('select[name=model_name]').val(response['model_name'])
                        $('select[name=brand]').val(response['brand'])
                        $('input[name=color]').val(response['color'])
                        $('select[name=size]').val(response['size'])
                        $('input[name=date_of_purchase]').val(response['date_of_purchase'])
                        $('input[name=attended_date]').val(response['attended_date'])
                        $('input[name=service_attended_date]').val(response['service_attended_date'])
                        $('input[name=frame_no]').val(response['frame_no'])
                        $('#serviceChargeCycle').val(response['service_charge'])
                        $('textarea[name=action_taken]').val(response['action_taken'])
                        $('select[name=technician_name]').val(response['technician_name'])
                        $('textarea[name=remarks]').val(response['remarks'])
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
                            $("#btnCycleFormSubmit").hide();
                            $("#thDeleteCle").hide();
                            $("#btnUsedPartsSubmit").hide();
                            $('[id=btnSubmit]').hide();
                            $('.module-btn').hide();
                            $("[id=cycleAccessoriesDiv]").hide();
                            $("[id=cycleComplaintDiv]").hide();
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
                url: "/branchapi/api/badminton-job-card/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
                    );
                },
                statusCode: {
                    200: function(response) { 
                        $('select[name=nearest_branch]').val(response['nearest_branch'])
                        $('input[name=jobcard_no]').val(response['jobcard_no'])
                        $('input[name=attended_date]').val(response['attended_date'])
                        $('select[name=brand]').val(response['brand'])
                        $('select[name=model]').val(response['model'])
                        $('select[name=technician]').val(response['technician'])
                        $('input[name=remarks]').val(response['remarks'])
                        $('input[name=item_name]').val(response['item_name'])
                        $('input[name=code]').val(response['code'])
                        $('input[name=color]').val(response['color'])
                        $('input[name=lbs]').val(response['lbs'])
                        $('input[name=amount]').val(response['amount'])
                        $('input[name=expected_time]').val(response['expected_time'])
                        $('textarea[name=remarks]').val(response['remarks'])
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
                            $('[id=btnSubmit]').hide();
                            $('.module-btn').hide();

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
                url: "/branchapi/api/fitness-job-card/" + id + "/",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("token")
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
                            $("#btnSubmit").hide()
                            $("#btnUsedPartsFitSubmit").hide()
                            $("#thDeletefts").hide()
                            $('input[name=completed_date]').val(response['completed_date'])
                            $("[id=completedDateDiv]").show();
                            $('.module-btn').hide();
                            $("[id=fitnessComplaintsDiv]").hide();
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
                    }
                }
            });
        }
        $("#fitnessJobCardDiv").show();
    }
})
