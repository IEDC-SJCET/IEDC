import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

const firebaseConfig = {
                apiKey: "AIzaSyCNbmkHVo6YAOk69h9OgMGbQJBUlW5xz4c",
                authDomain: "iedc-admin.firebaseapp.com",
                projectId: "iedc-admin",
                storageBucket: "iedc-admin.appspot.com",
                messagingSenderId: "200933316108",
                appId: "1:200933316108:web:8b5d08b6295d0962ec8029"
            };
initializeApp(firebaseConfig);
const DB  = getFirestore();

let collider = (window.innerWidth < 768)? "collapse img-fluid" : "collapse-horizontal collapse img-fluid";
let valid = {
        btnBG : "",
        btnCOLOR: "greencolor",
        btnText : "Reg Now",
        icon: "bi bi-chevron-right"
    }
let invalid = {
        btnBG : "",
        btnCOLOR: "text-black-50",
        btnText : "Expired",
        icon: "bi bi-clock"
    }

const templete = (data) => {
    let validity = data.LinkExpireAt > Date.now()? valid : invalid;
    data.Description = data.Description.toString().replace(/(?:\r\n|\r|\n)/g, '<br>');
    let collapseTarget = data.EventName.toString().replace(/ +/g,"");
    return `
            <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
                <div style="max-width: 400px; max-height: 400px;">
                    <a data-bs-toggle="collapse" aria-expanded="true" data-bs-target="#${collapseTarget}" aria-controls="${collapseTarget}">
                        <img src=${data.IMG_URL} alt="EventIMG" class="img-fluid rounded-3">
                    </a>
                </div>
                <div class="${collider}" id="${collapseTarget}"
                    style="max-width: 400px; max-height: 400px;">
                    <div class="card shadow-lg  text-black">
                        <div class="fs-4 fw-bold text-black card-header">${data.EventName}</div>
                        <div class="fs-7 text-black-50 card-body">
                            <p>${data.Description}</p>
                            <p>${null}</p>
                        </div>
                        <div class="card-footer ${validity.btnBG} text-end">
                        <a href=${data.RedirectLink} class="${validity.btnCOLOR} py-2 fs-6 fw-bold">
                            ${validity.btnText} <i class="${validity.icon}"></i>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
            `;
}

const EVENTS = collection(DB,'EVENTS');
const qry = query(EVENTS, orderBy('EventStartsAt', "desc"));
const eventContainer = document.getElementById("eventSECTION");
    eventContainer.innerHTML = "";
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        eventContainer.innerHTML += templete(data);
    });