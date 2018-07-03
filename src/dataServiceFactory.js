var DataServiceFactory = function(){   
    //factory in case we want to change data sources in future

    //I would not normally do this much extra for possible features
    //because YAGNI
    //all time spent on uneccesary dev is cashflow spent
    //and cashflow is the lofe blood of any business
    
    var buildService = function(sourceType, event){
        if(sourceType === 'textFile'){
            var service = new FileDataService();
            event.stopPropagation();
            event.preventDefault();
            //was this triggered by button or drag drop?		
            if(event.type == "change")		{
                service.setSource(event.target.files[0]);
            }else{
                service.setSource(event.dataTransfer.files[0]);
            }
            return service;
        }
        if(sourceType === 'webService'){
            //build your web service here
            return null;
        }
    };
    
    return {
        getDataService: buildService
    }
}