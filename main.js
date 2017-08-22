
var monthlys = document.getElementsByName("Monthly");
var totalCost = document.getElementById("totalCost");
var calendar = document.getElementById("calendar");
var numReg = /^\d+$/;

var rooms = "";
var rentMonthly = "";


function getRooms(){
	var roomQty = document.getElementById("roomQty");
	rooms = roomQty.value;
	if (numReg.test(rooms)){
		isMonthly();
	}else {
		totalCost.innerHTML = "Please the Amount of Rooms you'd like to rent";
		clearForm();
	}
}

function clearForm(){
	roomQty.value = ""
}


function isMonthly(){
	for (var i = 0, length = monthlys.length; i < length; i++) {
    	if (monthlys[i].checked) {
        	rentMonthly = monthlys[i].value;
    	}
	}
	
	if (rentMonthly){
		calendar.setAttribute("style", "display: block;");
		monthlyCost(rooms);
	}else {
		calendar.setAttribute("style", "display: none;");
		dailyCost(rooms);
		
	}
}


function monthlyCost(r){	
	rooms = parseInt(r);
	totalCost.innerHTML = ((150 * rooms)/12);
}

function dailyCost(r){
	rooms = parseInt(r);
	totalCost.innerHTML = 150 * rooms;
}






