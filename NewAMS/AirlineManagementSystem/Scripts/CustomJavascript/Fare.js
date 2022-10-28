$(document).ready(function () {
    LoadFareData();
    LoadRoute();
    LoadCabin();
});
function LoadFareData() {
    $.ajax({
        url: "/Fare/GetData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            $.each(res, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RouteID + '</td>';
                html += '<td>' + item.CabinID + '</td>';
                html += '<td>' + item.Fare + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="FareGetByID(' + item.FareID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a href="#" class="btn btn-danger" onclick="FareDelete(' + item.FareID + ')">  <i class="fa fa-trash"></i><span><strong> Delete</strong></span> </a></td>';
                html += '</tr>';
            });
            $('.FareInfo').html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function ClearFareData() {
    $('#FareID').val("");
    $('#ddl_Route').val(-1);
    $('#ddl_Cabin').val(-1);
    $('#Fare').val("");

}
function LoadRoute() {
    
    $.ajax({
        url: "/Fare/LoadRoute/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            debugger;
            var select = '';
            select += '<select id="ddl_Route" class="form-control input1">';
            select += '<option value="' + "-1"+ '">' + "--- Select Route ---" + '</option>';
            $.each(res, function (key, item) {
                select += '<option value="' + item.RouteID + '">' + item.RouteName + '</option>';
            });
            select += '</select>';
            $(".RouteInfo").html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadCabin() {
    debugger;
    $.ajax({
        url: "/Cabin/GetData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            html += '<select class="form-control input1" id="ddl_Cabin">';
            html += '<option value="-1">'+"--- Select Cabin ---"+'</option>';
            $.each(res, function (Key, item) {
                html += '<option value="' + item.CabinID + '">' + item.CabinName + '</option>';
            });
            html += '</select>';
            $('.CabinData').html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}
function FareAddorUpdate() {
    debugger;
    var FareObj = {
        FareID:$('#FareID').val(),
        RouteID: $('#ddl_Route option:selected').val(),
        CabinID: $('#ddl_Cabin option:selected').val(),
        Fare:$('#Fare').val(),
    }
    $.ajax({
        url: "/Fare/Fare/",
        type: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(FareObj),
        success: function (res) {
            if (FareID > 0) {
                $('#myModal').modal('hide');
            }
            LoadFareData();
            ClearFareData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function FareDelete(ID) {
    $.ajax({
        url: "/Fare/Delete/" + ID,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {

        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function FareGetByID(ID) {
    $.ajax({
        url: "/Fare/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            $('#FareID').val(res.FareID);
            $('#ddl_Route').val(res.RouteID);
            $('#ddl_Cabin').val(res.CabinID);
            $('#Fare').val(res.Fare);
            $('#myModal').modal('show');
            LoadFareData();
            

        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}