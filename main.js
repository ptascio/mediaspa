
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
	var roomQty = document.getElementById("roomQty");
	roomQty.value = "";
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


function getDates(){
	var todaysDate = new Date();
	var month = todaysDate.getMonth();
	var today = todaysDate.getDate();
	var year = todaysDate.getFullYear();
	month+=1;
	console.log(today);
	if (today < 10){
		today = parseDate(today);
	}
	if (month < 10){
		month = parseDate(month);
	}
	return [`${year}-${month}-${today}`, `${year}-${month}-${today+1}`]
}

function parseDate(d){
	d = d.toString();
	d = "0" + d;
	return d;
}


// getMonth(), getDay(), getFullYear()


function setTodaysDate(){
	var today = document.getElementById("today");
	var tomo = document.getElementById("tomorrow");
	var dates = getDates();
	today.setAttribute("min", dates[0]);
	tomo.setAttribute("min", dates[1]);
	today.value = dates[0];
	tomo.value = dates[1];
}

setTodaysDate();
