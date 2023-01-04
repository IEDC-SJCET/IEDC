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
const REGISTER = collection(DB,'REGISTER');



const SUBMITFORM = document.getElementById('SUBMITFORM');
SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        if (SUBMITFORM.branch.value == "Other") {
            console.log(SUBMITFORM.otherBranch.value)
        }
        addDoc(REGISTER, {
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