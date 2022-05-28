$(document).ready(function(){
    $.ajax({
        url: "/branchapi/count-requests/",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
        success: function(response) {
            $("#open").html(response['open'])
            $("#attended").html(response['attended'])
            $("#completed").html(response['completed'])
            $("#pending").html(response['pending'])

        }
    });
    return fitness()
});

$("#fitnessAtag").click(function(){
    table = $("#fitnessTable").DataTable();
    table.clear()
    return fitness()
});

$("#cycleAtag").click(function(){
    table = $("#cycleTable").DataTable();
    table.clear()
    return cycle()
});

$("#badmintonAtag").click(function(){
    table = $("#badmintonTable").DataTable();
    table.clear()
    return badminton()
});



function fitness(){
    table = $("#fitnessTable").DataTable();
    $.ajax({
        url: "/branchapi/api/get-service-request-dashboard/?category=fitness",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
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
                table = $("#fitnessTable").DataTable();
                var id = '<a href="/branch/job-card/' + rowData['id'] + '"><b >'+'COSMO0' + rowData['id']+'</b></a>'
                var status = ''

                if (rowData["status"] == 'open') {
                    status = '<span class="badge bg-primary">' + rowData["status"] + '</span>'
                } else if (rowData["status"] == 'pending') {
                    status = '<span class="badge bg-danger">' + rowData["status"] + '</span>'

                } else if (rowData["status"] == 'attended') {
                    status = '<span class="badge bg-info">' + rowData["status"] + '</span>'
                }
                tableData.push([id, rowData["date"],rowData["name"],rowData['phone'],rowData['description'],rowData['updated_date'], rowData["category"], rowData["service_type"], status])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });

}


function cycle(){
    $.ajax({
        url: "/branchapi/api/get-service-request-dashboard/?category=cycle",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
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
                table = $("#cycleTable").DataTable();
                var id = '<a href="/branch/job-card/' + rowData['id'] + '"><b >'+'COSMO0' + rowData['id']+'</b></a>'
                var status = ''

                if (rowData["status"] == 'open') {
                    status = '<span class="badge bg-primary">' + rowData["status"] + '</span>'
                } else if (rowData["status"] == 'pending') {
                    status = '<span class="badge bg-danger">' + rowData["status"] + '</span>'

                } else if (rowData["status"] == 'attended') {
                    status = '<span class="badge bg-info">' + rowData["status"] + '</span>'
                }
                tableData.push([id, rowData["date"],rowData["name"],rowData['phone'],rowData['description'],rowData['updated_date'], rowData["category"], rowData["service_type"], status])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });

}

function badminton(){
    $.ajax({
        url: "/branchapi/api/get-service-request-dashboard/?category=badminton",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
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
                table = $("#badmintonTable").DataTable();
                var id = '<a href="/branch/job-card/' + rowData['id'] + '"><b >'+'COSMO0' + rowData['id']+'</b></a>'
                var status = ''

                if (rowData["status"] == 'open') {
                    status = '<span class="badge bg-primary">' + rowData["status"] + '</span>'
                } else if (rowData["status"] == 'pending') {
                    status = '<span class="badge bg-danger">' + rowData["status"] + '</span>'

                } else if (rowData["status"] == 'attended') {
                    status = '<span class="badge bg-info">' + rowData["status"] + '</span>'
                }
                tableData.push([id, rowData["date"],rowData["name"],rowData['phone'],rowData['description'],rowData['updated_date'], rowData["category"], rowData["service_type"], status])
                table.draw();
                table.rows.add(tableData).draw();
            }
        }
    });

}