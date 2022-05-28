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
    window.location.href="/official/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category="+category+"&sub_category=technician"
}
function printProductDetails(category,srId){
    window.location.href="/official/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category="+category+"&sub_category=product"
}
function badminton(srId){
    window.location.href="/official/print/"+srId+"/?job_card_id="+jobCardId+"&service_request="+srId+"&category=badminton"
}


