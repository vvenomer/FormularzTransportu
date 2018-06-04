var nrOfLoads = 1;
var maxBoeingMass = 38;
var maxAirBusMass = 35;
var template;
window.onload = function ()
{
	if ((typeof AddClass === 'undefined') || (typeof RemoveClass === 'undefined'))
	{
		alert("Upewnij się, że załączyłeś plik calss.js");
		return;
	}
	template = document.getElementsByClassName("load")[0].cloneNode(true);

	document.getElementsByName("transport_docs")[0].addEventListener("change", CheckExtention);
	document.getElementsByName("transport_date")[0].addEventListener("change", CheckDate);
	document.getElementsByName("load_weight1")[0].addEventListener("change", CheckMass);
	document.getElementsByName("load_weight1")[0].addEventListener("input", CheckMass);
	document.getElementsByName("transport_airplane")[0].addEventListener("change", UpdateCheckMass);
	document.getElementById("add_load").addEventListener("click", AddLoad);
	document.getElementById("send").addEventListener("click", Send);
};

function CheckExtention(e)
{
	var fileList = e.target.files;
	var isOk = true;
	Array.from(fileList).forEach(file =>
		{
		switch (file.type) {
			//jpg
			case "image/jpeg":
			//png
			case "image/png":
			//doc
			case "application/msword":
			//docx
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			//pdf
			case "application/pdf":
				break;
			default:
				isOk = false;
		}
		});
	var outerDiv = document.getElementById("doc");
	var errorClass = "err";
	if (!isOk)
		AddClass(outerDiv, errorClass);
	else
		RemoveClass(outerDiv, errorClass);
}

function CheckDate(e)
{
	var date = new Date(e.target.value);
	var dayNr = date.getDay();

	var outerDiv = document.getElementById("date");
	var errorClass = "err";
	if(dayNr == 6 || dayNr == 0)
		AddClass(outerDiv, errorClass);
	else
		RemoveClass(outerDiv, errorClass);	
}

function CheckMass(e)
{
	var given_mass = e.target.value;
	var selectedAirplane = document.getElementsByName("transport_airplane")[0].value;
	var outerDiv = e.target.parentNode;
	var errorClass = "err";

	if(selectedAirplane == "airbus" && given_mass > maxAirBusMass * 1000)
	{
		outerDiv.querySelector(".err_msg").querySelector(".err_msg_txt").innerHTML = maxAirBusMass;
		AddClass(outerDiv, errorClass);
	}
	else if(selectedAirplane == "boeing" && given_mass > maxBoeingMass * 1000)
	{
		outerDiv.querySelector(".err_msg").querySelector(".err_msg_txt").innerHTML = maxBoeingMass;
		AddClass(outerDiv, errorClass);
	}
	else
		RemoveClass(outerDiv, errorClass);	

}
function UpdateCheckMass(e)
{
	class FakeEvent {
		constructor(target) {
			this.target = target;
		}
	}
	Array.from(document.getElementsByName("load_weight")).forEach(element =>
	{
		CheckMass(new FakeEvent(element));
	});
}

function AddLoad(e)
{
	nrOfLoads++;
	var copy = template.cloneNode(true);
	//display which load is it
	copy.querySelector(".load_nr").innerHTML = nrOfLoads;
	//set up name input
	var loadName = copy.querySelector('input[name="load_name1"]');
	loadName.name = "load_name" + nrOfLoads;
	//set up weight input
	var loadWeight = copy.querySelector('input[name="load_weight1"]');
	loadWeight.addEventListener("change", CheckMass);
	loadWeight.addEventListener("input", CheckMass);
	loadWeight.name = "load_weight" + nrOfLoads;
	//set up type input
	var radio1 = copy.querySelector("#normal1");
	radio1.id = "normal" + nrOfLoads;
	radio1.name = "load_type" + nrOfLoads;
	var radio2 = copy.querySelector("#danger1");
	radio2.id = "danger" + nrOfLoads;
	radio2.name = "load_type" + nrOfLoads;
	//set up labels
	Array.from(copy.getElementsByTagName('LABEL')).forEach(element => {
		if(element.htmlFor == "normal1")
			element.htmlFor = "normal" + nrOfLoads;
		if(element.htmlFor == "danger1")
			element.htmlFor = "danger" + nrOfLoads;
	});
	//add to DOM
	document.getElementById("loads").appendChild(copy);
}
function Send(e)
{
	if(document.getElementsByClassName("err").length > 0)
		e.preventDefault();	
}
