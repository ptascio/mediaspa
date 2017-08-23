
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
	}else if(numReg.test(rqty.value)) {
		for (var j = 0, length = monthlys.length; j < length; j++) {
			monthlys[j].disabled = false;
		}
	}
}

function getRooms(){
	roomQty = document.getElementById("roomQty");
	disableRadios(roomQty);
	rooms = roomQty.value;
	if (numReg.test(rooms)){
		isMonthly();
	}else {
		totalCost.innerHTML = "Please the Amount of Rooms you'd like to rent";
	}
}

function clearForm(){
	roomQty = document.getElementById("roomQty");
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
		document.getElementById("actualCost").setAttribute("style", "display: none;");
		calendar.setAttribute("style", "display: none;");
		dailyCost(rooms);

	}
}


function monthlyCost(r, days){
	rooms = parseInt(r);
	var costPerNight = ((150 * rooms)/12);
	var costOfAllNights;
	totalCost.innerHTML = costPerNight;
	if (days){
		costOfAllNights = parseFloat(costPerNight) * days;
		revealTotalCosts(costOfAllNights);
	}
}

function revealTotalCosts(total){
	var ttl = document.getElementById("totalStayCost");
	ttl.innerText = total;
	document.getElementById("actualCost").setAttribute("style", "display: block;");
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
}

function calculateMonthlyCost(){
	var oneDay = 24*60*60*1000;
	var startDate = document.getElementById("today").value;
	var endDate = document.getElementById("tomorrow").value;
	startDate = dateToJSDate(startDate);
	endDate = dateToJSDate(endDate);
	var totalDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay)));
	roomQty = document.getElementById("roomQty");
	monthlyCost(roomQty.value, totalDays);
}

function dateToJSDate(dte){
	dte=dte.split("-");
	var newStartDate=dte[0]+"/"+dte[1]+"/"+dte[2];
	var newDte = new Date(dte);
	return newDte;
}



disableRadios(roomQty);
setTodaysDate();
