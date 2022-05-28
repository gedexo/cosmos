$(document).ready(function() {
    $.ajax({
        url: "/branchapi/api/get-service-request/?status=completed",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
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
                table = $("#serviceRequestTable").DataTable();
                var subTotal = ''
                if (rowData['category'] == 'badminton'){
                    if(rowData.is_viewed != null){
                        subTotal = rowData.is_viewed['amount']
                    }
                    else{
                        subTotal = 0
                    }
                }
                else if(rowData.is_viewed['service_charge'] != null){
                    var subTotal = parseInt(rowData.is_completed['total_sum'])+parseInt(rowData.is_viewed['service_charge'])
                }
                else{
                    var subTotal = rowData.is_completed['total_sum']

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
});


$(document).on('click', '#btnDelete', function() {
    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this service request!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var id = $(this).val();
                $(this).closest('tr').remove();
                $.ajax({
                    url: "/branchapi/api/del-service-request/" + id + "/",
                    type: "DELETE",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(
                            "Authorization",
                            "Token " + localStorage.getItem("token")
                        );
                    },
                    success: function() {
                        swal("Poof! Deleted Successfully!", {
                            icon: "success",
                        });
                    }
                })

            } else {
                swal("Your imaginary file is safe!");
            }
        });

});