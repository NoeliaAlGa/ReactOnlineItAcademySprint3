
// Exercise 7
function validate() {
	let error = 0;
	// Get the input fields
	const fName = document.getElementById("fName");
	const fEmail = document.getElementById("fEmail");
	
	// Get the error elements
	//const errorName = document.getElementById("errorName");
	//const errorEmail = document.getElementById("errorEmail");  
	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value == ""){
		error++;
	}

	if(fEmail.value == ""){
		error++;
	}

	const msg = (error>0) ? "Error" : "OK";
	alert(msg);
}
