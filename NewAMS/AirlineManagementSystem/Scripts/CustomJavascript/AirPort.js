

$(document).ready(function () {
    debugger;

    LoadAirPortData();
    LoadCountries();
    LoadCity();
})
function LoadAirPortData() {
    
    $.ajax({
        url: "/AirPort/GetData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            $.each(res, function (key, item) {

                html += '<tr>';
                html += '<td>' + item.CountryID + '</td>';
                html += '<td>' + item.CityID + '</td>';
                html += '<td>' + item.AirPortName + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetAirPortData(' + item.AirPortID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a class="btn btn-danger" href="#" onclick="AirPortDelete(' + item.AirPortID + ')"><i class="fa fa-trash"></i><span><strong> Delete</strong></span></a></td>';
                html += '</tr>';
            });
            $('.tAirPortbody').html(html);
        }
    });
}
function LoadCountries() {
    
    $.ajax({
        url: "/Country/GetData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {

            var select = '';
            select += '<select id="ddl_Country" onchange="LoadCity()" class="form-control" >';
         select+='<option value="-1">'+"--- Select Country ---"+'</option>'   
            $.each(res, function (key, item) {
                select += '<option  value="' + item.CountryID + '">' + item.CountryName + '</option>';
            });
            select += '</select>';
            $('.Countries').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}

function LoadCity() {
     ID = document.getElementById("ddl_Country").value;
    debugger;
    $.ajax({
        url: "/City/GetCities/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            //document.getElementById("ddl_Cities").innerHTML = "";
            debugger;
            var select = '';
            select += '<select  class="form-control" id="ddl_Cities" >';
          
            $.each(res, function (key, item) {
                select += '<option value="' + item.CityID + '">';
                select += item.CityName;
                select+= '</option>';
            });
            select += '</select>';

            $('#Cities').html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });

}



function AirPortAddOrUpdate() {
    var AirPortObj = {
        AirPortID: $('#AirPortID').val(),
        CountryID: $('#ddl_Country option:selected').val(),
        CityID: $('#ddl_Cities option:selected').val(),
        AirPortName: $('#AirPortName').val()
    };
    $.ajax({
        url: "/AirPort/AirPort/",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        data: JSON.stringify(AirPortObj),
        success: function (res) {
            if (AirPortID > 0) {
                $("#myCModal").modal('hide');
            }
            ClearAirPortTextBoxes();
            LoadAirPortData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}
function ClearAirPortTextBoxes() {
    $('#AirPortID').val("");
    $('#ddl_Country').val(-1);
    $('#ddl_Cities').val(-1);
    $('#AirPortName').val("");

}
function AirPortDelete(ID) {
    var ans = confirm("Do you really want to delete this item??");
    if (ans) {
        $.ajax({
            url: "/AirPort/Delete/" + ID,
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (res) {
                LoadAirPortData();
            },
            error: function (err) {
                alert(err.responseText);
            }

        })
    }
}
function GetAirPortData(ID) {
    debugger;
    $.ajax({
        url: "/AirPort/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            debugger;
            $('#AirPortID').val(res.AirPortID);
            $('#ddl_Country').val(res.CountryID);
            $('#AirPortName').val(res.AirPortName);
            LoadCity();
            $('#ddl_Cities').val(res.CityID);
            $('#myCModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}