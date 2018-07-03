var DataServiceFactory = function(){   
    //factory in case we want to change data sources in future
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