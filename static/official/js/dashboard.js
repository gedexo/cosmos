$(document).ready(function() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/official/branch-details/",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function(response) {
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }
            }
            function drawRow(rowData) {
                var tableData = [];
                table = $("#serviceRequestTable").DataTable();  
                var name = '<a href="/official/service-requests/?branch_id='+rowData['id']+'"><b>'+rowData['name']+'</b></a>'            
                tableData.push([name,rowData['open'],rowData['attended'],rowData['pending'],rowData['completed']])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });

    return getCount()
});

function getCount(){

    $.ajax({
        url: "http://127.0.0.1:8000/api/get-count/",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function(response) {
            $("#open").html(response['open'])
            $("#attended").html(response['attended'])
            $("#completed").html(response['completed'])
            $("#pending").html(response['pending'])

        }
    });

}