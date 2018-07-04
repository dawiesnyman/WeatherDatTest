var FileDataService = function(){
}

FileDataService.prototype.setSource = (source) => {
	this.source = source;
}

FileDataService.prototype.readData = () => {
	const fileReader = new FileReader();

	return new Promise((resolve, reject) => {
		fileReader.onerror = () => {
			fileReader.abort();
			reject(new DOMException("Problem parsing input file."));
		};

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		//setTimeout(async function() {
		//playing with timeout / async
		//was going to add a revolving spiral that
		//pulses with the users heartrate to get them into flow
		//then hypnotise them to give me the job ;)
		fileReader.readAsText(this.source);
		//	}, 3000);	
		
		});
};