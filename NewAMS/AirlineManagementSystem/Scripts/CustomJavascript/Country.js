$(document).ready(function () {
    LoadCountryData();
    ClearTextBoxes();
    
});
//function Countryvalidate() {
//    jQuery.validator.addMethod("lettersonlys", function (value, element) {
//        return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
//    }, "Letters only please");

//    $('#CountryForm').validate({
//        rules: {
//            Co_Name: {
//                require: true,
//                lettersonlys:true
//            }
//        }
//    });
//}
function LoadCountryData() {
    $.ajax({
        url: "/Country/GetData/",
        Type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",

        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CountryName + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="CountryGetByID(' + item.CountryID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;&nbsp;<a class="btn btn-danger" href="#" onclick="CountryDelete(' + item.CountryID + ')"><i class="fa fa-trash"></i><span><strong> Delete</strong></span></a></td>';
                html += '</tr>';
            });
            $('.tCountrybody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function PressEnter() {
    $(document).keypress(function (key) {
        if (key >= 65 && key<=91 || key>=97 && key<=123) {

        }
    })
}
function CountryAdd() {
    debugger;
    if (CountryValidate()) {
        var CountryObj = {
            CountryID: $('#CountryID').val(),
            CountryName: $('#CountryName').val()
        };
        $.ajax({
            url: "/Country/Country/",
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(CountryObj),
            success: function (result) {
                LoadCountryData();
                ClearTextBoxes();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    else {
        alert('please fill out textboxes.');
    }
}



function CountryUpdate() {

    var CountryObj = {
        CountryID: $('#CountryID').val(),
        CountryName: $('#CountryName').val(),
    };
    $.ajax({
        url: "/Country/Country/",
        type: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "Json",
        data: JSON.stringify(CountryObj),
        success: function (result) {
            $('#myModal').modal('hide');
            LoadCountryData();
            ClearTextBoxes();
        }
    })
}
function CountryGetByID(ID) {
    debugger;
    $.ajax({
        url: "/Country/GetData/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",

        success: function (result) {
            $('#CountryID').val(result.CountryID);
            $('#CountryName').val(result.CountryName);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();

        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function CountryDelete(ID) {
    $.ajax({
        url: "/Country/Delete/" + ID,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            LoadCountryData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function ClearTextBoxes() {
    $('#CountryID').val("");
    $('#CountryName').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}
//$('#CountryName').change(function () {

//});
function CountryValidate() {
    if ($('#CountryName').val().trim() == "") {
        return false;
    }
    else {
        return true;
    }
}