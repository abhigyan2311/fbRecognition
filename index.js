var PythonShell = require('python-shell');
var pyshell = new PythonShell('./recognize.py');

var path = '1';
var payload = "nil";
// sends a message to the Python script via stdin
pyshell.send(path);

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  message = message.replace(/\'/g,'\"');
  message = message.replace('name": u','name": ');
  payload = JSON.parse(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
  if (err) throw err;
  console.log('finished');
  console.log(payload[0].name);
});
