const { ipcRenderer } = require("electron");
require('jquery-sortablejs');

const constants = new Const();
const LUT = new DeviceTypeLUT();
class DeviceDetailCtrl {

  // MARK: Constructor
  constructor() {
    /* ----- IPC ----- */
    ipcRenderer.on('ready', (event, arg) => {
      console.log(`[deviceDetailCtrl] window ready, load device ${arg.id}`);
      this.initialize(arg);
      this.loadHTML(indexWrk.getDeviceFromId(this.deviceID).getType());
      this.drawCanvas(indexWrk.getDeviceFromId(this.deviceID))
    });
    ipcRenderer.on('new-data', (event, arg) => {
      this.dataUpdated(arg);
    })
    /* ----- DOM Event Listeners ----- */
    $(document).ready(this.documentReady());
    $('.btn-close').on('click', (e) => {
      this.closeModal();
    });
    $('.overlay').on('click', (e) => {
      this.closeModal();
    });
    $('#cancel-channel, #cancel-connector').on('click', (e) => {
      this.closeModal();
    });
    $('#save-connector').on('click', (e) => {
      this.saveConnector();
    });
    $('#save-channel').on('click', (e) => {
      this.saveChannel();
    });
  }

  // MARK: Event handling
  /**
   * Load HTML components from device type
   * @param {String} deviceType 
   */
  loadHTML(deviceType) {
    // Load tabs
    this.addChannelTab("input", "Input channels", "Channel", LUT.getChannelsCnt(deviceType));
    // this.addChannelTab("mixbus", "Mixbus channels", "Mixbus", LUT.getMixbusCnt(deviceType));
    // this.addChannelTab("matrix", "Matrix channels", "Matrix", LUT.getMatrixCnt(deviceType));
    // this.addChannelTab("stereo", "Stereo channels", "Stereo", LUT.getStereoCnt(deviceType));
    // this.addChannelTab("dca", "DCA channels", "DCA", LUT.getDcaCnt(deviceType));
    $('.tab').on('click', (e) => {
      this.changeTab(e);
    });
  }

  /**
   * Close modal form
   */
  closeModal() {
    $('.modal').addClass("hidden");
    $('.overlay').addClass("hidden");
  };

  /**
   * Document ready, prepare icon and color lists
   */
  documentReady() {
    // Create dropdowns
    constants.icons.forEach((icon, index, fullArray) => {
      $('#icon-list').append(
        "<button type='button' value='" + (index + 1) + "'' tabindex='0' class='dropdown-item'>" +
        "<object class='icon' data='" + path.join(constants.iconsPath, (index + 1) + ".svg") + "' type='image/svg+xml'></object>" +
        "<span>" + icon + "</span>" +
        "</button>"
      );
    });

    constants.colors.forEach((color, index, fullArray) => {
      $('#color-list').append(
        "<button type='button' value='" + color.ID + "'' tabindex='0' class='dropdown-item'>" +
        "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>" +
        "<circle r='24' cx='25' cy='25' fill='" + color.ColorBack + "' stroke='#000000'></circle>" +
        "</svg>" +
        "<span>" + color.Name + "</span>" +
        "</button>"
      );
    });

    $(document).click(function () {
      $('.dropdown-menu.show').removeClass('show');
    });

    $('body').on('click', '.trigger-dropdown', function (e) {
      e.stopPropagation();
      $(this).closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('show');
    });

    $('body').on('click', '.dropdown-item', function (e) {
      e.stopPropagation();
      let $selectedValue = $(this).val();
      let $icon = $(this).find('svg');
      if ($icon.length <= 0) {
        $icon = $(this).find('object');
      }
      let $text = $(this).find('span');
      let $btn = $(this).closest('.dropdown-wrapper').find('.trigger-dropdown');

      $(this).closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
      $btn.find('span').remove();
      $btn.find('svg').remove();
      $btn.find('object').remove();
      $btn.prepend($text[0].outerHTML);
      $btn.prepend($icon[0].outerHTML);
    });
  }

