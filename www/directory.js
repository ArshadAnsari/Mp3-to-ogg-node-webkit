var fs = require("fs");
var child_process = require('child_process');
var path;
function Convert(_val)
{
	path = _val + '\\';
	readDirectory(path);	
}

function readDirectory(_path)
{
	fs.readdir(_path, function(_err, _data){
		if(_err)
			console.log(_err);		
		_data.forEach( function (file){
			fs.stat(_path + file, function (err, stats) {
			   if (err) 
				   console.error(err);
			   
			   if(stats.isFile())
			   {
					if(file.split(".").reverse()[0] == "mp3")
						convertFile(_path, file);
			   }
			   else if(stats.isDirectory())
			   {
				   readDirectory(_path + file + "\\");
			   }
			});
	   });
	});
}

function convertFile(_path, _name)
{
	var command = 'ffmpeg -i '+ _path+_name + ' -b:a 24k -ac 1 -ar 16000 ' + _path+(_name.split(".")[0]) + '.ogg';
	child_process.exec(command, function (error, stdout, stderr) {
		if (error)
			console.log("error in file conversion");
	});
}