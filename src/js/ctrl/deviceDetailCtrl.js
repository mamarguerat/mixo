const { ipcRenderer } = require("electron");

const constants = new Const();
class DeviceDetailCtrl {

  // MARK: Constructor
  constructor() {
    /* ----- IPC ----- */
    ipcRenderer.on('ready', (event, arg) => {
      console.log(`[deviceDetailCtrl] window ready, load device ${arg.id}`);
      this.initialize(arg);
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
    $('#save').on('click', (e) => {
      this.saveConnector();
    })
  }

  // MARK: Event handling
  closeModal() {
    $('.modal').addClass("hidden");
    $('.overlay').addClass("hidden");
  };

  documentReady() {
    // Create dropdowns
    constants.icons.forEach((icon, index, fullArray) => {
      $('#icon-list').append(
        "<button type='button' value='" + (index + 1) + "'' tabindex='0' class='dropdown-item'>" +
        "<object class='icon' data='" + path.join(constants.iconsPath, (index+1) + ".svg") + "' type='image/svg+xml'></object>" +
        "<span>" + icon + "</span>" +
        "</button>"
      )
    });

    constants.colors.forEach((color, index, fullArray) => {
      $('#color-list').append(
        "<button type='button' value='" + color.ID + "'' tabindex='0' class='dropdown-item'>" +
        "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>" +
        "<circle r='24' cx='25' cy='25' fill='" + color.Color + "' stroke='#000000'></circle>" +
        "</svg>" +
        "<span>" + color.Name + "</span>" +
        "</button>"
      )
    });

    $(document).click(function() {
      $('.dropdown-menu.show').removeClass('show');
    });
    
    $('body').on('click','.trigger-dropdown', function(e){
      e.stopPropagation();
      $(this).closest('.dropdown-wrapper').find('.dropdown-menu').toggleClass('show');
    });
    
    $('body').on('click','.dropdown-item', function(e){
      e.stopPropagation();
      let $selectedValue = $(this).val();
      let $icon          = $(this).find('svg');
      if ($icon.length <= 0) {
        $icon            = $(this).find('object');
      }
      let $text          = $(this).find('span');
      let $btn           = $(this).closest('.dropdown-wrapper').find('.trigger-dropdown');

      $(this).closest('.dropdown-wrapper').find('.dropdown-menu').removeClass('show').attr('data-selected', $selectedValue);
      $btn.find('span').remove();
      $btn.find('svg').remove();
      $btn.find('object').remove();
      $btn.prepend($text[0].outerHTML);
      $btn.prepend($icon[0].outerHTML);
    });
  }

  saveConnector() {
    if (this.selectedType == "i") {
      this.selectedDevice.inputs[this.selectedIO - 1].setName($('#channel-name').val());
      this.selectedDevice.inputs[this.selectedIO - 1].setColor($('#color-list').attr('data-selected'));
      this.selectedDevice.inputs[this.selectedIO - 1].setIcon($('#icon-list').attr('data-selected'));
      this.selectedDevice.inputs[this.selectedIO - 1].setPhaseInvert($('#channel-phase').prop('checked'));
      this.selectedDevice.inputs[this.selectedIO - 1].setColorInvert($('#channel-invert').prop('checked'));
    }
    else {
      this.selectedDevice.outputs[this.selectedIO - 1].setName($('#channel-name').val());
      this.selectedDevice.outputs[this.selectedIO - 1].setColor($('#color-list').attr('data-selected'));
      this.selectedDevice.outputs[this.selectedIO - 1].setIcon($('#icon-list').attr('data-selected'));
      this.selectedDevice.outputs[this.selectedIO - 1].setPhaseInvert($('#channel-phase').prop('checked'));
      this.selectedDevice.outputs[this.selectedIO - 1].setColorInvert($('#channel-invert').prop('checked'));
    }
    ipcRenderer.send('forward-to-main', { worker: indexWrk });
    this.closeModal();
  }

  // MARK: IPC events
  initialize(arg) {
    indexWrk = constants.reconstructIndexWrk(arg.worker);
    this.deviceID = arg.id;
    this.drawCanvas(indexWrk.getDeviceFromId(this.deviceID));
  }

  /**
   * Data changes received from main windows IPC
   * @param {*} arg 
   */
  dataUpdated(arg) {
    console.log(`[deviceDetailCtrl] got worker from main`);
    indexWrk = constants.reconstructIndexWrk(arg.worker);
  }

  // MARK: Functions

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
          _this.selectedType = this.id.slice(3, 4);
          _this.selectedIO = this.id.slice(5, 7);
          _this.selectedDevice = device;
          _this.openModal();
        });
      });
    });
  }

  openModal() {
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
    $('.modal').removeClass("hidden");
    $('.overlay').removeClass("hidden");
    $("#modal-title").html(this.selectedDevice.getName() + " - " + type + " " + this.selectedIO);
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
    let $icon          = $selected.find('svg');
    let $text          = $selected.find('span');
    let $btn           = $selected.closest('.dropdown-wrapper').find('.trigger-dropdown');
  
    console.log($selected)

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
    let $icon          = $selected.find('object');
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