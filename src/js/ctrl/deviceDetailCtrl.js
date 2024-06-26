const { ipcRenderer } = require("electron");
require('jquery-sortablejs');

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
      )
    });

    constants.colors.forEach((color, index, fullArray) => {
      $('#color-list').append(
        "<button type='button' value='" + color.ID + "'' tabindex='0' class='dropdown-item'>" +
        "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'>" +
        "<circle r='24' cx='25' cy='25' fill='" + color.ColorBack + "' stroke='#000000'></circle>" +
        "</svg>" +
        "<span>" + color.Name + "</span>" +
        "</button>"
      )
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

    // Create sortables
    for (var i = 0; i < 32; i++) {
      $('.channel-names-container').append("<div class='channel-name'>Channel " + (i+1) + "</div>");
      $('.sortable-container').append("<div class='io-element'><div style='background-color: #999999;'><p>NO IO SELECTED</p></div><p>LOCAL " + (i+1) + "</p></div>");
    }
    $('#input-sortable').sortable({
      multiDrag: true,
      animation: 150,
      ghostClass: "ghost",
      dragClass: "drag",
      chosenClass: "chosen",
      selectedClass: "selected",
    });
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
    console.log(`[deviceDetailCtrl] draw canvas`)
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

      $allElements.each(function () {
        $(this).on("click", function (ev) {
          _this.selectedType = this.id.slice(3, 4);
          _this.selectedIO = this.id.slice(5, 7);
          _this.selectedDevice = device;
          _this.openModal();
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
        }
      });
      $.each($outputs, function (idx, val) {
        var output = indexWrk.getDeviceFromId(_this.deviceID).outputs[val.id.slice(5, 7) - 1];
        console.log(output)
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
        }
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
}