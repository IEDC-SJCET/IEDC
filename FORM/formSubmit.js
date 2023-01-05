import {openSpinner, submitDone, submitNOTDone} from '/src/script/main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { addDoc, getFirestore, collection } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';
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
const FORM = collection(DB,'FORMS');

let m4 ;
let m5 ;

if (isVisible('member4')) {
    m4 = {
            Name:SUBMITFORM.member4Name.value,
            Email:SUBMITFORM.member4Email.value,
            Phone:SUBMITFORM.member4Phone.value
    }
}
else m4 = "NA";

if (isVisible('member5')) {
    m5 = {
            Name:SUBMITFORM.member5Name.value,
            Email:SUBMITFORM.member5Email.value,
            Phone:SUBMITFORM.member5Phone.value
    }
}
else m5 = "NA";


const SUBMITFORM = document.getElementById('SUBMITFORM');
SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        addDoc(FORM, {
            // here is the actual code lives
                    Name: SUBMITFORM.Name.value,
                    Email: SUBMITFORM.Email.value,
                    Phone: SUBMITFORM.Phone.value,
                    UploadTimeStamp: Date.now()
                }).then(() => {
                    SUBMITFORM.reset();
                    submitDone();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    submitNOTDone();
                });
})

function isVisible(element) {
    if (getElementById(element).style.display == "none")
        return false;
    else return true;
}