	var string = document.getElementById('customMon').value
	if(string.length == 0) {
		document.getElementById("Output").innerHTML = "Input Error - No input."
		console.log("Error! No input.")
    } else {
	var lines = string.split('\n')
  
  for (var i; i < lines.length; i++) {
     if (lines[i].indexOf('.') !== 3) {
		{
		document.getElementById("Output").innerHTML = lines[i].replace(' ', '@');
		}
	}
