#!/usr/bin/env node
const http = require('http');
const cp = require('child_process');
const os = require('os');

const options = {
  hostname: 'store05',
  port: 3000,
};

function report() {
  const data = JSON.parse(cp.execSync('mpstat -o JSON -u').toString());
  const cpuLoad = data.sysstat.hosts[0].statistics[0]['cpu-load'][0];
  const {
    cpu,
    usr,
    nice,
    sys,
    iowait,
    irq,
    soft,
    steal,
    guest,
    gnice,
    idle
  } = cpuLoad;

  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error('Error talking to the server', error);
  });

  req.write({
    name: 'cpu-load',
    hostname: os.hostname,
    data: {
      cpu,
      gnice,
      guest,
      idle,
      iowait,
      irq,
      nice,
      soft,
      steal,
      sys,
      usr,
    },
  });

  req.end();
}

setInterval(report, 30*1000);
