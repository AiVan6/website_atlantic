
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
    document.body.style.overflow = "hidden";
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.body.style.overflow = "";
}

function openRetractable() {
    window.scroll(0,0);
    document.getElementById('retractable').style.display = 'flex';
    document.body.style.overflow = "hidden";
}

function closeRetractable() {
    document.getElementById('retractable').style.display = 'none';
    document.body.style.overflow = "";
}

function openImg(data) {
    // console.log(data.srcElement.currentSrc);
    // let mainDiv = document.createElement('div');
    // mainDiv.className = "overlay";

    let mainDiv = document.getElementById('mainDivImg')
    mainDiv.style.display="flex";
    let popupDiv = document.createElement('div');
    popupDiv.className = "popupImg";
    popupDiv.id = "popupImg";

    let img = document.createElement('img');
    img.src = data.srcElement.currentSrc;
    img.style.width = "50%";
    img.style.height = "100%";


    let closeDiv = document.createElement('div');
    let close = document.createElement('img');

    closeDiv.className = "close";
    closeDiv.onclick = closeImg;
    close.src = "img/icons/close.png";

    closeDiv.appendChild(close);
    popupDiv.appendChild(img);
    popupDiv.appendChild(closeDiv);
    mainDiv.appendChild(popupDiv);
    document.body.appendChild(mainDiv);

    // document.getElementById('popupImg').style.display = 'flex';
    document.body.style.overflow = "hidden";
}

function closeImg() {

    let mainDiv = document.getElementById('mainDivImg');
    mainDiv.removeChild(document.getElementById('popupImg'));

    document.getElementById('mainDivImg').style.display = 'none';
    document.body.style.overflow = "";
}


function upperPage(obj){
    window.addEventListener('scroll', e => {
        if (pageYOffset >= 220) {
            obj.classList.add("op");
        } else {
            obj.classList.remove("op");
        }
    });
}

