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

const templete = (i,srcLINK,redirect,validity) => {
    console.log(validity);
    let btnSET = "btn-light";
    let display = i > 3? "d-none d-md-block" : " ";
    return `<div class="Event${i} bg-white card  border ${display}">
                <div class="card-img">
                    <img src="${srcLINK}" alt="" srcset=""
                    class="img-fluid m-auto">
                </div>
                <div class="card-img-overlay rounded-0 d-flex flex-column">
                    <a href = ${redirect} class=" m-auto mb-4 btn ${btnSET} rounded-5 border text-black-50">Expired &nbsp;<i class="bi bi-clock"></i></a>
                </div>
            </div>`;
}

const EVENTS = collection(DB,'EVENTS');
const qry = query(EVENTS, orderBy('timeStamp'));
const container5 = document.getElementById("container5");
window.onload = async function () {
    container5.innerHTML = "";
    const querySnapshot = await getDocs(EVENTS);
    let i = 1;
    querySnapshot.forEach((doc) => {
        console.log(i);
        let data = doc.data();
        if (i < 6) {
            container5.innerHTML += templete(i, data.fileLINK, data.redirect, data.firstDate);
        }
        i++;
    });
}


// str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');