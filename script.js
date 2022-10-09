var extraTabs = document.getElementById('extraTabs');
var openButton = document.getElementById('openButton');

function openAll(){
  if (extraTabs.style.display == 'none'){
    extraTabs.style.display = 'flex';
    openButton.childNodes[1].classList.remove("bi-chevron-down");
    openButton.childNodes[1].classList.add("bi-chevron-up");
  }
  else{
  extraTabs.style.display = 'none';
  openButton.childNodes[1].classList.remove("bi-chevron-up");
  openButton.childNodes[1].classList.add("bi-chevron-down");
  }
}