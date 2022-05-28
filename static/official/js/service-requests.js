$(document).ready(function () {
    return getData();
});


function getData() {
    table = $("#serviceRequestTable").DataTable();
    table.clear()
    var searchParams = new URLSearchParams(window.location.search)
    var branchId = searchParams.get('branch_id')
    $.ajax({
        url: "http://127.0.0.1:8000/api/official/service-requests/?branch_id=" + branchId,
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
                if (data.length < 1) {
                    swal("Poof! No Data!", {
                        icon: "error",
                    });
                }
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }
            }
            function drawRow(rowData) {
                var tableData = [];
                table = $("#serviceRequestTable").DataTable();
                if (rowData.job_card == false || rowData.job_card == null) {
                    var id = 'COSMO0' + rowData['id']
                    var status = '<p class="text-danger">Not attended</p>'
                    tableData.push([id, rowData['date'],rowData['category'],rowData['name'],rowData['phone'], status, rowData['updated_date'], rowData['status']])
                    table.draw();
                    table.rows.add(tableData).draw();
                }
                else {
                    if (rowData.job_card['status'] == 'pending' && rowData.job_card['pending_reason'] != "") {
                        var status = 'pending (' + rowData.job_card['pending_reason'] + ')'
                    }
                    else {
                        var status = rowData['status']
                    }
                    var id = '<a href="/official/job-card/'+rowData['id']+'"><b>COSMO0'+rowData['id']+'</b></a>'
                    tableData.push([id,rowData['date'],rowData['category'],rowData['name'],rowData['phone'],rowData.job_card['attended_date'], rowData['updated_date'], status])
                    table.draw();
                    table.rows.add(tableData).draw();
                }
            }
        }
    });
}

$("#status").change(function () {
    if ($(this).val() != 'All') {
        table = $("#serviceRequestTable").DataTable();
        table.clear()
        var searchParams = new URLSearchParams(window.location.search)
        var branchId = searchParams.get('branch_id')
        $.ajax({
            url: "http://127.0.0.1:8000/api/official/service-requests-status/?branch_id=" + branchId + "&status=" + $(this).val(),
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
                    if (data.length < 1) {
                        swal("Poof! No Data!", {
                            icon: "error",
                        });
                    }
                    for (var i = 0; i < data.length; i++) {
                        drawRow(data[i], data.length);
                    }
                }
                function drawRow(rowData, data) {
                    var tableData = [];
                    if (rowData.job_card == false || rowData.job_card == null) {
                        var id = 'COSMO0' + rowData['id']
                        var status = '<p class="text-danger">Not attended</p>'
                        tableData.push([id, rowData['date'],rowData['category'],rowData['name'],rowData['phone'], status, rowData['updated_date'], rowData['status']])
                        table.draw();
                        table.rows.add(tableData).draw();
                    }
                    else {

                        if (rowData.job_card['status'] == 'pending' && rowData.job_card['pending_reason'] != "") {
                            var status = 'pending (' + rowData.job_card['pending_reason'] + ')'
                        }
                        else {
                            var status = rowData['status']
                        }
                        var id = '<a href="/official/job-card/'+rowData['id']+'"><b>COSMO0'+rowData['id']+'</b></a>'
                        tableData.push([id, rowData['date'],rowData['category'],rowData['name'],rowData['phone'], rowData.job_card['attended_date'], rowData['updated_date'], status])
                        table.draw();
                        table.rows.add(tableData).draw();
                    }
                }
            }
        });

    }
    else {
        return getData();
    }
})

