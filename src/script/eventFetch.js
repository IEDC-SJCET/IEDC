import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from "firebase/firestore";

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

let valid = {
        btn : "btn-success",
        btnText : "Reg Now",
        icon: "bi bi-chevron-right"
    }
let invalid = {
        btn : "btn-light",
        btnText : "Expired",
        icon: "bi bi-clock"
    }

const templete = (i,data) => {
    let validity = data.LinkExpireAt < Date.now()? valid : invalid;
    let display = i > 3? "d-none d-md-block" : " ";
    return `<div class="Event${i} bg-white card  border ${display}">
                <div class="card-img">
                    <img src=${data.IMG_URL} alt="" srcset=""
                    class="img-fluid m-auto">
                </div>
                <div class="card-img-overlay eventIMGoverlay rounded-0 d-flex flex-column">
                    <a href = ${data.RedirectLink} class=" m-auto mb-4 btn ${validity.btn} rounded-5 border">${validity.btnText} &nbsp;<i class="${validity.icon}"></i></a>
                </div>
            </div>`;
}

const EVENTS = collection(DB,'EVENTS');
const qry = query(EVENTS, orderBy('EventStartsAt', "desc"));
const container5 = document.getElementById("container5");
window.onload = async function () {
    container5.innerHTML = "";
    const querySnapshot = await getDocs(qry);
    let i = 1;
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (i < 6) {
            container5.innerHTML += templete(i,data);
        }
        i++;
    });
}


// str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');