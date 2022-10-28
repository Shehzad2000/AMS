$(document).ready(function () {
    LoadData();
    LoadFromCountries();
    LoadToCountries();
    LoadFromCity();
    LoadToCity();
    LoadFromAirPorts();
    LoadToAirPorts();
});

function LoadFromCountries() {
    debugger;
    $.ajax({
        url: "/Route/LoadCountry/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {

            var select = '';
            select += '<select id="ddl_FromCountry" onchange="LoadFromCity()" class="form-control input1" >';
            select += '<option>' + "--- Select Country ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option  value="' + item.CountryID + '">' + item.CountryName + '</option>';
            });
            select += '</select>';
            $('#FromCountries').html(select);
            
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadToCountries() {
    debugger;
    $.ajax({
        url: "/Route/LoadCountry",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {

            var select = '';
            select += '<select id="ddl_ToCountry" onchange="LoadToCity()" class="form-control input1" >';
            select += '<option>' + "--- Select Country ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option  value="' + item.CountryID + '">' + item.CountryName + '</option>';
            });
            select += '</select>';
            $('#ToCountries').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}

function LoadFromCity() {
    ID = document.getElementById("ddl_FromCountry").value;
    debugger;
    $.ajax({
        url: "/Route/LoadCity/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            //document.getElementById("ddl_Cities").innerHTML = "";
            debugger;
            var select = '';
            select += '<select onchange="LoadFromAirPorts()" class="form-control input1" id="ddl_FromCities" >';
            select += '<option>' + "--- Select City ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option value="' + item.CityID + '">';
                select += item.CityName;
                select += '</option>';
            });
            select += '</select>';

            $('.FromCities').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });

}

function LoadToCity() {
   var ID = document.getElementById("ddl_ToCountry").value;
    debugger;
    $.ajax({
        url: "/Route/LoadCity/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            //document.getElementById("ddl_Cities").innerHTML = "";
            debugger;
            var select = '';
            select += '<select onchange="LoadToAirPorts()" class="form-control input1" id="ddl_ToCities" >';
            select += '<option>' + "--- Select City ---" + '</option>'
            $.each(res, function (key, item) {
                select += '<option value="' + item.CityID + '">';
                select += item.CityName;
                select += '</option>';
            });
            select += '</select>';

            $('.ToCities').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });

}

function LoadFromAirPorts() {
    var CID = document.getElementById("ddl_FromCities").value;
    debugger;
    $.ajax({
        url: "/Route/LoadAirport/" + CID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            html += '<select id="ddl_FromAirPort" class="form-control input1">';
            html += '<option value="">' + "--- Select AirPort---" + '</option>';
            $.each(res, function (key, item) {
                html += '<option value="'+item.AirPortID+'">'+item.AirPortName+'</option>';
            });
            html += '</select>';
            $('.FromAirPorts').html(html);

        }
    })
}

function LoadToAirPorts() {
    var CID = document.getElementById("ddl_ToCities").value;
    $.ajax({
        url: "/Route/LoadAirport/" + CID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            html += '<select id="ddl_ToAirPort" class="form-control input1">';
            html += '<option value="">' + "--- Select AirPort---" + '</option>';
            $.each(res, function (key, item) {
                html += '<option value="' + item.AirPortID + '">' + item.AirPortName + '</option>';
            });
            html += '</select>';
            $('.ToAirPorts').html(html);

        }
    })
}

function LoadData() {
    $.ajax({
        url: "/Route/GetData/",
        type: "get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            $.each(res, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RouteName + '</td>';
                //html += '<td>' + item.FromCity + '</td>';
                //html += '<td>' + item.FromAirport + '</td>';
                //html += '<td>' + item.ToCountry + '</td>';
                //html += '<td>' + item.ToCity + '</td>';
                //html += '<td>' + item.ToAirPort + '</td>';
                //html += '<td>' + item.Status + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetRouteByID(' + item.RouteID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a><a class="btn btn-danger" href="#" onclick="RouteDelete(' + item.RouteID + ')"><i class="fa fa-trash"></i><span><strong> Delete</strong></span></a></td>';
                html += '</tr>';
            });
            $('.RouteInfo').html(html);
        }
    });
}
function RouteAddorUpdate() {
    var RouteObj = {
        RouteID: $('#RouteID').val(),
        FromCountryID: $('#ddl_FromCountry option:selected').val(),
        FromCity: $('#ddl_FromCities option:selected').val(),
        FromAirPort: $('#ddl_FromAirPort option:selected').val(),
        ToCountry: $('#ddl_ToCountry option:selected').val(),
        ToCity: $('#ddl_ToCities option:selected').val(),
        ToAirPort: $('#ddl_ToAirPort option:selected').val(),
        Status: $('#Status option:selected').val(),
    };
    $.ajax({
        url: "/Route/Route/",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(RouteObj),
        success: function (res) {
            if (RouteID > 0) {
                $('#myModal').modal('hide');
            }
            LoadData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function RouteDelete(ID) {
    $.ajax({
        url: "/Route/Delete/" + ID,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            debugger;
            LoadData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function GetRouteByID(ID) {
    debugger;
    $.ajax({
        url: "/Route/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            debugger;
            $('#RouteID').val(res.RouteID);
            $('#ddl_FromCountry').val(res.FromCountryID);
            $('#ddl_ToCountry').val(res.ToCountry);
            LoadFromCity();
            LoadToCity();
            $('#ddl_FromCities option:selected').val(res.FromCity);
            $('#ddl_ToCities option:selected').val(res.ToCity);
            //LoadFromAirPorts();
            //LoadToAirPorts();
            //$('#ddl_FromAirPort').val(res.FromAirPort);
            //$('#ddl_ToAirPort').val(res.ToAirPort);
            $('#Status').val(res.Status);
            $('#myModal').modal('show');

        },
        error: function (err) {
            alert(err.responseText);
        }

    })
}