  /**
   * Channel position changed
   */
  moveChannel() {
    ipcRenderer.send('forward-to-main', { worker: indexWrk });
  }

  /**
   * Save button pressed
   */
  saveConnector() {
    indexWrk.updateConnector(
      this.selectedDevice.getId(),
      this.selectedType,
      this.selectedIO,
      $('#channel-name').val(),
      $('#color-list').attr('data-selected'),
      $('#icon-list').attr('data-selected'),
      $('#channel-phase').prop('checked'),
      $('#channel-invert').prop('checked')
    );
    ipcRenderer.send('forward-to-main', { worker: indexWrk });
    this.closeModal();
  }

  /**
   * Save button pressed
   */
  saveChannel() {
    let dataSelected = $('#channel-list').attr('data-selected').split('-');
    // index0: deviceID, index1: type, index2: IO index
    let source = $('#channel-modal').children('.dropdown-wrapper').children('button').children('span').children('.source').text().match('[a-zA-Z]+')[0];
    indexWrk.updateChannel(
      this.selectedDevice.getId(),
      this.selectedTab,
      this.selectedChannel,
      dataSelected[0], dataSelected[2],
      source
    );
    ipcRenderer.send('forward-to-main', { worker: indexWrk });
    this.closeModal();
  }

  /**
   * Change active tab
   * @param {Event} element 
   */
  changeTab(element) {
    this.closeModal();
    $('section').each(function () {
      $(this).addClass('hidden');
    });
    $('.' + element.target.id).removeClass('hidden');
    $('.tab').each(function () {
      $(this).removeClass('active');
    });
    $('#' + element.target.id).addClass('active');
    this.selectedTab = element.target.id;
  }

  // MARK: IPC events
  initialize(arg) {
    this.deviceID = arg.id;
    this.dataUpdated(arg);
  }

  /**
   * Data changes received from main windows IPC
   * @param {*} arg 
   */
  dataUpdated(arg) {
    console.log(`[deviceDetailCtrl] got worker from main`);
    indexWrk = constants.reconstructIndexWrk(arg.worker);
    this.drawCanvas(indexWrk.getDeviceFromId(this.deviceID));
  }

