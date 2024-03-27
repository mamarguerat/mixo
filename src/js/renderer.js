//const information = document.getElementById('info')
//information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response)
}

function resizeInput() {
  $(this).attr('size', $(this).val().length);
}

$('input[type="text"]')
  // event handler
  .keyup(resizeInput)
  // resize on page load
  .each(resizeInput);