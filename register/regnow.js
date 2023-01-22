import { openSpinner, submitDone, submitNOTDone } from '/src/script/main.js';
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
        let branch = SUBMITFORM.branch.value;
        if (branch == 'other'){
            if (SUBMITFORM.otherBranch.value == "")
                branch = "unknown";
            else branch = SUBMITFORM.otherBranch.value;
        }
        
        addDoc(REGISTER, {
                    Name: SUBMITFORM.Name.value,
                    Email: SUBMITFORM.Email.value,
                    WhatsappNumber: SUBMITFORM.WhatsappNumber.value,
                    College: SUBMITFORM.institutionName.value,
                    Branch: branch,
                    Year: SUBMITFORM.currentYear.value,
                    Text: SUBMITFORM.message.value,
                    TimeStamp: Date.now()
                }).then(() => {
                    SUBMITFORM.reset();
                    submitDone();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    submitNOTDone();
                });
})