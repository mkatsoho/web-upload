#! /usr/bin/env node

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var process = require('process');
var fs = require('fs');


var port = parseInt(process.argv[2] || 2222)
var folder = process.argv[3] || '/tmp'
console.log('url: http://localhost:' + port);
console.log('files in:', folder)

function renderHtml(uploadStatus, uploadStatusDetails) {
  var html =
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    // '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>' +
    '<p3> <b>last upload info: </b></p3>' +
    '<pre>' +
    JSON.stringify(uploadStatus, null, 2) +
    '</pre>' +
    '<p3><b> last upload details: </b></p3>' +
    '<pre>' +
    JSON.stringify(uploadStatusDetails, null, 2) +
    '</pre>'
  return html
}

function saveFilesToTargetFolder(files, targetFolder) {
  var rtn = []
  for (var f of files) {
    var newFile = `${targetFolder}/${f.originalFilename}`
    console.log('copy file - ', newFile, f.originalFilename, f.size, f.path)
    fs.copyFileSync(f.path, newFile)
    rtn.push({ newFile, size: f.size })
  }
  return rtn
}

http.createServer(function (req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
      // res.writeHead(200, { 'content-type': 'text/plain' });
      // res.write('received upload:\n\n');
      // res.end(util.inspect({ fields: fields, files: files }));
      // res.end(JSON.stringify({ fields: fields, files: files }, null, 2));

      var savedFilesInfo = saveFilesToTargetFolder(files.upload, folder)

      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(renderHtml(savedFilesInfo, files.upload));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(renderHtml(undefined, undefined));
}).listen(port);