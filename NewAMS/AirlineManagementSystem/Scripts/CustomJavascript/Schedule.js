
$(document).ready(function () {
    LoadScheduleData();
    LoadRoute();
    LoadAirLine();
});
function LoadScheduleData() {
    $.ajax({
        url: "/Schedule/GetData",
        type: "Get",
        //contentType: "application/json;charset=utf-8",
        //dataType: "json",
        success: function (res) {
            debugger;
            var html = '';
            $.each(res, function (key, item) {
              
                html += '<tr>';
                html += '<td>' + item.RouteID + '</td>';
                html += '<td>' + item.AirLineID + '</td>';
                html += '<td>' + formatDate(item.DepartureTime) + '</td>';
                html += '<td>' + formatDate(item.ArrivalTime) + '</td>';
                html += '<td>' + item.Date + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetSheduleData(' + item.ScheduleID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a class="btn btn-danger" href="#" onclick="SheduleDelete(' + item.ScheduleID + ')"><i class="fa fa-trash"></i><span><strong> Delete</strong></span></a></td>';
                html += '</tr>';
            });
            $('.tScheduleData').html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
function LoadRoute() {

    $.ajax({
        url: "/Schedule/GetRoute/",
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
function LoadAirLine() {
    $.ajax({
        url: "/Schedule/GetAirline/" ,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            //document.getElementById("ddl_Cities").innerHTML = "";
            debugger;
            var select = '';
            select += '<select id="ddl_AirLine"  class="form-control input1" >';

            $.each(res, function (key, item) {
                select += '<option value="' + item.AirLineID + '">';
                select += item.AirLineName;
                select += '</option>';
            });
            select += '</select>';

            $('.AirLines').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });

}
function ScheduleAddOrUpdate() {
    var ScheduleObj = {
        ScheduleID: $('#ScheduleID').val(),
        RouteID: $('#ddl_Route option:selected').val(),
        AirLineID: $('#ddl_AirLine option:selected').val(),
        DepartureTime: $('#DepartureTime ').val(),
        ArrivalTime: $('#ArrivalTime').val(),
        Date: $('#Date').val(),
        Status: $('#Status').val(),
    };
    $.ajax({
        url: "/Schedule/Schedule/",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        data: JSON.stringify(ScheduleObj),
        success: function (res) {
            if (ScheduleID > 0) {
                $("#myCModal").modal('hide');
            }
            
            LoadScheduleData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}
function ClearAirPortTextBoxes() {
    $('#RouteID').val("");
    $('#AirLineID').val("");
    $('#DepartureTime').val("");
    $('#ArrivalTime').val("");
    $('#Date').val("");
    $('#Status').val("");

}
function ScheduleDelete(ID) {
    var ans = confirm("Do you really want to delete this item??");
    if (ans) {
        $.ajax({
            url: "/Schedule/Delete/" + ID,
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (res) {
                LoadSheduleData();
            },
            error: function (err) {
                alert(err.responseText);
            }

        })
    }
}
function GetSheduleData(ID) {
    debugger;
    $.ajax({
        url: "/Schedule/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            debugger;
            var now = res.Date;

            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);

            var date = now.getFullYear() + "-" + (month) + "-" + (day);

            $('#datePicker').val(today);
            
            $('#SheduleID').val(res.ScheduleID);
            $('#RouteID').val(res.RouteID);
            $('#AirLineID').val(res.AirLineID);
            $('#DepartureTime').val(res.DepartureTime);
            $('#ArrivalTime').val(res.ArrivalTime);
            $('#Date').val(date);
            $('#Status').val(res.Status);
            $('#myCModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}