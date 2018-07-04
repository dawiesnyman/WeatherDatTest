var Parser = function(){
}

//this is just to demonstrate how to define 
//properties so they are not writeable etc
Object.defineProperty(Parser, 'setSource',{
	value: Parser.prototype.setSource,
	writable: false
});

Parser.prototype.setSource = function(data){
	this.data = data;
	this.dataLines = data.split("\n");
	this.days = [];

	//this.dataLines.shift(); 
	//this.dataLines.shift();
	//this.dataLines.pop();
}
Parser.prototype.parse = function(){
	var arrayLength = this.dataLines.length;
	
	for (var i = 0; i < arrayLength; i++) {

		var day = new Dat();
		day.Dy = parseFloat(this.dataLines[i].slice(2, 5));
		if(!isNaN(day.Dy) && (day.Dy > 0) && (day.Dy < 31)){
			day.MxT = parseFloat(this.dataLines[i].slice(5, 8));
			day.MnT = parseFloat(this.dataLines[i].slice(11, 14));
			day.Avt = parseFloat(this.dataLines[i].slice(17, 20));
			day.HDDay = parseFloat(this.dataLines[i].slice(23, 27));
			day.AvDP = parseFloat(this.dataLines[i].slice(30, 34));
			day.lHrP = parseFloat(this.dataLines[i].slice(35, 39));
			day.TPcpn = parseFloat(this.dataLines[i].slice(40, 45));
			day.WxType = this.dataLines[i].slice(46, 52);
			day.PDir = parseFloat(this.dataLines[i].slice(53, 57));
			day.AvSp = parseFloat(this.dataLines[i].slice(58, 62));
			day.Dir = parseFloat(this.dataLines[i].slice(63, 66));
			day.MxS = parseFloat(this.dataLines[i].slice(68, 70));
			day.SkyC = parseFloat(this.dataLines[i].slice(72, 76));
			day.MxR = parseFloat(this.dataLines[i].slice(76, 79));
			day.MnR = parseFloat(this.dataLines[i].slice(80, 83));
			day.AvSLP = parseFloat(this.dataLines[i].slice(83, 91));

			this.days.push(day);
		}
	}
	
	return this.days;
}  