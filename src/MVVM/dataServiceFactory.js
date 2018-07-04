var DataServiceFactory = function(){   
    //factory in case we want to change data sources in future

    //I would not normally do this much extra for 'possible' future features
    //because YAGNI
    //all time spent on uneccesary dev is cashflow spent
    //and cashflow is the life blood of any business

    var buildService = function(sourceType){
        if(sourceType === 'textFile'){
            var service = new FileDataService();      
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