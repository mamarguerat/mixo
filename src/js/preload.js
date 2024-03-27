function enableDoubleClick(ele) {
  ele.ondblclick = function (ev) {
    current = selectTopDiv(ev.target);
    ipcRenderer.send('window', devices[Constants.id2index(current.id, devices)]);
  }
}

ipcRenderer.on('file', (event, arg) => {
  if ('save' == arg.function || 'saveas' == arg.function) {
    // Combine the arrays into an object
    let data = {
      devices: devices,
      links: links
    };
    // Convert the object to JSON
    let json = JSON.stringify(data, null, 2);
    ipcRenderer.send('file', {
      function: arg.function,
      json: json
    });
  }
  else if ('load' == arg.function) {
    devices = [];
    links = [];
    arg.devices.forEach(device => {
      devices.push(new Device(device.x, device.y, device.type, device.id, device.name));
    });
    arg.links.forEach(link => {
      links.push(new Link(link.device1, link.aes50_1, link.device2, link.aes50_2));
      check(links);
    })
    draw();
    idCnt = devices[devices.length - 1].id + 1;
  }
})