  // MARK: Functions
  drawCanvas(device) {
    let imageFileName = "";
    this.selectedDevice = device;
    console.log(`[deviceDetailCtrl] draw canvas`)
    imageFileName = device.getType();
    if (LUT.getTypeFromId(this.selectedDevice.getType()) == "Mixer") {
      imageFileName += "-back";
    }
    $('#canvas').empty();
    $('#canvas').append(
      "<div id='device' class='device detail " + device.getName() +
      "' style='top: 0px; left: 0px;'>" +
      "<object id='svg' class='detail' draggable='false' data='" + path.join(constants.imagesPath, imageFileName + ".svg") +
      "' type='image/svg+xml'></div>"
    )

    var _this = this;
    $('#svg').on("load", function (ev) {
      var $svg = $(this).contents();

      var $inputs = $svg.find('#Inputs').children();
      var $outputs = $svg.find("#Outputs").children();
      var $allElements = $inputs.add($outputs);

      $allElements.each(function () {
        $(this).on("click", function (ev) {
          _this.selectedType = this.id.slice(3, 4);
          _this.selectedIO = this.id.slice(5, 7);
          _this.openConnectorModal();
        });
      });

      $.each($inputs, function (idx, val) {
        var input = indexWrk.getDeviceFromId(_this.deviceID).inputs[val.id.slice(5, 7) - 1];
        if ((input.getName() != "") || (input.getIcon() != "1") || (input.getColor() != "OFF")) {
          var colors = constants.getColorCode(input.getColor());
          if (input.getColorInvert() == true)
          {
            var temp = colors.Front;
            colors.Front = colors.Back;
            colors.Back = temp;
          }
          val.querySelector('#connector').innerHTML =
            "<circle id='back' r='39.5' cx='39.5' cy='39.5' fill='" + colors.Back + "' stroke='" + colors.Front + "' />";
          fetch("../public/assets/icons/svg/" + input.getIcon() + ".svg")
            .then(response => response.text())
            .then(svgText => {
              const parser = new DOMParser();
              const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
              let iconGroup = svgDocument.getElementById('icon');
              iconGroup.setAttribute("transform", "translate(7 7)");
              iconGroup.setAttribute("style", "fill:" + colors.Front + ";stroke:" + colors.Front);
              val.querySelector('#connector').appendChild(iconGroup);
            })
            .catch(error => {
              console.error(`[deviceDetailCtrl] Error fetching the SVG file ${error}`);
            });
          val.querySelector('#connector').innerHTML += "<text font-family='arial' font-size='12px' fill='" + colors.Front + "' text-anchor='middle' x='39.5' y='72'>" + input.getName() + "</text>";
        }
      });
      $.each($outputs, function (idx, val) {
        var output = indexWrk.getDeviceFromId(_this.deviceID).outputs[val.id.slice(5, 7) - 1];
        if ((output.getName() != "") || (output.getIcon() != "1") || (output.getColor() != "OFF")) {
          var colors = constants.getColorCode(output.getColor());
          if (output.getColorInvert() == true)
          {
            var temp = colors.Front;
            colors.Front = colors.Back;
            colors.Back = temp;
          }
          val.querySelector('#connector').innerHTML =
          "<circle id='back' r='39.5' cx='39.5' cy='39.5' fill='" + colors.Back + "' stroke='" + colors.Front + "' />";
          fetch("../public/assets/icons/svg/" + output.getIcon() + ".svg")
            .then(response => response.text())
            .then(svgText => {
              const parser = new DOMParser();
              const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
              let iconGroup = svgDocument.getElementById('icon');
              iconGroup.setAttribute("transform", "translate(7.5 7.5)");
              iconGroup.setAttribute("style", "fill:" + colors.Front + ";stroke:" + colors.Front);
              val.querySelector('#connector').appendChild(iconGroup);
            })
            .catch(error => {
              console.error(`[deviceDetailCtrl] Error fetching the SVG file ${error}`);
            });
            val.querySelector('#connector').innerHTML += "<text font-family='arial' font-size='12px' fill='" + colors.Front + "' text-anchor='middle' x='39.5' y='72'>" + output.getName() + "</text>";
        }
      });
    });
    $('#channel-list').empty();
    $('#channel-list').append(
      "<button type='button' value='0' tabindex='0' class='dropdown-item'>" + "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>" +
      "</svg>" +
      "<span>Empty</br><span class='source'></span></span>" +
      "</button"
    );
    this._connectorList = indexWrk.getAllUsedConnectors(this.selectedDevice.getId(), 'i');
    this._connectorList.forEach((input, index, fullArray) => {
      let connector = indexWrk.getConnector(input.deviceID, 'i', input.index);
      var colors = constants.getColorCode(connector.getColor());
      if (connector.getColorInvert() == true)
      {
        var temp = colors.Front;
        colors.Front = colors.Back;
        colors.Back = temp;
      }
      $('#channel-list').append(
        "<button type='button' value='" + input.deviceID + '-i-' + input.index + "' tabindex='0' class='dropdown-item'>" + "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>" +
        "<circle r='24' cx='25' cy='25' fill='" + colors.Back + "' stroke='" + colors.Front + "' />" +
        "</svg>" +
        "<span>" + connector.getName() + "</br><span class='source'>" + input.source + (input.index + 1) + "</span></span>" +
        "</button"
      );
      fetch("../public/assets/icons/svg/" + connector.getIcon() + ".svg")
      .then(response => response.text())
      .then(svgText => {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
        let iconGroup = svgDocument.getElementById('icon');
        iconGroup.setAttribute("transform", "scale(0.7) translate(4 4)");
        iconGroup.setAttribute("style", "fill:" + colors.Front + ";stroke:" + colors.Front);
        document.querySelector('#channel-list').querySelector('[value="' + input.deviceID + '-i-' + input.index + '"]').querySelector('svg').appendChild(iconGroup);
      })
      .catch(error => {
        console.error(`[deviceDetailCtrl] Error fetching the SVG file ${error}`);
      });
    });
    device.channels.forEach((channel, index, fullArray) => {
      let $element = $('#input-sortable').children('.io-element');
      let connector = indexWrk.getConnector(channel.getDeviceId(), 'i', channel.getIO());
      if (typeof connector !== 'undefined') {
        var colors = constants.getColorCode(connector.getColor());
        if (connector.getColorInvert() == true)
        {
          var temp = colors.Front;
          colors.Front = colors.Back;
          colors.Back = temp;
        }
        $element.eq(index).children("div").children("p").text(connector.getName());
        $element.eq(index).children("div").css("background-color", colors.Back);
        $element.eq(index).children("div").css("color", colors.Front);
        $element.eq(index).children("div").css("border", "1px solid " + colors.Front);
        $element.eq(index).children("p").text(channel.getSource() + (Number(channel.getIO()) + 1));
        fetch("../public/assets/icons/svg/" + connector.getIcon() + ".svg")
        .then(response => response.text())
        .then(svgText => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgText, 'image/svg+xml');
          let iconGroup = svgDocument.getElementById('icon');
          iconGroup.setAttribute("transform", "scale(0.8) translate(-8 -10)");
          iconGroup.setAttribute("style", "fill:" + colors.Front + ";stroke:" + colors.Front);
          $element.eq(index).children("div").children("svg").empty();
          $element.eq(index).children("div").children("svg").append(iconGroup);
        })
        .catch(error => {
          console.error(`[deviceDetailCtrl] Error fetching the SVG file ${error}`);
        });
      }
      else {
        $element.eq(index).children("div").children("p").text("NO IO SELECTED");
        $element.eq(index).children("div").css("background-color", "#999999");
        $element.eq(index).children("div").css("color", "#000000");
        $element.eq(index).children("div").css("border", "none");
        $element.eq(index).children("p").text("");
        $element.eq(index).children("div").children("svg").empty();
      }
    });
  }

  addChannelTab(id, name, channelName, channelCnt) {
    if (0 < channelCnt) {
      $('#tabs').append("<div class='tab' id='channel-" + id + "'>" + name + "</div>");
      $('.io').after("<section class='channel-" + id + " hidden'>" +
        "<div id='" + id + "-channel-names' class='channel-names-container'></div>" +
        "<div id='" + id + "-sortable' class='sortable-container'></div>" +
        "</section > ");

      // Create sortables
      for (var i = 0; i < channelCnt; i++) {
        $('#' + id + '-channel-names').append("<div class='channel-name'>" + channelName + " " + (i+1) + "</div>");
        $('#' + id + '-sortable').append("<div class='io-element'><div style='background-color: #999999;'><p>NO IO SELECTED</p><svg height='40px' width='50px'></svg></div><p></p></div>");
      }
      $('#' + id + '-sortable').sortable({
        multiDrag: false,
        animation: 150,
        ghostClass: "ghost",
        dragClass: "drag",
        chosenClass: "chosen",
        selectedClass: "selected",
      });

      var _this = this;
      $('#' + id + '-sortable').on("end", function (ev) {
        indexWrk.moveChannel(_this.deviceID, "input", ev.originalEvent.oldIndex, ev.originalEvent.newIndex);
        _this.moveChannel();
      });

      $('.io-element').on("click", function (ev) {
        _this.selectedChannel = $(this).index();
        _this.openChannelModal();
      });
    }
  }

  openChannelModal() {
    console.log(`[deviceDetailCtrl] opening channel ${this.selectedTab}${this.selectedChannel}`)
    let channel, connector, type, value;
    if (this.selectedTab == "channel-input") {
      channel = this.selectedDevice.channels[this.selectedChannel];
      type = "Input";
      connector = indexWrk.getConnector(channel.getDeviceId(), "i", channel.getIO());
      if (channel.getIO() != "") {
        value = channel.getDeviceId() + '-i-' + channel.getIO();
      }
      else {
        value = "0";
      }
    }
    else {
      if (this.selectedTab == "channel-mixbus") {
        channel = this.selectedDevice.mixbus[this.selectedChannel - 1];
        type = "Mixbus";
      }
      else if (this.selectedTab == "channel-matrix") {
        channel = this.selectedDevice.matrix[this.selectedChannel - 1];
        type = "Matrix";
      }
      else if (this.selectedTab == "channel-stereo") {
        channel = this.selectedDevice.stereo[this.selectedChannel - 1];
        type = "Stereo";
      }
      else if (this.selectedTab == "channel-dca") {
        channel = this.selectedDevice.dca[this.selectedChannel - 1];
        type = "DCA";
      }
      else {
        console.error(`[deviceDetailCtrl] invalid tab id ${this.selectedTab}`)
      }
      if (channel.getIO() >= 0) {
        value = channel.getDeviceId() + '-i-' + channel.getIO();
      }
      else {
        value = "0";
      }
      connector = indexWrk.getConnector(channel.getDeviceId(), "o", channel.getIO());
    }
    $('#channel-modal').removeClass("hidden");
    $('.overlay').removeClass("hidden");
    $("#channel-modal-title").html(this.selectedDevice.getName() + " - " + type + " " + this.selectedChannel);
    $('#channel-list').attr('data-selected', value);
    this.selectChannel(value);
  };

  openConnectorModal() {
    console.log(`[deviceDetailCtrl] opening io ${this.selectedType}${this.selectedIO}`)
    let connector, type;
    if (this.selectedType == "i") {
      connector = this.selectedDevice.inputs[this.selectedIO - 1];
      type = "Input";
    }
    else {
      connector = this.selectedDevice.outputs[this.selectedIO - 1];
      type = "Output";
    }
    $('#connector-modal').removeClass("hidden");
    $('.overlay').removeClass("hidden");
    $("#connector-modal-title").html(this.selectedDevice.getName() + " - " + type + " " + this.selectedIO);
    $("#channel-name").val(connector.getName());
    $('#color-list').attr('data-selected', connector.getColor());
    this.selectColor(connector.getColor());
    $('#icon-list').attr('data-selected', connector.getIcon());
    this.selectIcon(connector.getIcon());
    $('#channel-phase').prop('checked', connector.getPhaseInvert());
    $('#channel-invert').prop('checked', connector.getColorInvert());
  };

  selectColor(id) {
    let $selected = $(document).find('#color-list').find(':button[value="' + id + '"]');
    let $selectedValue = $selected.val();
    let $icon = $selected.find('svg');
    let $text = $selected.find('span');
    let $btn = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');

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
    let $icon = $selected.find('object');
    let $text = $selected.find('span');
    let $btn = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');

    $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
    $btn.find('span').remove();
    $btn.find('svg').remove();
    $btn.find('object').remove();
    $btn.prepend($text[0].outerHTML);
    $btn.prepend($icon[0].outerHTML);
  }

  selectChannel(id) {
    let $selected = $(document).find('#channel-list').find(':button[value="' + id + '"]');
    let $selectedValue = $selected.val();
    let $icon = $selected.find('svg');  // TODO: Check that full icon is loaded
    let $text = $selected.find('span');
    let $btn = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');

    $selected.closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
    $btn.find('span').remove();
    $btn.find('svg').remove();
    $btn.find('object').remove();
    $btn.prepend($text[0].outerHTML);
    $btn.prepend($icon[0].outerHTML);
  }
}
