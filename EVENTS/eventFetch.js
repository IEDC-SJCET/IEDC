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

const templete = (data) => {
    console.log(validity);
    return `<div class="row col  border-0 justify-content-center m-0">
                <div class="col-12 col-md-6 bg-transparent  card p-0 border-0 m-0">
                    <img src="${ s}" alt="" srcset="" class="img-fluid ">
                    <button class="card-img-overlay h-100 w-100" onclick="openEventDetails(${ a})"></button>
                </div>
                <div style="display: none;" id=${c}
                    class="card rounded-3 shadow-lg  col-12 col-md-5  bg-light eventbody ms-md-3 mt-3 mt-md-0 p-3 text-black flex-column justify-content-center">
                    <h2 class="fs-4 fw-bold text-black">${d}</h2>
                    <h5 class="fs-7 text-black-50">${e}</h5><br>
                    <h5 class="fs-7 text-black-50">${f}</h5><br>
                    <span class="mx-auto">
                        <a href=${g} class="btn btn-outline-dark rounded-5">${h}<i class=${i}></i></a>
                    </span>
                </div>
            </div>`;
}

const EVENTS = collection(DB,'EVENTS');
const qry = query(EVENTS, orderBy('timeStamp'));
const eventContainer = document.getElementById("eventSECTION");
    eventContainer.innerHTML = "";
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        eventContainer.innerHTML += templete(data);
    });


// str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');