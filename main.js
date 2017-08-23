
var monthlys = document.getElementsByName("Monthly");
var totalCost = document.getElementById("totalCost");
var calendar = document.getElementById("calendar");
var roomQty = document.getElementById("roomQty");
var numReg = /^\d+$/;
var rooms = "";
var rentMonthly = "";

//if user has not entered room quantity, do not give option to choose monthly
//or daily options
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

function disableButton(rqty){
	if (rqty.value === ""){
		document.getElementById("totalDaysCost").disabled = true;
	}else if (numReg.test(rqty.value)){
		document.getElementById("totalDaysCost").disabled = false;
	}
}

//grabs the number user enters in the room input
//checks it against a regex that only digits have been entered
//protects against all chars that are not digits
function getRooms(){
	roomQty = document.getElementById("roomQty");
	disableRadios(roomQty);
	disableButton(roomQty);
	rooms = roomQty.value;
	if (numReg.test(rooms)){
		isMonthly();
	}else {
		document.getElementById("actualCost").setAttribute("style", "display: none;");
		totalCost.innerHTML = "Please the Amount of Rooms you'd like to rent";
	}
}

//clears the form, I don't think I call this
function clearForm(){
	roomQty = document.getElementById("roomQty");
	roomQty.value = "";
}

//checks the radio buttons for daily or monthly option
//pay by month is the default payment option
function isMonthly(){
	roomQty = document.getElementById("roomQty");
	disableRadios(roomQty);
	disableButton(roomQty);
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

//calculates cost per night if monthly
//or, if user has chosen certain dates, calculates the total cost of stay for those dates
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

//calculates daily cost per nights
function dailyCost(r){
	rooms = parseInt(r);
	totalCost.innerHTML = 150 * rooms;
}

//prepopulates calendar inputs so that user cannot choose date that has past
//and that startDate and endDate are one day apart
function getDates(dte){
	var todaysDate;
	if (dte){
		todaysDate = dte;
	}else {
		todaysDate = new Date();
	}

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
//strings the date
function parseDate(d){
	d = d.toString();
	d = "0" + d;
	return d;
}
//sets the value of the date inputs
function setTodaysDate(){
	var today = document.getElementById("today");
	var tomo = document.getElementById("tomorrow");
	var dates = getDates();
	today.setAttribute("min", dates[0]);
	tomo.setAttribute("min", dates[1]);
	today.value = dates[0];
	tomo.value = dates[1];
}

//calculates the number of days between startDate and endDate
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
//helper function for calculateMonthlyCost function
function dateToJSDate(dte){
	dte=dte.split("-");
	var newStartDate=dte[0]+"/"+dte[1]+"/"+dte[2];
	var newDte = new Date(dte);
	return newDte;
}

function increaseEndDate(){
	var today = document.getElementById("today");
	var tomo = document.getElementById("tomorrow");
	today = dateToJSDate(today.value);
	var dates = getDates(today);
	today.value = dates[0];
	tomo.value = dates[1];
}


disableButton(roomQty);
disableRadios(roomQty);
setTodaysDate();
