$(document).ready(function(){

    $("[id=completedDateDiv]").hide();
});

var searchParams = new URLSearchParams(window.location.search)
var jobCardId = $("#jobCardIds").val();
var category = searchParams.get('category')
var subCategory = searchParams.get('sub_category')
var serviceRequest = searchParams.get('service_request')

if(category=='cycle'){
    cycle(jobCardId,subCategory,serviceRequest)
}
else if(category=='fitness'){
    fitness(jobCardId,subCategory)
}
else if(category=='badminton'){
    badminton(jobCardId)
}

function cycle(jobCardId,subCategory,serviceRequest){

    if(subCategory=='technician'){
        $("#cycleProductDetailsDiv").hide();
        $("#badmintonDetailsDiv").hide();
        $("#fitnessProductDetailsDiv").hide();
        $("#fitnessTechnicianDetailsDiv").hide();
        cycleJobCard(jobCardId,serviceRequest);
        complaints(serviceRequest)
        accessories(serviceRequest)
    }
    else if(subCategory=='product'){
        $("#cycleTechnicinaDetailsDiv").hide();
        $("#badmintonDetailsDiv").hide();
        $("#fitnessProductDetailsDiv").hide();
        $("#fitnessTechnicianDetailsDiv").hide();
        cycleJobCard(jobCardId,serviceRequest);
        complaints(serviceRequest)
        accessories(serviceRequest)
    }
}

function fitness(jobCardId,subCategory){
    if(subCategory=='technician'){
        $("#cycleProductDetailsDiv").hide();
        $("#cycleTechnicinaDetailsDiv").hide();
        $("#badmintonDetailsDiv").hide();
        $("#fitnessProductDetailsDiv").hide();
        fitnessJobCard(jobCardId,serviceRequest);
        complaints(serviceRequest)
        accessories(serviceRequest)

    }
    else if(subCategory=='product'){
        $("#cycleProductDetailsDiv").hide();
        $("#cycleTechnicinaDetailsDiv").hide();
        $("#badmintonDetailsDiv").hide();
        $("#fitnessTechnicianDetailsDiv").hide();
        fitnessJobCard(jobCardId,serviceRequest);
        complaints(serviceRequest)
        accessories(serviceRequest)

    }

}
function badminton(jobCardId){
    $("#cycleProductDetailsDiv").hide();
    $("#cycleTechnicinaDetailsDiv").hide();
    $("#fitnessProductDetailsDiv").hide();
    $("#fitnessTechnicianDetailsDiv").hide();
    badmintonJobCard(jobCardId)
}


function cycleJobCard(jobCardId,serviceRequest){
    $.ajax({
        url: "/api/official/print-cycle-jobcard/" + jobCardId + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        statusCode: {
            200: function(response) { 
                $("[id=cycleServiceRequestID]").html('COSMO0'+serviceRequest)
                $("#cycleJobCardName").html(response.service_requests['name'])
                $("#cycleJobCardPhone").html(response.service_requests['phone'])
                $("#cycleJobCardReportDate").html(response.service_requests['date'])
                $("#cycleJobCardAddress").html(response['customer_address'])
                $("#cycleJobCardColor").html(response['color'])
                $("#cycleJobCardFrameNO").html(response['frame_no'])
                $("#cycleJobCardPurchaseDate").html(response['date_of_purchase'])
                $("#cycleJobCardRecievedDate").html(response['attended_date'])
                $("#cycelJobcardActionTaken").append(response['action_taken'])
                $("#cycleJobCardServiceCharge").append(response['service_charge'])
                $("#cycelJobcardRemark").append(response['remarks'])
                $("#cycleJobCardServiceAttendedDate").html(response['service_attended_date'])
                usedParts(serviceRequest,response['service_charge'])
                if (response.size != null){
                    $("#cycleJobCardWheelSize").html(response.size['size'])
                }
                if(response.model_name != null){
                    $("#cycleJobCardModelName").html(response.model_name['name'])
                }
                if(response['has_warranty'] == true){
                    $("#cycleJobCardWarrantyTrue").prop('checked',true)
                }
                else{
                    $("#cycleJobCardWarrantyFalse").prop('checked',true)
                }
                if(response['water_service'] == true){
                    $("#cycleJobCardWaterServiceTrue").prop('checked',true)
                }
                else{
                    $("#cycleJobCardWaterServiceFalse").prop('checked',true)
                }
                if(response.brand != null ){
                    $("#cycleJobCardBrand").html(response.brand['name'])
                }
                if(response.technician_name != null){
                    $("#cycleJobCardTechnican").html(response.technician_name['name'])
                }
             
                if(response.customer_attended_technician != null){
                    $("#cycleJobCardCustomerAttendTechnician").html(response.customer_attended_technician['name'])
                }
                if(response['status'] == 'completed'){
                    $("[id=completedDateDiv]").show();
                    $("[id=completedDate]").html(response['completed_date'])
                }

            }
        }
        })
}


