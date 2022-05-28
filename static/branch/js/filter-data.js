$("#filterForm").submit(function(){
    var startDate =$("#startDate").val()
    var endDate = $("#endDate").val()
    $.ajax({
        url: "/branchapi/api/filter-requests/?start_date="+startDate+"&end_date="+endDate,
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function(response) {
            table = $("#serviceRequestTable").DataTable();
            table.clear();
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
                var subTotal = ''
                if (rowData['category'] == 'badminton'){
                    subTotal = ''
                }
                else{
                    var subTotal = parseInt(rowData.is_completed['total_sum'])+parseInt(rowData.is_viewed['service_charge'])
                }
                var id = '<a href="/branch/job-card/' + rowData['id'] + '"><b >'+'COSMO0' + rowData['id']+'</b></a>'
                var status = ''
                status = '<span class="badge bg-success">' + rowData["status"] + '</span>'
                var jobCard = '<a href="/branch/job-card/' + rowData['id'] + '"><span class="badge bg-success">view</span></a>'
                var deleteRequest = '<button id="btnDelete" type="button" class="btn btn-outline-secondary" value=' + rowData["id"] + ' deleterow"><i class="icofont-ui-delete text-danger"></i></button>'
                tableData.push([id, rowData["date"],rowData['updated_date'], rowData["category"], rowData["service_type"], rowData["name"], rowData["phone"], rowData["description"],subTotal,status, jobCard, deleteRequest])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });
    return false;
});