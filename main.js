
var monthlys = document.getElementsByName("Monthly");
var totalCost = document.getElementById("totalCost");
var calendar = document.getElementById("calendar");
var roomQty = document.getElementById("roomQty");

var numReg = /^\d+$/;

var rooms = "";
var rentMonthly = "";


function disableRadios(rqty){
	if (rqty.value === ""){
		for (var i = 0, length = monthlys.length; i < length; i++) {
			monthlys[i].setAttribute("disabled", true);
		}
	}else {
		for (var j = 0, length = monthlys.length; j < length; j++) {
			monthlys[j].disabled = false;
		}
	}
	console.log(monthlys);
}

function getRooms(){
	var roomQty = document.getElementById("roomQty");
	disableRadios(roomQty);
	rooms = roomQty.value;
	if (numReg.test(rooms)){
		isMonthly();
	}else {
		totalCost.innerHTML = "Please the Amount of Rooms you'd like to rent";
		clearForm();
	}
}

function clearForm(){
	oomQty = document.getElementById("roomQty");
	roomQty.value = "";
}


function isMonthly(){
	roomQty = document.getElementById("roomQty");
	disableRadios(roomQty);
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
	if (today < 10){
		today = parseDate(today);
	}
	if (month < 10){
		month = parseDate(month);
	}
	return [`${year}-${month}-${today}`, `${year}-${month}-${today+1}`];
}

function parseDate(d){
	d = d.toString();
	d = "0" + d;
	return d;
}

function setTodaysDate(){
	var today = document.getElementById("today");
	var tomo = document.getElementById("tomorrow");
	var dates = getDates();
	today.setAttribute("min", dates[0]);
	tomo.setAttribute("min", dates[1]);
	today.value = dates[0];
	tomo.value = dates[1];
	calculateMonthlyCost(dates);
}

function calculateMonthlyCost(dates){

}
disableRadios(roomQty);
setTodaysDate();
