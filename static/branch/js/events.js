

$(document).ready(function() {
    $("#technicianFDetailsDiv").hide();
    $("[id=pendingReasonDiv]").hide();
    $("[id=completedDateDiv]").hide();
    $("#guttingDetailsDiv").hide();
    $("[id=technicianFDetails]").hide();
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

$("[id=batTypeBadminton]").click(function() {
    $("[id=batTypeTennis]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=batTypeTennis]").click(function() {
    $("[id=batTypeBadminton]").prop("checked", false);
    $(this).prop("checked", true);
});


$('[name=guttingService]').change(function(){
    $("#guttingDetailsDiv").fadeToggle();
});

$("[id=coverFull]").click(function() {
    $("[id=coverHalf]").prop("checked", false);
    $("[id=coverNill]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=coverHalf]").click(function() {
    $("[id=coverFull]").prop("checked", false);
    $("[id=coverNill]").prop("checked", false);
    $(this).prop("checked", true);
});

$("[id=coverNill]").click(function() {
    $("[id=coverFull]").prop("checked", false);
    $("[id=coverHalf]").prop("checked", false);
    $(this).prop("checked", true);
});


$("input[name=payment_recieved]").change(function(){
  if($(this).val()=='paid'){
    $('#notpaid').prop('checked',false)
    $('#partial').prop('checked',false)
  }
  else if($(this).val()=='notpaid'){
    $('#paid').prop('checked',false)
    $('#partial').prop('checked',false)
  }
  else if($(this).val()=='partial'){
    $('#notpaid').prop('checked',false)
    $('#paid').prop('checked',false)
  }
});

$("[id=foc]").change(function(){
    if($(this).prop('checked') == true){
        $('[name=amount_used_parts]').val(0)
        $('[name=amount_used_parts]').prop('disabled',true)
    }
    else{
        $('[name=amount_used_parts]').prop('disabled',false)
    }
});


$("[id=focF]").change(function(){
    if($(this).prop('checked') == true){
        $('[name=amount_used_parts_ft]').val(0)
        $('[name=amount_used_parts_ft]').prop('disabled',true)
    }
    else{
        $('[name=amount_used_parts_ft]').prop('disabled',false)
    }
});

$("#btnFitnessTechcian").click(function(){
    $("#technicianFDetailsDiv").fadeToggle(1000);
});

$("#btnCycleTechnician").click(function(){
    $("[id=technicianFDetails]").fadeToggle(1000);

});


$("#printCycleDetails").click(function(){
    $("#dropDown").removeClass('dropdown-content')
    $("#printFitnessDetails").removeClass('dropbtn')
    document.getElementById("dropDownCycle").classList.toggle("show");
});

$("#printFitnessDetails").click(function(){
    $("#dropDownCycle").removeClass('dropdown-content')
    $("#printCycleDetails").removeClass('dropbtn')
    document.getElementById("dropDown").classList.toggle("show");
});

var jobCardId = ''
if($("#categoryId").val() == 'cycle'){
    jobCardId = $("#cycleEditId").val();
}
if($("#categoryId").val() == 'fitness'){
   jobCardId = $("#fitnessEditId").val();

}
if($("#categoryId").val() == 'badminton'){
   jobCardId = $("#badmintonEditId").val();

}


function printTechnicianDetails(category,srId){
    window.location.href="/branch/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category="+category+"&sub_category=technician"
}
function printProductDetails(category,srId){
    window.location.href="/branch/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category="+category+"&sub_category=product"
}
function badminton(srId){
    window.location.href="/branch/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category=badminton"
}

$('input[type=date]').change(function(){
    
    var id = $(this).attr('name')
    if(id == 'date_of_purchase'){
    } 
    else{
        var dtToday = new Date();
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var minDate= year + '-' + month + '-' + day;
        
        $(this).attr('min', minDate);
    }
});
