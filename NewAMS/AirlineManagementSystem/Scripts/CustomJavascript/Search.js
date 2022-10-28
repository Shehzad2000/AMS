$(document).ready(function () {
    LoadFromSearch();
});
function LoadFromSearch() {
    debugger;
    $.ajax({
        url: "/Search/FetchResult/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_FromSearch" onchange="LoadToSearch();" class="form-control input1">';
            select += '<option value="' + "-1" + '">' + "--- Select Route ---" + '</option>';

            $.each(res, function (key, item) {
                select += '<option value="' + item.RouteID + '">' + item.FromRoute + '</option>';
            });
            select += '</select>';
            $(".FromSearchInfo").html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadToSearch() {
    ID = document.getElementById("ddl_FromSearch").value;
    debugger;
    $.ajax({
        url: "/Search/FetchResult/"+ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_ToSearch" class="form-control input1">';
            $.each(res, function (key, item) {
                select += '<option value="' + item.RouteID + '">' + item.ToRoute + '</option>';
            });
            select += '</select>';
            $(".ToSearchInfo").html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadData() {
    var ID = document.getElementById(ddl_ToSearch).value;
    $.ajax({

        url: "/Search/FetchResult/"+ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            debugger;
            var html = '';
            var status = '';
            $.each(res, function (key, item) {
                if (item.Status == 0) {
                    status = '<span class="badge bg-danger">Pending</span>';
                }
                else {
                    status = '<span class="badge bg-primary">Available</span>';
                }
                var DepartureTime = moment(item.DepartureTime).format('MMMM-DD h:mm:ss A');
                var ArrivalTime = moment(item.ArrivalTime).format('MMMM-DD h:mm:ss A');
                html += '<tr>';
                html += '<td>' + item.AirLineName + '</td>';
                html += '<td>' + DepartureTime+ '</td>';
                html += '<td>' + ArrivalTime + '</td>';
                html += '<td>' + item.Date + '</td>';
                html += '<td>' + status + '</td>';

                html += '</tr>';
            });
            $('.tSchedule').html(html);
        }
    });
}
function AirLineAddOrUpdate() {
    debugger;
    var AirLineObj = {
        AirLineID: $('#AirLineID').val(),
        AirPortID: $('#ddl_AirPorts option:selected').val(),
        AirLineName: $('#AirLineName').val(),
        BusinessSeat: $('#BusinessSeat').val(),
        EconomicSeat: $('#EconomicSeat').val(),
        Status: $('#SStatus option:selected').val()
    };
    $.ajax({
        url: "/AirLine/AirLine/",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(AirLineObj),
        success: function (res) {
            debugger;
            if (res.AirLineID > 0) {
                $("#myCModal").modal('hide');
            }
            ClearAirLineTextBoxes();
            LoadAirLineData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}

