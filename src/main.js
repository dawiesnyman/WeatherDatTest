var Main = function(dataService, parser){
    //did this as a mudule just to display the pattern
	var dataService = dataService;
	var parser = parser;
	var readAndCompute  = async (writeBack) => {		
		try {
            //load data
			let fileContents = await dataService.readData();
			
			//set data to parse
            parser.setSource(fileContents);
            //parse
			let days = parser.parse();
			
			//for (var i = 0; i < days.length; i++) {	console.log(days[i]); }

			//get min Mnt
			let minMnT = days.reduce(function (smallest, day) {
				return (day.MnT || 0) > (smallest.MnT) ? smallest : day;
				}, {});
		
			//get max MxT
			let maxMxT = days.reduce(function (smallest, day) {
				return (smallest.MxT || 0) > (day.MxT) ? smallest : day;
			}, {});

			writeBack(minMnT, maxMxT);
		} catch (e) {
			console.warn(e.message)
		}
	};

	return {
		triggerDataRead: readAndCompute	
	}	
}