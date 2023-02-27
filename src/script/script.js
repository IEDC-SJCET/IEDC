const myTimeout = setTimeout(loader, 5000);

window.addEventListener("load",()=>{
    loader()
});

const extraTabs = document.getElementById('extraTabs');
const openButton = document.getElementById('openButton');
openButton.addEventListener('click',()=>{

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

});

function loader(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    console.log("done loading");
    AOS.init();
}

