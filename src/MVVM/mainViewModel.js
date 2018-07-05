var mainViewModel = function(dataService, parser, writeOutput){
    this.dataService = dataService;
    this.parser = parser;
    this.writeOutput = writeOutput;

    var onChange = async (event) =>{
        event.stopPropagation();
        event.preventDefault();
 
        //was this triggered by button or drag drop?		
        if(event.type == "change")		{
            this.dataService.setSource(event.target.files[0]);
        }else{
            this.dataService.setSource(event.dataTransfer.files[0]);
        }
        //load data
        let fileContents = await this.dataService.readData();
        
        //set data to parse
        this.parser.setSource(fileContents);
        //parse
        this.allDays = parser.parse();

        calculateValues(this.allDays);
    };

    var handleDragOver = function(event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };

    function calculateValues(data){
        //get min Mnt
        let minMnT = data.reduce(function (smallest, day) {
            return (day.MxT - day.MnT || 0) > (smallest.MxT - smallest.MnT) ? smallest : day;
            }, {});
            
        //get max MxT
        let maxMxT = data.reduce(function (smallest, day) {
            return (smallest.MxT - smallest.MnT ) > (day.MxT - day.MnT) ? smallest : day;
        }, {});

        writeOutput(minMnT, maxMxT);
    }

    return {
        OnChange: onChange,
        HandleDragOver: handleDragOver
    }
}