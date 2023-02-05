import { openSpinner, submitDone, submitNOTDone,timeDifference, common } from '/src/script/main.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { addDoc, getFirestore, collection, getDocs, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

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


const formHead = document.getElementById('formHead');
const formBody = document.getElementById('formBody');
const FORMS = collection(DB,'FORMS');
const qry = query(FORMS, orderBy("TimeStamp", "desc"), limit(1));

const querySnapshot = await getDocs(qry);
querySnapshot.forEach((doc) => {
    let data = doc.data()
    common()
    if (data.EventStartAt < Date.now()){
        formHead.innerHTML = formTemplate(data)
        const newCollection = collection(DB,'FEEDBACK');
        formBody.style.display = "flex";


        const SUBMITFORM = document.getElementById('formBody');
        SUBMITFORM.addEventListener('submit',e => {
            e.preventDefault();
            openSpinner()
            console.log("Submitted")


            const formData = new FormData(SUBMITFORM);
            let feedback = {};
            for (const [key, value] of formData.entries()) {
               feedback[key] = value;
            }
           feedback["TimeStamp"] = Date.now();
           feedback["EventName"] = data.EventName;
            console.log(feedback)

            addDoc(newCollection,feedback).then((docRef) => {
                submitDone()
                let URL = "./success/";
                setTimeout(() => {
                    window.location.replace(URL);
                }, 2500);
            })
            .catch((error) => {
                submitNOTDone()
                console.error("Error adding document: ", error);
            })

        })
    }
    else {
        formHead.innerHTML = `<div class="d-flex shadow-lg showWidth p-5 bg-white">Not Found, 404 &nbsp; <i class="bi bi-x-octagon-fill"></i></div>`
    }
});

 function formTemplate(data){
    return `<div class="d-flex flex-column gap-2 card shadow-lg showWidth">
                <img src=${data.ImgURL} alt="" class="card-img-top border-bottom">
                <h2 class="text-black fw-bolder card-header d-flex justify-content-between">
                    FEEDBACK FORM
                    <i class="bi bi-stars greencolor"></i>
                </h2>
                <p class="card-body">
                    We are happy to have you, It is a great event to be a part of. We are looking forward to your feedback.
                </p>
            </div>`
 }