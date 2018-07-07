#! /usr/bin/env node

// ## libs
var multiparty = require('multiparty');
var util = require('util');
var http = require('http');
// var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

// ## vars
var port=2222;
console.log('url: http://localhost:'+port);
console.log('file in folder:', '/tmp', '\n\n');


// ## start server
http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {

    // ### POST /upload, upload and save a file in /tmp
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

      // show all files' details
      for(f in files){
	      //console.log(f);
      	console.log(util.inspect(files[f]));
      }


      // only handle first file
      var afile = files[f][0];
      var destFile = path.join(path.dirname(afile.path),afile.originalFilename);
      console.log('saved as', destFile, '\n\n'); // console.log(afile.path, afile.originalFilename, destFile);
      fs.renameSync(afile.path, destFile);

      // show result web page
      res.writeHead(200, {'content-type': 'text/html'});
      res.write('<br/> <b>'+destFile+'</b> upload done! <br/><pre>');
      res.write(util.inspect(afile));
      res.end("</pre><br/><br/><a href='/upload'>upload again<a>"); // res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // ### GET /upload, show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<br/>' + 
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<!-- input type="text" name="title"><br -->'+
    'File: <input type="file" name="uploadFile" multiple="multiple"><br>'+
    '<br/>' + 
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(port);

