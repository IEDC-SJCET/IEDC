import {openSpinner, submitDone, submitNOTDone} from '/src/script/main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { addDoc, getFirestore, collection } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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
const storage = getStorage();

const metadata = {
    contentType: 'application/pdf',
    author: 'Inside SJCET'
};

var file;
var file_name;
const SUBMITFORM = document.getElementById('SUBMITFORM');


let m1,m2,m3,m4,m5,data;

const takeMemeberData = (newURL)=>{
    m1 = {
                Name:SUBMITFORM.leaderName.value,
                Email:SUBMITFORM.leaderEmail.value,
        }
    m2 = {
                Name:SUBMITFORM.member2Name.value,
                Email:SUBMITFORM.member2Email.value,
        }
    m3 = {
                Name:SUBMITFORM.member3Name.value,
                Email:SUBMITFORM.member3Email.value,
        }
    if (isVisible('member4')) {
        m4 = {
                Name:SUBMITFORM.member4Name.value,
                Email:SUBMITFORM.member4Email.value,
        }
    }
    else m4 = "NA";

    if (isVisible('member5')) {
        m5 = {
                Name:SUBMITFORM.member5Name.value,
                Email:SUBMITFORM.member5Email.value,
        }
    }
    else m5 = "NA";

    data = {
        // here is the actual code lives
                TeamName: SUBMITFORM.teamName.value,
                Leader: m1,
                Member2: m2,
                Member3: m3,
                Member4: m4,
                Member5: m5,
                Institution: SUBMITFORM.institutionName.value,
                FieldOfStudy: SUBMITFORM.fieldOfStudy.value,
                CurrentYear: SUBMITFORM.currentYear.value,
                UploadTimeStamp: Date.now(),
                projectDoc: newURL,
            }
}

SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        file_name = (SUBMITFORM.teamName.value).replace(/ +/g,"");
        uploadFile("EVENTS", file, file_name, metadata)
        .then(newURL => {
            takeMemeberData(newURL);
            
            console.log(m1,m2,m3,m4,m5, data);
            addDoc(HACKATHON, data).then(() => {
                        SUBMITFORM.reset();
                        submitDone();
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                        submitNOTDone();
                    });
        })
})

function isVisible(element) {
    return (document.getElementById(element).classList.contains('show'));
}

function uploadFile (dir, file, file_name, metadata ) {
    return new Promise((resolve, reject)=>{
        const storageRef = ref(storage, dir +'/'+ file_name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
        (snapshot) => {
            //do nothing
        }, 
        (error) => {
            switch (error.code) {
            case 'storage/unauthorized':
            case 'storage/canceled':
            case 'storage/unknown':
                reject("Uploading Error");
            }
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        }
        );
      
   });
    
}

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            console.log('added file')
            file = e.target.files[0];
            file_name = file.name;
            console.log(file_name)
            updateThumbnail(dropZoneElement, file);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            console.log('added file')
            file = e.dataTransfer.files[0];
            file_name = file.name;
            console.log(file_name)
            updateThumbnail(dropZoneElement, file);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

 /**
             * Updates the thumbnail on a drop zone element.
             *
             * @param {HTMLElement} dropZoneElement
             * @param {File} file
             */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            console.log("done background change")
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
        console.log("not done background change")
    }
}