function fitnessJobCard(jobCardId){
    $.ajax({
        url: "/api/official/print-fitness-jobcard/" + jobCardId + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        statusCode: {
            200: function(response) { 
                $("[id=fitnessServiceRequestID]").html('COSMO0'+serviceRequest)
                $("#fitnessJobCardAddress").html(response['customer_address'])
                $("#fitnessJobCardName").html(response.service_requests['name'])
                $("#fitnessJobCardPhone").html(response.service_requests['phone']) 
                $("#fitnessJobCardDateOfPurchase").html(response['date_of_purchase'])
                $("#fitnessJobCardReportedDate").html(response.service_requests['date'])
                $("#fitnessJobCardAttendedDate").html(response['attended_date'])
                $("#fitnessJobCardServiceCharge").html(response['service_charge'])


                usedParts(serviceRequest,response['service_charge'])

                if(response.machine_type != null){
                    $("#fitnessJobCardMachineType").append(response.machine_type['type'])
                }
                if(response.model_no != null){
                    $("#fitnessJobCardModelNo").append(response.model_no['model'])
                }
                if(response.customer_attended_technician != null){
                    $("#fitnessJobCardCustomerAttendTechnician").html(response.customer_attended_technician['name'])
                }
                if(response.technician_name != null){
                    $("#fitnessJobCardTechnician").html(response.technician_name['name'])
                }
                $("#fitnessJobCardActionTaken").append(response['action_taken'])
                $("#fitnessJobCardRemark").html(response['remark'])
                if(response['has_warranty'] == true){
                    $("#fitnessJobCardWarrantyTrue").prop('checked',true)
                }
                else{
                    $("#fitnessJobCardWarrantyFalse").prop('checked',true)
                }
                if(response['amc'] == true){
                    $("#fitnessJobCardAmcTrue").prop('checked',true)
                }
                else{
                    $("#fitnessJobCardAmcFalse").prop('checked',true)
                }
                if(response['status'] == 'completed'){
                    $("[id=completedDateDiv]").show();
                    $("[id=completedDate]").html(response['completed_date'])
                }
              
            }
        }
        })
}


function complaints(serviceRequest){
    $.ajax({
        url: "/api/official/complaints/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        statusCode: {
            200: function(response) {
                for(var i=0; i<response.length; i++){
                    var complaintsCycle = $("#complaintsCycle")
                    complaintsCycle.append('\
                    <ul style="list-style: none;">\
                    <li> <span>*</span>'+response[i].complaint['complaint']+'</li>\
                    </ul>\
                    ')
                    var complaintsFitness = $("#complaintsFitness")
                    complaintsFitness.append('\
                    <ul style="list-style: none;">\
                    <li> <span>*</span>'+response[i].complaint['complaint']+'</li>\
                    </ul>\
                    ')
                }
               
            },
          
        },
    });
}


function accessories(serviceRequest){
    $.ajax({
        url: "/api/official/accessories/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        statusCode: {
            200: function(response) {
                for(var i=0; i<response.length; i++){
                    var complaintsCycle = $("#accessoriesCycle")
                    complaintsCycle.append('\
                    <ul style="list-style: none;">\
                    <li> <span>*</span>'+response[i].accessories['accessories']+'</li>\
                    </ul>\
                    ')
                    
                }
               
            },
          
        },
    });
}

