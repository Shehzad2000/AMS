$(document).ready(function () {
    LoadRoute();
    LoadAirLines();
    
    LoadData();
});
function LoadData() {
    $.ajax({
        url: "/ReservationAndFlightDetail/LoadData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {

            var html = '';

            html += '<div class="table-responsive">';
            html += '<table class="table table-striped table-bordered table-hover dataTables-example">';
            html += '<thead>';
            html += '<tr>';
            html += '<th>Name</th>';
            html += '<th>CNIC</th>';
            html += '<th>Contact</th>';
            html += '<th>Passport</th>';
            html += '<th>AirLine</th>';
            html += '<th>Route</th>';
            html += '<th>Cabin</th>';
            html += '<th>DepartureTime</th>';
            html += '<th>ArrivalTime</th>';
            html += '<th>Status</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
            $.each(res, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.CNIC + '</td>';
                html += '<td>' + item.ContactNo + '</td>';
                html += '<td>' + item.PassportNo + '</td>';
                html += '<td>' + item.AirLineName + '</td>';
                html += '<td>' + item.Route + '</td>';
                html += '<td>' + item.CabinName + '</td>';
                html += '<td>' + item.DepartureTime + '</td>';
                html += '<td>' + item.ArrivalTime + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '</tr>';
            });
            $('.tScheduleData').html(html);
            html += '</tbody>';
            html += '<tfoot>';
            html += '<tr>';
            html += '<th>Name</th>';
            html += '<th>CNIC</th>';
            html += '<th>Contact</th>';
            html += '<th>Passport</th>';
            html += '<th>AirLine</th>';
            html += '<th>Route</th>';
            html += '<th>Cabin</th>';
            html += '<th>DepartureTime</th>';
            html += '<th>ArrivalTime</th>';
            html += '<th>Status</th>';
            html += '</tr>';
            html += '</tfoot>';
            html += '</table>';
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
    
}
function LoadRoute() {

    $.ajax({
        url: "/ReservationAndFlightDetail/LoadRoute/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {

            var select = '';
            select += '<select id="ddl_Route"  class="form-control input1" >';
            select += '<option value="-1">' + "--- Select Route ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option  value="' + item.RouteID + '">' + item.RouteName + '</option>';
            });
            select += '</select>';
            $('.RouteInfo').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadAirLines() {

    $.ajax({
        url: "/ReservationAndFlightDetail/LoadAirLine/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {

            var select = '';
            select += '<select class="form-control">';
            select += '<option value="-1">' + "--- Select Route ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option  value="' + item.AirLineID + '">' + item.AirLineName + '</option>';
            });
            select += '</select>';
            $('.AirLineInfo').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}