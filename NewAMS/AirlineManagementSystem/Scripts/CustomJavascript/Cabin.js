$(document).ready(function () {
    LoadCabinData();
    ClearCabinTextBoxes();
});
function LoadCabinData() {
    debugger;
    $.ajax({

        url: "/Cabin/GetData/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            var html = '';
            $.each(res, function (key, item) {

                html += '<tr>';
                html += '<td>' + item.CabinName + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="GetCabinData(' + item.CabinID + ')"><i class="fa fa-edit"></i><span><strong> Edit</strong></span></a>&nbsp;<a href="#" class="btn btn-danger" onclick="CabinDelete(' + item.CabinID + ')">  <i class="fa fa-trash"></i><span><strong> Delete</strong></span> </a></td>';
                html += '</tr>';
            });
            $('.tCabinbody').html(html);
        }
    })
}
function ClearCabinTextBoxes() {
    $('#CabinID').val("");
    $('#CabinName').val("");
   
}
function CabinAddOrUpdate() {
    
    var CabinObj = {
        CabinID:$('#CabinID').val(),
        CabinName:$('#CabinName').val()
    };
    $.ajax({
        url: "/Cabin/Cabin/",
        type:"Post",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        data: JSON.stringify(CabinObj),
        success: function (res) {
            if (res.CabinID > 0) {
                $("#myCModal").modal('hide');
            }
            ClearCabinTextBoxes();
            LoadCabinData();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}
function CabinDelete(ID) {
    var ans = confirm("Do you really want to delete this item??");
    if (ans) {
        $.ajax({
            url: "/Cabin/Delete/" + ID,
            type:"post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (res) {
                LoadCabinData();
            },
            error: function (err) {
                alert(err.responseText);
            }

        })
    }
}
function GetCabinData(ID) {
    debugger;
    $.ajax({
        url: "/Cabin/GetData/"+ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            $('#CabinID').val(res.CabinID);
            $('#CabinName').val(res.CabinName);
            $('#myCModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (err) {
            alert(err.responseText);
        }
    })
}