$("#category").change(function(){
    if($(this).val()=='cycle'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>')
    }
    else if($(this).val()=='fitness'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>','<option value="onsite-service">onsite-service</option>')
    }
    else if($(this).val()=='badminton'){
        $("#serviceType").empty();
        $("#serviceType").append('<option value="branch-service">branch-service</option>')
    }
});
