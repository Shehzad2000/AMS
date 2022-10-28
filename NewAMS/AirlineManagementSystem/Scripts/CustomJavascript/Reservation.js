$(document).ready(function () {

    LoadFromRouteDt();
    LoadCabinDt();
    LoadToRouteDt();
    debugger;
    LoadSchedule();

});
function LoadFromRouteDt() {

    $.ajax({
        url: "/Reservation/LoadRouteDt1/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_FromRoute" onchange="LoadToRouteDt();" class="form-control input1">';
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
function LoadToRouteDt() {

    var ID = document.getElementById("ddl_FromRoute").value;

    $.ajax({
        url: "/Reservation/LoadRouteDt/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var select = '';
            select += '<select id="ddl_ToRoute" class="form-control input1">';
            select += '<option value="' + "-1" + '">' + "--- Select Route" + '</option>';
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
function LoadCabinDt() {

    $.ajax({
        url: "/Reservation/LoadCabin/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var html = "";
            html += '<select class="form-control input1" id="ddl_Cabin">';
            html += '<option value="' + "-1" + '">' + "--- Select Cabin ---" + '</option>';
            $.each(res, function (key, item) {
                html += '<option value="' + item.CabinID + '">' + item.CabinName + '</option>';
            });
            html += '</select>';
            $('.CabinData').html(html);
        },
        error: function (err) {
            alert(err.responseText);
        }
    });
}
function LoadFare() {
    var ID = document.getElementById('ddl_Cabin').value;
    $.ajax({
        url: "/Reservation/LoadFare/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        success: function (res) {
            var html = '';
            html += '<select id="ddl_Fare" class="form-control input1">';
            html += '<option value="' + "-1" + '">' + "--- Select Fare ---" + "</option>";
            $.each(res, function (Key, item) {
                html += '<option value="' + item.FareID + '">' + item.Fare + "</option>";
            })
            html += '</select>';
        }
    })
}
function LoadSchedule(Adults) {
    
    var ID = document.getElementById("ddl_ToRoute").value;
    $.ajax({
        url: "/Reservation/LoadShedule/" + ID,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            
            var html = '';

            html += '<div class="table-responsive">';
            html += '<table class="table table-striped table-bordered table-hover dataTables-example">';
            html += '<thead>';
            html += '<tr>';
            html += '<th>Route</th>';
            html += '<th>AirLine</th>';
            html += '<th>Departure</th>';
            html += '<th>Arrival</th>';
            html += '<th>Date</th>';
            html += '<th>Status</th>';
            html += '<th>Action</th>';
            html += '</tr>';
            html += '</thead>'
            html += '<tbody>';
            $.each(res, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.RouteID + '</td>';
                html += '<td>' + item.AirLineID + '</td>';
                html += '<td>' + item.DepartureTime + '</td>';
                html += '<td>' + item.ArrivalTime + '</td>';
                html += '<td>' + item.Date + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '<td><a href="#" class="btn btn-primary" onclick="ReservationForm(' + item.ScheduleID + ')"><i class="fa fa-edit"></i><span><strong> Select Flight</strong></span></a>';
                html += '</tr>';
            });
            $('.tScheduleData').html(html);
            html += '</tbody>';
            html += '<tfoot>';
            html += '<tr>';
            html += '<th>Route</th>';
            html += '<th>AirLine</th>';
            html += '<th>Departure</th>';
            html += '<th>Arrival</th>';
            html += '<th>Date</th>';
            html += '<th>Status</th>';
            html += '<th>Action</th>';
            html += '</tr>';
            html += '</tfoot>';
            html += '</table>';
        },
        error: function (err) {
            alert(err.responseText);
        }
    });

}

//$(document).on('submit', 'form', function (event) {
//    debugger;
//    var $form = $(this);
//    var aValue = $form.find('#txtFirstName').val();
//    alert(aValue);

//});


function AddReservation() {

    var ID = document.getElementById('Adults').value;
    var SheduleID = document.getElementById('Schedule').value;

    debugger;
    for (var i = 0; i < ID; i++) {
        var ResObj;
        var firstName = '#FirstName' + i;
        var lastName = '#LastName' + i;
        var email = '#Email' + i;
        var nationality = '#Nationality' + i;
        var cnic = '#CNIC' + i;
        var contact = '#ContactInfo' + i;
        var passport = '#Passport' + i;
        var dob = '#DOB' + i;
        var fname, lname, emaill, nationalityy, cnicc, contactt, passportt,dobb;
        $(firstName).each(function () {
            fname = $(this).val();
        })
        $(lastName).each(function () {
            lname = $(this).val();
        })
        $(email).each(function () {
            emaill = $(this).val();
        })
        $(nationality).each(function () {
            nationalityy = $(this).val();
        })
        $(cnic).each(function () {
            cnicc = $(this).val();
        })
        $(contact).each(function () {
            contactt = $(this).val();
        })
        $(passport).each(function () {
            passportt = $(this).val();
        })
        $(dob).each(function () {
            dobb = $(this).val();
        })
        //alert(fname + ' ' + lname + ' ' + emaill + ' ' + nationalityy + ' ' + cnicc + ' ' + passportt + ' ' +dobb);
        ResObj = {
            Name: fname + ' ' + lname,
            Email: emaill,
            CabinID: $('#ddl_Cabin option:selected').val(),
            Nationality: nationalityy,
            CNIC: cnicc,
            SheduleID: SheduleID,
            ContactNo: contactt,
            PassportNo: passportt,
            DOB: dobb
        };
        $.ajax({
            url: "/Reservation/Reservation/",
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(ResObj),
            success: function (res) {
                alert('Data Saved no '+i);
            },
            error: function (err) {
                alert(err.responseText);
            }
        });
      };
        

      //var ResObj = {
        //    Name: $('#FirstName').val() + " " + $('#LastName').val(),
        //    Email: $('#Email').val(),
        //    CabinID: $('#ddl_Cabin option:selected').val(),
        //    Nationality: $('#Nationality option:selected').val(),
        //    CNIC: $('#CNIC').val(),
        //    SheduleID: SheduleID,
        //    ContactNo: $('#ContactInfo').val(),
        //    PassportNo: $('#Passport').val(),
        //    DOB: $('#DOB').val()
        //
    //}
    
}
function ReservationForm(SID) {
    var ID = document.getElementById('Adults').value;
        var html = '';
    html += '<h1>ReservationDetails</h1><br>';
    html += '<div id="ReservationForm">';
    html += '<input type="hidden" id="Schedule" />';
    for (var i = 0; i < ID; i++) {
        html += '<hr />';
        html += '<form method="post" name="form' + i +'" id="form'+i+'">';
        html += '<div class="row"><div class="col-md-3"><label>FirstName:</label><br /><input id="FirstName'+i+'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>LastName:</label><br /><input id="LastName' + i +'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>Email:</label><br /><input id="Email' + i +'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>Nationality:</label><br />';
        html += '<select id="Nationality' + i +'" class="form-control input1">';
        html += '<option value="' + "1" + '" > "'+"Pakistani"+'"</option>';
        html += '<option value="' + "2" + '" > "' + "Indian" +'"</option></select></div></div> ';
        html += '<div class="row"><div class="col-md-3"><label>CNIC:</label><br /><input id="CNIC' + i +'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>Contact:</label><br /><input id="ContactInfo' + i +'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>Passport:</label><br /><input id="Passport' + i +'" class="form-control input1" /></div>';
        html += '<div class="col-md-3"><label>DOB:</label><br /><input id="DOB' + i +'" type="Date" class="form-control input1" /></div></div>';
        
        html += '</form>';
    }
    html += '<div class="row mb-5" >';
    html += '<div class="col-md-12">';
    html += '<button class="btn btn-primary btn-block" onclick="AddReservation();"><i class="fa fa-plane"><strong> Save Details</strong></i></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $('.ReservForm').html(html);

    $('#Schedule').val(SID);
}




