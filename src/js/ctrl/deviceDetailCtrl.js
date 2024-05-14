const { ipcRenderer } = require("electron");

const constants = new Const();
class DeviceDetailCtrl {

  // MARK: Constructor
  constructor() {
    ipcRenderer.on('ready', (event, arg) => {
      console.log(`[deviceDetailCtrl] window ready, load device ${arg.id}`);
      this.initialize(arg);
    });
    /* ----- DOM Event Listeners ----- */
    $('.btn-close').on('click', (e) => {
      this.closeModal();
    });
    $('.overlay').on('click', (e) => {
      this.closeModal();
    });
  }

  // MARK: Event handling
  closeModal() {
    $('.modal').addClass("hidden");
    $('.overlay').addClass("hidden");
  };

  // MARK: IPC events
  initialize(arg) {
    this.reconstructObject(arg.worker);
    this.deviceID = arg.id;
    this.drawCanvas(indexWrk.getDeviceFromId(this.deviceID));
  }

  // MARK: Functions
  reconstructObject(worker) {
    worker.devices.forEach(device => {
      indexWrk.devices.push(new Device(device._type, device._id, 0, 0));
      var devIdx = indexWrk.devices.length - 1;
      indexWrk.devices[devIdx].x = device.x;
      indexWrk.devices[devIdx].y = device.y;
      indexWrk.devices[devIdx].name = device.name;
      device.inputs.forEach(input => {
        indexWrk.devices[devIdx].inputs.push(new Connector());
        var connIdx = indexWrk.devices[devIdx].inputs.length - 1;
        indexWrk.devices[devIdx].inputs[connIdx]._name = input._name;
        indexWrk.devices[devIdx].inputs[connIdx]._color = input._color;
        indexWrk.devices[devIdx].inputs[connIdx]._colorInvert = input._colorInvert;
        indexWrk.devices[devIdx].inputs[connIdx]._icon = input._icon;
      });
      device.outputs.forEach(output => {
        indexWrk.devices[devIdx].outputs.push(new Connector());
        var connIdx = indexWrk.devices[devIdx].outputs.length - 1;
        indexWrk.devices[devIdx].outputs[connIdx]._name = output._name;
        indexWrk.devices[devIdx].outputs[connIdx]._color = output._color;
        indexWrk.devices[devIdx].outputs[connIdx]._colorInvert = output._colorInvert;
        indexWrk.devices[devIdx].outputs[connIdx]._icon = output._icon;
      });
    });
    indexWrk.links = worker.links;
    indexWrk.devTypeLUT = worker.devTypeLUT;
    indexWrk.id = worker.id;
    console.log(indexWrk);
  }

  drawCanvas(device) {
    $('#canvas').empty();
    $('#canvas').append(
      "<div id='device' class='device detail " + device.getName() +
      "' style='top: 0px; left: 0px;'>" +
      "<object id='svg' class='detail' draggable='false' data='" + path.join(constants.imagesPath, device.getType() + ".svg") +
      "' type='image/svg+xml'></div>"
    )
    
    var _this = this;
    $('#svg').on("load", function (ev) {
      var $svg = $(this).contents();

      var $inputs = $svg.find('#Inputs').children();
      var $outputs = $svg.find("#Outputs").children();
      var $allElements = $inputs.add($outputs);

      $allElements.each(function() {
        $(this).on("click", function (ev) {
          _this.openModal(device, this.id.slice(3, 4), this.id.slice(5, 7));
          _this.changeXLR(this);
        });
      });
    });
  }

  openModal(device, ioType, ioNbr) {
    console.log(`[deviceDetailCtrl] opening io ${ioType}${ioNbr}`)
    let connector = device.inputs[ioNbr - 1];
    let type = ioType == "i" ? "Input" : "Output";
    $('.modal').removeClass("hidden");
    $('.overlay').removeClass("hidden");
    $("#modal-title").html(device.getName() + " - " + type + " " + ioNbr);
    $("#channel-name").val(connector.getName());
    $('#color-list').attr('data-selected', connector.getColor());
    this.selectColor(connector.getColor());
    this.selectIcon(connector.getIcon());
    $('#channel-phase').prop('checked', connector.getPhaseInvert());
    $('#channel-phase').prop('checked', connector.getColorInvert());
  };

  selectColor(id) {
    let $selected = $(document).find('#color-list').find(':button[value="' + id + '"]');
    let $selectedValue = $selected.val(); 
    let $icon          = $selected.find('svg');
    let $text          = $selected.find('span');
    let $btn           = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');
  
    $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
    $btn.find('span').remove();
    $btn.find('svg').remove();
    $btn.find('object').remove();
    $btn.prepend($text[0].outerHTML);
    $btn.prepend($icon[0].outerHTML);
  }
  
  selectIcon(id) {
    let $selected = $(document).find('#icon-list').find(':button[value="' + id + '"]');
    let $selectedValue = $selected.val();
    let $icon         = $selected.find('object');
    let $text          = $selected.find('span');
    let $btn           = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');
  
    $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
    $btn.find('span').remove();
    $btn.find('svg').remove();
    $btn.find('object').remove();
    $btn.prepend($text[0].outerHTML);
    $btn.prepend($icon[0].outerHTML);
  }
}