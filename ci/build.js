const { exec, spawn } = require('child_process');
if (process.platform === 'win32') {
  const cmd = spawn('cmd.exe', ['/c', 'call ci/build-windows.cmd']);
  cmd.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  cmd.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  cmd.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
} else {
  exec(
    'sh ci/build-unix.sh',
    (error, stdout, stderr) => {
      if (error !== null) {
        console.log('exec error:' + error);
      } else {
        console.log('exec success');
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
    });
}
