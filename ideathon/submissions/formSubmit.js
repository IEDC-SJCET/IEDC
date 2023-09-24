import {openSpinner, submitDone, submitNOTDone} from './../../src/script/main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';
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
const firestoreName = 'smart-india-hackathon'; 
const HACKATHONSTORAGE = 'smart-india-hackathon-documents'
const HACKATHON = collection(DB,firestoreName);
const storage = getStorage();


var file;
var file_name;
// formData.delete('terms');//to delete entite input field
// let data = {};


const SUBMITFORM = document.getElementById('SUBMITFORM');
function getData(){
    let data = {}
    const formData = new FormData(SUBMITFORM);

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    data.time = Date.now()
    delete data['terms']

    if (!data.file) {
        alert("Please upload a file")
        throw new Error("Please upload a file")
    }

    return data
}


SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        file_name = (SUBMITFORM.teamID.value).replace(/ +/g,"");
        uploadFile(HACKATHONSTORAGE, file, file_name, SUBMITFORM.teamID.value)
        .then(newURL => {
            const data = getData();
            // data.url = newURL;

            console.log(data)
            const id = data.teamID.trim()
            let Ref = doc(DB, firestoreName, id);

            delete data.teamID
            delete data.file
            
            updateDoc(Ref, data).then(() => {
                let URL = "/ideathon/success/#" + id;
                setTimeout(() => {
                    window.location.replace(URL);
                }, 1000);
                submitDone();
            })
            .catch((error) => {
                console.log("Error : ", JSON.stringify(error, undefined, 2));
                submitNOTDone();
            });
        })
        .catch((error) => {
            console.log("Error adding document: ", JSON.stringify(error, undefined, 2));
            submitNOTDone();
        });
})

function isVisible(element) {
    return (document.getElementById(element).classList.contains('show'));
}

function uploadFile (dir, file, file_name, author) {
    if (!"type" in file) console.log("no file")
    const metadata = {
        contentType: file.type,
        author: author,
        title: file_name,
        time: Date.now(),
    };

    return new Promise((resolve, reject)=>{
        const storageRef = ref(storage, dir +'/'+ file_name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
        (snapshot) => {
            //do nothing
        }, 
        (error) => {
            console.log(error)

            switch (error.code) {
            case 'storage/unauthorized':
            case 'storage/canceled':
            case 'storage/unknown':
                reject("Uploading Error");
            default:
                reject("Unknown Error");
            }
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                resolve(downloadURL);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
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
    console.log(file.type)
    
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
