var fs = require('fs'),
		formidable = require('formidable');
/*
 * GET home page. (Form to upload a file)
 */

exports.index = function(req, res){
	console.log("Request handler 'index' was called.");

  res.render('index', { title: 'Express' });
};

/*
 * Handling of file upload.
 */
exports.upload = function(req, res) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log('About to parse');

	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send(500, { error : 'oops, something went wrong in parsing...' });
		}
		fs.rename(files.upload.path, "uploads/" + files.upload.name, function(err){
			if(err) {
				res.send(500, { error : 'oops, something went wrong in renaming...' });
			}
		});
		res.render('upload', { path: files.upload.name });
	});
};