$(document).ready(function() {
    var searchParams = new URLSearchParams(window.location.search)
    var serviceRequest = searchParams.get('service_request')

    $.ajax({
        url: "/api/official/logs/?service_request="+serviceRequest,
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function(response) {
            console.log(response)
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }
            }
            function drawRow(rowData) {
                var tableData = [];
                table = $("#logsTable").DataTable();  
                tableData.push([rowData['date'],rowData['entry'],rowData['user']])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });

});
