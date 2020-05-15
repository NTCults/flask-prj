
const API_V1_prefix = "/api/v1/"
const HOST = "http://0.0.0.0:5000";

const processURL = HOST + API_V1_prefix + "create";
const getLenURL = HOST + API_V1_prefix + "len";

$(document).ready(function(){

    updateTotalMembers();

    $("#button1").click(function() {
        alert( "Oops! You're gay now :(" );
    });

    $("#submit_button").click(function(){
        var data = {};
        
        // $.each($('#myForm').serializeArray(), function(i, field) {
        //     data[field.name] = field.value;
        // });

        nameField = document.getElementById("name");
        data["name"] = nameField.value;
        nameField.value = "";

        ageField = document.getElementById("age");
        data["age"] = ageField.value;
        ageField.value = "";

        favcField = document.getElementById("favc");
        data["favc"] = favcField.value;
        nameField.value = "";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", processURL);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = (e) => {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    var jsonBody = JSON.parse(xhr.response);
                    setTotalClubMembers(jsonBody.len); 
                } else {
                    console.log("error ", xhr.status);
                }
            };
        };
    });

});

function setTotalClubMembers(num) {
    numStr = num.toString(10);
    elem = document.getElementById('totalMemebers');
    elem.innerHTML = numStr;
};

function updateTotalMembers() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getLenURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();

    xhr.onreadystatechange = (e) => {

        if(xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var jsonBody = JSON.parse(xhr.response);
                setTotalClubMembers(jsonBody.len); 
            } else {
                console.log("error ", xhr.status);
            }
        };
    };
};





