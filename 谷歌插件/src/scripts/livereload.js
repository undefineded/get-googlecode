'use strict';

import ext from "./utils/ext";

var LIVERELOAD_HOST = 'localhost:';
var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error) {
  console.log('reload connection got error:', error);
};

connection.onmessage = function (e) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === 'reload') {
      ext.runtime.reload();
    }
  }
};
// C:\Users\Administrator\AppData\Local\Programs\Python\Python38-32\Scripts\;C:\Users\Administrator\AppData\Local\Programs\Python\Python38-32\;C:\Program Files\EsafeNet\Cobra DocGuard Client;C:\Program Files\JetBrains\CLion 2019.1.2\bin;C:\Program Files\Bandizip\;C:\Users\Administrator\AppData\Roaming\npm;C:\Users\Administrator\AppData\Local\BypassRuntm;C:\Users\Administrator\go\bin;c:\Go\bin;C:\Program Files\Git;C:\Users\Administrator\AppData\Local\GitHubDesktop\bin;C:\Python27;%PyCharm Community Edition%
