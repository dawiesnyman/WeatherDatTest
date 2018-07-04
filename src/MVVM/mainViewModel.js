var mainViewModel = function(dataService, parser){
    this.dataService = dataService;
    this.parser = parser;

    this.allDays = [];
    this.minMnT = null;
    this.maxMxT = null;

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
        writeOutPut();
    };

    var handleDragOver = function(event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };

    function calculateValues(data){
        //get min Mnt
        this.minMnT = data.reduce(function (smallest, day) {
            return (day.MnT || 0) > (smallest.MnT) ? smallest : day;
            }, {});
    
        //get max MxT
        this.maxMxT = data.reduce(function (smallest, day) {
            return (smallest.MxT || 0) > (day.MxT) ? smallest : day;
        }, {});
    }

    writeOutPut = function(){
        console.log(minMnT);
        console.log(maxMxT);
    
        document.getElementById('lblMnTDay').innerHTML = this.minMnT.Dy;
        document.getElementById('lblMnT').innerHTML = this.minMnT.MnT;
        document.getElementById('lblMxTDay').innerHTML = this.maxMxT.Dy;
        document.getElementById('lblMxT').innerHTML = this.maxMxT.MxT;
    }
    //var show

    return {
        OnChange: onChange,
        HandleDragOver: handleDragOver
    }
}