function badmintonJobCard(jobCardId){
    $.ajax({
        url: "/api/official/print-badminton-jobcard/" + jobCardId + "/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        statusCode: {
            200: function(response) { 
                $("[id=badmintonServiceRequestID]").html('COSMO0'+serviceRequest)
                $("#badmintonJobCardReportedDate").html(response.service_requests['date'])               
                $("#badmintonJobCardName").html(response.service_requests['name'])
                $("#badmintonJobCardPhone").html(response.service_requests['phone'])
                $("#badmintonJobCardAttendedDate").html(response['attended_date'])
                $("#badmintonJobCardItemName").append(response['item_name'])
                $("#badmintonJobCardItemCode").append(response['code'])
                $("#badmintonJobCardColor").append(response['color'])
                $("#badmintonJobCardLbs").append(response['lbs'])
                $("#badmintonJobCardRemarks").html(response['remarks'])
                $("#badmintonJobCardAmount").append(response['amount'])
                $("#badmintonJobCardExpectedDeliveryTime").html(response['expected_time'])
                if(response.nearest_branch != null){
                    $("#badmintonJobCardNearestBranch").html(response.nearest_branch['name'])
                }
                $("#badmintonJobCardJobCardNo").html(response['jobcard_no'])
             
                if(response.model != null){
                    $("#badmintonJobCardModel").html(response.model['model'])
                }
              
                if(response['bat_type'] == "tennis"){
                    $("#badmintonBat").prop('checked',true)
                }
                else{
                    $("#tennisBat").prop('checked',true)
                }
                if(response['advance_payment'] == true){
                    $("#advancePayment").prop('checked',true)
                }
                if (response['services'] != null){
                    var services = response['services'].split(","),
                    $elements = $('input[id="services"]');
                    for (var j = 0; j < services.length; j++) {
                        $elements.filter('[value="' + services[j] + '"]').attr("checked","checked");
                        if(services[j] == 'Gutting'){
                            $("#guttingDetailsDiv").show();
                        }
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
                    $elements = $('[id=payment]');
                    for (var j = 0; j < payment.length; j++) {
                        $elements.filter('[value="' + payment[j] + '"]').attr("checked","checked");
                    }
                }
                if(response.brand != null){
                    $("#badmintonJobCardBrand").html(response.brand['name'])                
                }
                if(response.technician != null){
                    $("#badmintonJobCardTechnician").html(response.technician['name'])
                }
                if(response['status'] == 'completed'){
                    $("[id=completedDateDiv]").show();
                    $("[id=completedDate]").html(response['completed_date'])
                }

            }
        }
        })
}

function usedParts(serviceRequest,serviceCharge){
    var cycleUsedPartstotal = [];
    var fitnessUsedPartstotal = [];

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
                if(category ==  'cycle'){
                    cycleUsedPartstotal.push(rowData['amount'])
                }
                else if(category == 'fitness'){
                    fitnessUsedPartstotal.push(rowData['amount'])
                }
                var row = $("<tr />")
                $("[id=jobCardUsedPartsTableCycle]").append(row);
                var foc = ''
                if(rowData['foc'] == true){
                    foc = 'Foc'
                }
                else{
                    foc = ''
                }
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + foc + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));

                var row = $("<tr />")
                $("[id=jobCardUsedPartsTableFitness]").append(row);
                var foc = ''
                if(rowData['foc'] == true){
                    foc = 'Foc'
                }
                else{
                    foc = ''
                }
                row.append($("<td>" + rowData["item_code"] + "</td>"));
                row.append($("<td>" + rowData["item_name"] + "</td>"));
                row.append($("<td>" + foc + "</td>"));
                row.append($("<td>" + rowData["amount"] + "</td>"));
            }
            var sumCycle = cycleUsedPartstotal.reduce((partial_sum, a) => partial_sum + a, 0);
            $("[id=usedPartsTotalCycle]").html(sumCycle)
            if (serviceCharge != null){
                var subTotalCycle = parseInt(sumCycle)+parseInt(serviceCharge)
                $("[id=subTotalCycle]").html(subTotalCycle)
            }
            else{
                $("[id=subTotalCycle]").html(sumCycle)
            }
            var sumFitness = fitnessUsedPartstotal.reduce((partial_sum, a) => partial_sum + a, 0);
            $("[id=usedPartsTotalFitness]").html(sumFitness)
            if (serviceCharge != null){
                var subTotal = parseInt(sumFitness)+parseInt(serviceCharge)
                $("[id=subTotalFitness]").html(subTotal)
            }
            else{
                $("[id=subTotalFitness]").html(sumFitness)
            }
        }
       
    });

}

// print 

$("#btnPrint").click(function(){
    window.print()
});
$("#btnBack").click(function(){
    window.location.href="/official/job-card/"+serviceRequest+"/"
});
// window.onafterprint = function(){
    
// };


