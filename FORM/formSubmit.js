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
const HACKATHON = collection(DB,'HACKATHON');
let m1,m2,m3,m4,m5;
const takeMemeberData = ()=>{
    m1 = {
                Name:SUBMITFORM.leaderName.value,
                Email:SUBMITFORM.leaderEmail.value,
                Phone:SUBMITFORM.leaderPhone.value
        }
    m2 = {
                Name:SUBMITFORM.member2Name.value,
                Email:SUBMITFORM.member2Email.value,
                Phone:SUBMITFORM.member2Phone.value
        }
    m3 = {
                Name:SUBMITFORM.member3Name.value,
                Email:SUBMITFORM.member3Email.value,
                Phone:SUBMITFORM.member3Phone.value
        }
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
}

const SUBMITFORM = document.getElementById('SUBMITFORM');
SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        takeMemeberData();
        console.log(m1,m2,m3,m4,m5);
        addDoc(HACKATHON, {
            // here is the actual code lives
                    TeamName: SUBMITFORM.teamName.value,
                    Leader: m1,
                    Member2: m2,
                    Member3: m3,
                    Member4: m4,
                    Member5: m5,
                    Institution: SUBMITFORM.institutionName.value,
                    FieldOfStudy: SUBMITFORM.fieldOfStudy.value,
                    GraduationYear: SUBMITFORM.graduationYear.value,
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
    return (document.getElementById(element).classList.contains('show'));
}