

$(document).ready(function () {

    LoadCityData();
    LoadCountries();

});
function LoadCityData() {
   
    $.ajax({
        url: "/City/GetData/",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",

        success: function (res) {
           
            var html = '';
            $.each(res, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CountryID + '</td>';
                html += '<td>' + item.CityName + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetByID(' + item.CityID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a href="#" class="btn btn-danger" onclick="Delete(' + item.CityID + ')">  <i class="fa fa-trash"></i><span><strong> Delete</strong></span> </a></td>';
                html += '</tr>'

            });
            $(".tbody").html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }

    });
}
function LoadCountries() {
    debugger;
    $.ajax({
        url: "/Country/GetData/",
        type:"Get",
        contentType: "application/json;charset=utf-8",
        dataType:"JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_Country" class="form-control">';
            $.each(res, function (key, item) {
                select += '<option value="' + item.CountryID + '">' + item.CountryName + '</option>';
            });
            select += '</select>';
            $(".Countries").html(select);
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}
function ClearTextBoxes() {
    $('#ddl_Country').val(-1);
    $('#CityID').val("");
    $('#CityName').val("");
}
function CityAdd() {
    var CityObj = {
        CountryID: $('#ddl_Country option:selected').val(),
        CityID: $('#CityID').val(),
        CityName: $('#CityName').val(),
       
    };
    $.ajax({
        url: "/City/City",
        type: "Post",
        data: JSON.stringify(CityObj),
        contentType: "application/json;charset:utf-8",
        dataType: "Json",
        success: function (res) {
            if (res.CityID > 0)
                $('#myCModal').hide();
            LoadCityData();
            ClearTextBoxes();
        },
        error: function (err) {
            //alert(err.responseText);
        }
    });

}

function GetByID(ID) {
    debugger;
    $.ajax({
        url: "/City/GetData/"+ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        Datatype: "Json",
        success: function (res) {
            $('#CityID').val(res.CityID);
            $('#CityName').val(res.CityName);
            $('#ddl_Country').val(res.CountryID);
            $('#myCModal').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (err) {
            alert(err.responseText);
        }

    });
}

//function Update() {
//    var CityObj = {

//        CityID: $('#CityID').val(),
//        CityName: $('#CityName').val(),
//        CountryID: $('#CountryID').val()
//    };
//    $.ajax({
//        url: "/City/City/",
//        data: JSON.stringify(CityObj),
//        type: "Post",
//        contentType: "application/json;charset=utf-8",
//        dataType: "JSON",
//        success: function (res) {
//            LoadCityData();
//            ClearTextBoxes();
//            $('#myModal').hide();
//        },
//        error: function (err) {
//            alert(err.responseText);
//        }
//    });
//}
function Delete(ID) {
    if (confirm("Do you want to delete this item?")) {
        $.ajax({
            url: "/City/Delete/"+ID,
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "Json",
            success: function (res) {
                LoadCityData();
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
    }
    
}