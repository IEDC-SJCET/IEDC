import {openSpinner, submitDone, submitNOTDone} from './../../src/script/main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { addDoc, getFirestore, collection } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

// import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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
const HACKATHON = collection(DB,'smart-india-hackathon');
// const storage = getStorage();


// var file;
// var file_name;
// formData.delete('terms');//to delete entite input field
// let data = {};


const SUBMITFORM = document.getElementById('SUBMITFORM');
function getData(){
    let data = {}
    const formData = new FormData(SUBMITFORM);

    for (const [key, value] of formData.entries()) {
        if (key === "teamSelected"){
            data[key] = [...data[key] || [], value] 
        }
        else data[key] = value;
    }
    console.log(data)
    data.UploadTimeStamp = Date.now()
    return data
}


const takeMemeberData = ()=>{
    let m1,m2,m3,m4,m5, m6;
    m1 = {
                name:SUBMITFORM.member1Name.value,
                branch:SUBMITFORM.member1Branch.value,
                year:SUBMITFORM.member1Year.value
        }

    if (isVisible('member2')) {
        m2 = {
                name:SUBMITFORM.member2Name.value,
                branch:SUBMITFORM.member2Branch.value,
                year:SUBMITFORM.member2Year.value
        }
    }
    else m2 = { name: null, branch: null, year: null }

    if (isVisible('member3')) {
        m3 = {
                name:SUBMITFORM.member3Name.value,
                branch:SUBMITFORM.member3Branch.value,
                year:SUBMITFORM.member3Year.value
        }
    }
    else m3 = { name: null, branch: null, year: null }
        
    if (isVisible('member4')) {
        m4 = {
                name:SUBMITFORM.member4Name.value,
                branch:SUBMITFORM.member4Branch.value,
                year:SUBMITFORM.member4Year.value
        }
    }
    else m4 = { name: null, branch: null, year: null }

    if (isVisible('member5')) {
        m5 = {
                name:SUBMITFORM.member5Name.value,
                branch:SUBMITFORM.member5Branch.value,
                year:SUBMITFORM.member5Year.value
        }
    }
    else m5 = { name: null, branch: null, year: null }

    if (isVisible('member6')) {
        m6 = {
            name:SUBMITFORM.member6Name.value,
            branch:SUBMITFORM.member6Branch.value,
            year:SUBMITFORM.member6Year.value
        }
    }
    else m6 = { name: null, branch: null, year: null }

    const  data = {
        // here is the actual code lives
        
                // teamName: SUBMITFORM.teamName.value,
                member1Email: SUBMITFORM.member1Email.value,
                member1Phone: SUBMITFORM.member1Phone.value,
        

                member1: m1,
                member2: m2,
                member3: m3,
                member4: m4,
                member5: m5,
                member6: m6,

                UploadTimeStamp: Date.now(),

                dependency: "",
                describe: "",
                psCode: "",
                psTitle: "",
                techStack: "",
                theme: "",
                time: "",
                useCase: "",
                url: "",
    }

        return data
}

SUBMITFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        // file_name = (SUBMITFORM.teamName.value).replace(/ +/g,"");
        // uploadFile("startup", file, file_name, SUBMITFORM.teamName.value)
        // .then(newURL => {
            const data = takeMemeberData();
            
            addDoc(HACKATHON, data).then((docRef) => {
                let URL = "/ideathon/register/success/#" + docRef.id;
                setTimeout(() => {
                    window.location.replace(URL);
                }, 1000);
                submitDone();
            })
            .catch((error) => {
                alert("Error : ", JSON.stringify(error, undefined, 2));
                submitNOTDone();
            });
        // })
        // .catch((error) => {
        //     console.error("Error adding document: ", error);
        //     submitNOTDone();
        // });
})

function isVisible(element) {
    return (document.getElementById(element).classList.contains('show'));
}

// function uploadFile (dir, file, file_name, author) {
//     const metadata = {
//         contentType: file.type,
//         author: author,
//         title: file_name,
//         uploadedTimeStamp: Date.now(),
//     };
//     console.log(file.type)
//     return new Promise((resolve, reject)=>{
//         const storageRef = ref(storage, dir +'/'+ file_name);
//         const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//         uploadTask.on('state_changed',
//         (snapshot) => {
//             //do nothing
//         }, 
//         (error) => {
//             switch (error.code) {
//             case 'storage/unauthorized':
//             case 'storage/canceled':
//             case 'storage/unknown':
//                 reject("Uploading Error");
//             }
//         }, 
//         () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 resolve(downloadURL);
//             });
//         }
//         );
      
//    });
    
// }

// document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
//     const dropZoneElement = inputElement.closest(".drop-zone");

//     dropZoneElement.addEventListener("click", (e) => {
//         inputElement.click();
//     });

//     inputElement.addEventListener("change", (e) => {
//         if (inputElement.files.length) {
//             console.log('added file')
//             file = e.target.files[0];
//             file_name = file.name;
//             console.log(file_name)
//             updateThumbnail(dropZoneElement, file);
//         }
//     });

//     dropZoneElement.addEventListener("dragover", (e) => {
//         e.preventDefault();
//         dropZoneElement.classList.add("drop-zone--over");
//     });

//     ["dragleave", "dragend"].forEach((type) => {
//         dropZoneElement.addEventListener(type, (e) => {
//             dropZoneElement.classList.remove("drop-zone--over");
//         });
//     });

//     dropZoneElement.addEventListener("drop", (e) => {
//         e.preventDefault();

//         if (e.dataTransfer.files.length) {
//             inputElement.files = e.dataTransfer.files;
//             console.log('added file')
//             file = e.dataTransfer.files[0];
//             file_name = file.name;
//             console.log(file_name)
//             updateThumbnail(dropZoneElement, file);
//         }

//         dropZoneElement.classList.remove("drop-zone--over");
//     });
// });

//  /**
//              * Updates the thumbnail on a drop zone element.
//              *
//              * @param {HTMLElement} dropZoneElement
//              * @param {File} file
//              */
// function updateThumbnail(dropZoneElement, file) {
//     let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    
//     if (dropZoneElement.querySelector(".drop-zone__prompt")) {
//         dropZoneElement.querySelector(".drop-zone__prompt").remove();
//     }

    
//     if (!thumbnailElement) {
//         thumbnailElement = document.createElement("div");
//         thumbnailElement.classList.add("drop-zone__thumb");
//         dropZoneElement.appendChild(thumbnailElement);
//     }

//     thumbnailElement.dataset.label = file.name;
//     console.log(file.type)
    
//     if (file.type.startsWith("image/")) {
//         const reader = new FileReader();

//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
//             console.log("done background change")
//         };
//     } else {
//         thumbnailElement.style.backgroundImage = null;
//         console.log("not done background change")
//     }
// }
