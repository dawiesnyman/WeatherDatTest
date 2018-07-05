var Main = function(dataService, parser){
	//did this as a module mainly to 
	//show the use of this pattern
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
			
			//debugging
			//for (var i = 0; i < days.length; i++) {	console.log(days[i]); }

			/*----------------------------------------------------------------------------*\
			actually thinking this next section and the writeBack should be grouped together 
			because if those requirements change these two functions would change together
			\*----------------------------------------------------------------------------*/
			//get min Mnt
			let minMnT = days.reduce(function (smallest, day) {
				return (day.MxT - day.MnT || 0) > (smallest.MxT - smallest.MnT) ? smallest : day;
				}, {});
		
			//get max MxT
			let maxMxT = days.reduce(function (smallest, day) {
				return (smallest.MxT - smallest.MnT ) > (day.MxT - day.MnT) ? smallest : day;
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