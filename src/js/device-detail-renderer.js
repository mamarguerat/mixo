window.$ = window.jQuery = require("jquery");
const path = require('path');
const Constants = require('./const.js')

$(document).ready(function() {
  // Create dropdowns
  Constants.icons.forEach((icon, index, fullArray) => {
    $('#icon-list').append(
      "<button type='button' value='" + (index + 1) + "'' tabindex='0' class='dropdown-item'>" +
      "<object class='icon' data='" + path.join(Constants.iconsPath, (index+1) + ".svg") + "' type='image/svg+xml'></object>" +
      "<span>" + icon + "</span>" +
      "</button>"
    )
  });

  Constants.colors.forEach((color, index, fullArray) => {
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
});