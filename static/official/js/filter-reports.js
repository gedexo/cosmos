$(document).ready(function() {
    $('#reportsTable').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'excel', 'pdf',{
        }
        ]
    } );
} );
$("#filterForm").validate({
    rules:{
        status:{
            required:true,
            minlength:1
        },
        category:{
            required:true,
            minlength:1
        },
        branch:{
            required:true,
        },
        startdate:{
            required:true,
        },
        enddate:{
            required:true,
        }
    },
    messages:{
        status:{
            required:"status is required"
        },
        category:{
            required:"category is required"
        },
        branch:{
            required:"branch is required"
        },
        startdate:{
            required:"This field is required"
        },
        enddate:{
            required:"This field is required"
        }
    },
    submitHandler:function(){
        var status = []
        var category = []
        var branch = $("#branch").val();
        var startdate = $("#startdate").val();
        var enddate = $("#enddate").val();
        $('[name="status"]:checked').each(function(i){
            status[i] =$(this).val();
        });
        $('[name="category"]:checked').each(function(i){
            category[i] =$(this).val();
        });
        status = JSON.stringify(status)
        category = JSON.stringify(category)
        branch = JSON.stringify(branch)
        $.ajax({
            url: "/api/official/reports/?status="+status+"&category="+category+"&branch="+branch+"&startdate="+startdate+"&enddate="+enddate,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    "Token " + localStorage.getItem("admin_token")
                );
            },
            statusCode: {
                200: function (response) {
                    console.log(response)
                    table = $("#reportsTable").DataTable();  
                    table.clear()
                    table.draw()
                    if(response.length === 0){
                        table.clear()
                        table.draw()
                        swal("Poof! No data !", {
                            icon: "error",
                        });
                    }
                    drawTable(response);
                    function drawTable(data) {
                        for (var i = 0; i < data.length; i++) {
                            drawRow(data[i]);
                        }
                    }
                    function drawRow(rowData) {
                        var completedDate
                        if(rowData['status'] == 'completed'){
                            completedDate = rowData.job_card['completed_date']
                        }
                        else{
                            completedDate = 'Not completed'
                        }
                        var attendedDate
                        if(rowData['status'] == 'attended'  || rowData['status'] == 'pending' || rowData['status'] == 'completed'){
                            attendedDate = rowData.job_card['attended_date']
                        }
                        else{
                            attendedDate = 'Not attended'
                        }
                        if(rowData['status'] == 'pending' && rowData.job_card['pending_reason'] != ""){
                            status = 'pending-'+rowData.job_card['pending_reason']
                        }
                        else{
                            status = rowData['status']
                        }
                        var tableData = [];
                        table = $("#reportsTable").DataTable();  
                        tableData.push(['COSMO0'+rowData['id'],rowData['date'],attendedDate,completedDate,rowData.branch['name'],rowData['category'],status])
                        table.draw();
                        table.rows.add(tableData).draw();
                    }
                }
            }
        });
        return false;
    }
});


