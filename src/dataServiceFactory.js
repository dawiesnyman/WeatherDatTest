var DataServiceFactory = function(){   
    var buildService = function(sourceType){
        if(sourceType === 'textFile'){
            var service = new FileDataService();
            service.setupService = async (event) =>{
                event.stopPropagation();
                event.preventDefault();
        
                //is it from the button or drag drop?		
                if(event.type == "change")		{
                    service.setSource(event.target.files[0]);
                }else{
                    service.setSource(event.dataTransfer.files[0]);
                }
            };
            return service;
        }
        if(sourceType === 'webService'){
            //build you web service here
            return null;
        }
    };
    
    return {
        getDataService: buildService
    }
}