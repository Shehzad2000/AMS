$(document).ready(function () {
    LoadAirLineData();
    LoadAirPorts();
    
})
function LoadAirPorts() {
    debugger;
    $.ajax({
        url: "/AirLine/GetAirport/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_AirPorts" class="form-control input1">';
            $.each(res, function (key, item) {
                select += '<option value="' + item.AirPortID + '">' + item.AirPortName + '</option>';
            });
            select += '</select>';
            $(".Airports").html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}

function LoadAirLineData() {
    $.ajax({

        url: "/AirLine/GetData/",
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
                html += '<tr>';
                html += '<td>' + item.AirPortID + '</td>';
                html += '<td>' + item.AirLineName + '</td>';
                html += '<td>' + item.BusinessSeat + '</td>';
                html += '<td>' + item.EconomicSeat + '</td>';
                html += '<td>' + status + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetAirLineData(' + item.AirLineID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a class="btn btn-danger" href="#" onclick="AirLineDelete(' + item.AirLineID + ')"><i class="fa fa-trash"></i><span><strong> Delete</strong></span></a></td>';
               html += '</tr>';
            });
            $('.tAirLinebody').html(html);
        }
    });
}
function AirLineAddOrUpdate() {
    debugger;
    var AirLineObj = {
        AirLineID:$('#AirLineID').val(),
        AirPortID: $('#ddl_AirPorts option:selected').val(),
        AirLineName: $('#AirLineName').val(),
        BusinessSeat:$('#BusinessSeat').val(),
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

function ClearAirLineTextBoxes() {
    $("#AirLineID").val("");
    $("#AirPortID").val(-1);
    $("#AirLineName").val("");
    $("#BusinessSeat").val("");
    $("#EconomicSeat").val("");
    $("#Status").val(-1);
}
function AirLineDelete(ID) {
    var ans = confirm("Do you really want to delete this item??");
    if (ans) {
        $.ajax({
            url: "/AirLine/Delete/" + ID,
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (res) {
                LoadAirLineData();
            },
            error: function (err) {
                alert(err.responseText);
            }

        });
    }
}
function GetAirLineData(ID) {
    debugger;
    $.ajax({
        url: "/AirLine/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {

            $('#AirLineID').val(res.AirLineID);
            $('#AirPortID').val(res.AirPortID);
            $('#AirLineName').val(res.AirLineName);
            $('#BusinessSeat').val(res.BusinessSeat);
            $('#EconomicSeat').val(res.EconomicSeat);
            $('#SStatus').val(res.Status);
            $('#myCModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}