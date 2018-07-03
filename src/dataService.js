

var DataService = function(){
	//this.file = file;
	this.data = "";
}

DataService.prototype.readData = (inputFile) => {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onerror = () => {
			fileReader.abort();
			reject(new DOMException("Problem parsing input file."));
		};

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		//playnig with timeout / async
		//setTimeout(async function() {
			  // do something 1000ms later here.
			  fileReader.readAsText(inputFile);
		//	}, 3000);	
		
		});
};