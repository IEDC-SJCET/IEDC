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

let firstHalf = `<div class="d-flex flex-column gap-4 mt-3 w-100">
                    <div class="w-100 flex-column d-flex gap-2">
                        <label class="req">STUDENTS DETAILS</label>
                        <input name="Name" type="text" minlength="2" maxlength="25" class="newFormField shadow-lg " placeholder="Name" required>
                        <input name="Email" type="email" minlength="4" maxlength="45" class="newFormField shadow-lg " placeholder="Email ID" required>
                        <input name="WhatsappNumber" type="tel" pattern="[0-9]{10}" maxlength="10" class="newFormField shadow-lg " placeholder="Whatsapp Number" required>
                        
                    </div>
                    <div class="w-100 flex-column d-flex gap-2">
                        <div>
                            <label class="req">ACADEMIC DETAILS</label>
                            <p>In what educational institution are you currently
                            enrolled in?</p>
                        </div>
                        <input name="institutionName" type="text" minlength="2" maxlength="20" class="newFormField shadow-lg " placeholder="Institution Name" required>
                        
                        <div class="choice shadow-lg justify-content-between d-flex flex-row flex-wrap">
                            <span class="w-100">Branch</span>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="AD" name="branch">
                                <span class="d-none d-md-block">Artificial Intelligence</span>
                                <span class="d-md-none">AD</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="CSE" name="branch">
                                <span class="d-none d-md-block">Computer Science</span>
                                <span class="d-md-none">CSE</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="CE" name="branch">
                                <span class="d-none d-md-block">Civil Engineering</span>
                                <span class="d-md-none">CE</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="ECE" name="branch">
                                <span class="d-none d-md-block">Electronics & Communication</span>
                                <span class="d-md-none">ECE</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="EEE" name="branch">
                                <span class="d-none d-md-block">Electrical & Electronics</span>
                                <span class="d-md-none">EEE</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="ME" name="branch">
                                <span class="d-none d-md-block">Mechanical Engineering</span>
                                <span class="d-md-none">ME</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="EI" name="branch">
                                <span class="d-none d-md-block">Electrical & Instrumentation</span>
                                <span class="d-md-none">EI</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="ECS" name="branch">
                                <span class="d-none d-md-block">Electronics & Computer Sci</span>
                                <span class="d-md-none">ECS</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input type="radio" value="CYB" name="branch">
                                <span class="d-none d-md-block">Cyber Security</span>
                                <span class="d-md-none">CYB</span>
                            </div>
                            <div class="w-50 d-flex gap-2">
                                <input id="otherRadio" name="branch" value="other" type="radio" class="collapsed" data-bs-toggle="collapse" data-bs-target="#otherText" aria-expanded="false" aria-controls="otherText">
                                <span>Other</span>                                
                            </div>
                            <div class="w-100">
                                <input id="otherText" name="otherBranch" type="text" minlength="3" maxlength="20" class="newFormField w-100 collapse" placeholder="Other?">
                            </div>
                        </div>

                        <div class="choice shadow-lg justify-content-between d-flex flex-row flex-wrap">
                            <span class="w-100">Year</span>
                            <div class="w-50">
                                <input type="radio" value="1" name="currentYear" required>
                                <span>First Year</span>
                            </div>
                            <div class="w-50">
                                <input type="radio" value="2" name="currentYear">
                                <span>Second Year</span>
                            </div>
                            <div class="w-50">
                                <input type="radio" value="3" name="currentYear">
                                <span>Third Year</span>
                            </div>
                            <div class="w-50">
                                <input type="radio" value="4" name="currentYear">
                                <span>Fourth Year</span>
                            </div>
                        </div>
                    </div>`
let secondHalf = `<div class="w-100 flex-column d-flex gap-2">
                        <div class="d-flex flex-column gap-2">
                            <label>HOLA 👋</label>
                            <p> Join our IEDC Wednesday Café Whatsapp group to get updates about the program and future events.</p>
                            <p><a class="btn btn-success text-decoration-none greencolor" target="_blank" href="https://chat.whatsapp.com/Cqvw6soqlF30wZzA37yUp2">Join Community Group <i class="bi bi-whatsapp"></i></a></p>
                        </div>
                        <div class="shadow-lg">
                            <div class="choice">
                                <span>Why do you want to join this program?</span>
                                <div class="w-100">
                                    <input name="message" type="text" maxlength="40" class="newFormField w-100" placeholder="Your Answer" required>
                                </div>
                            </div>
                            <div class="choice justify-content-between d-flex flex-row flex-wrap w-100">
                                <span class="w-100">How do you know about this program?</span>
                                <div class="w-50">
                                    <input type="radio" value="WA" name="ads" required>
                                    <span>Whatsapp</span>
                                </div>
                                <div class="w-50">
                                    <input type="radio" value="DIS" name="ads">
                                    <span>Discord</span>
                                </div>
                                <div class="w-50">
                                    <input type="radio" value="IG" name="ads">
                                    <span>Instagram</span>
                                </div>
                                <div class="w-50">
                                    <input type="radio" value="FRND" name="ads">
                                    <span>Friends told me</span>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
            
                    <div class="w-100 d-flex gap-2 justify-content-center my-2">
                            <button class="mybtn btn w-50" type="reset">
                                <span>RESET <i class="bi bi-trash-fill"></i></span>
                            </button>
                            <button id="btnSubmit" class="btn-success btn w-50" type="submit">
                                <span>SUBMIT <i class="bi bi-chevron-right"></i></span>
                            </button>
                    </div>
                    <p class="text-black-50 fs-7 d-flex flex-column gap-1">
                        Never submit passwords through Forms.
                         <span><a href="mailto:ctobootcamp@sjcetpalai.ac.in" class="text-black-50"><i class="bi bi-envelope"></i> &nbsp; Report an issue</a> &nbsp; | &nbsp;
                         <a href="https://iedc.sjcetpalai.ac.in" class="text-black-50">@ IEDC SJCET</a></span>
                    </p>
                </div>
                `

                //         <div class="d-flex align-items-center gap-2">
                //             <label>I AGREE TO <a class="greencolor" href="http://iedc.sjcetpalai.ac.in/EVENTS">TERMS & CONDITIONS</a> </label><input type="checkbox" name="terms" id="terms" onchange="checkBOX(this)">
                //         </div>

const querySnapshot = await getDocs(qry);
querySnapshot.forEach((doc) => {
    let data = doc.data()
    common()
    if (data.FormEndsAt > Date.now()){
        formHead.innerHTML = formTemplate(data, true)
        formBody.innerHTML = firstHalf + formInput(data) + secondHalf;
        const newCollection = collection(DB, data.collectionName);

        formBody.style.display = "block";


        const SUBMITFORM = document.getElementById('formBody');
        SUBMITFORM.addEventListener('submit',e => {
            e.preventDefault();
            openSpinner()
            console.log("Submitted")


            const formData = new FormData(SUBMITFORM);
            formData.delete('terms');//to delete entite input field
            let data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            if (data.branch === "other"){
                data.branch = data.otherBranch;
                delete data.otherBranch;
            }
            data["TimeStamp"] = Date.now();
            console.log(data)

            addDoc(newCollection, data).then((docRef) => {
                submitDone()
                let URL = "./success/#" + docRef.id;
                setTimeout(() => {
                    window.location.replace(URL);
                }, 1000);
            })
            .catch((error) => {
                submitNOTDone()
                console.error("Error adding document: ", error);
            })

        })
    }
    else
        formHead.innerHTML += formTemplate(data, false)
});

function formInput(data){
    if (data.extQ1 === "empty" && data.extQ2 === "empty" && data.extQ3 === "empty")
        return ``;
    
    let extInputs;
    if (data.extQ1 !== "empty")
        extInputs = `<input name="extQ1" type="text" maxlength="40" class="newFormField w-100" placeholder="${data.extQ1}">`
    if (data.extQ2 !== "empty")
        extInputs += `<input name="extQ2" type="text" maxlength="40" class="newFormField w-100" placeholder="${data.extQ2}">`
    if (data.extQ3 !== "empty")
        extInputs += `<input name="extQ3" type="text" maxlength="40" class="newFormField w-100" placeholder="${data.extQ3}">`

    return `<div id="extQ" class="w-100 flex-column d-flex gap-2">
                <div>
                    <label class="req">IMPORTANT DETAILS</label>
                        <p>${data.extText}</p>
                </div>
                ${extInputs}
            </div>`
}

 function formTemplate(data, isFormAlive){
    let formAlive = isFormAlive ? 
            `<p class="card-body d-flex flex-column">
                <span><i class="bi bi-stars greencolor"></i> &nbsp; 
                    Event Starts in ${timeDifference(new Date(), new Date(data.EventStartAt))}</span>
                <span><i class="bi bi-calendar-check greencolor"></i> &nbsp;
                Registration ends in
                    ${timeDifference(new Date(), new Date(data.FormEndsAt))}</span>
            </p>` 
            : `<p class="card-body d-flex flex-column">
                <span><i class="bi bi-stars greencolor"></i> &nbsp; 
                    Event Starts in ${timeDifference(new Date(), new Date(data.EventStartAt))}</span>
                <span><i class="bi bi-calendar-x-fill text-danger"></i> &nbsp; Registration closed</span>
                <a href="mailto:ctobootcamp@sjcetpalai.ac.in" class="greencolor"><i class="bi bi-envelope-fill"></i> &nbsp; Report an issue</a>
                <span></span>
            </p>`;


    return `<div class="d-flex flex-column gap-2 card shadow-lg showWidth">
                <img src=${data.ImgURL} alt="" class="card-img-top border-bottom">
                <h2 class="text-black fw-bolder card-header d-flex justify-content-between">
                    ${data.EventName}
                    <i class="bi bi-back greencolor"></i>
                </h2>
                <p class="card-body">
                    ${data.EventDescription}
                </p>
                ${formAlive}
                <!-- <div class="bg-darkGreen card-img-bottom" style="height:8px;"></div> -->
            </div>`
 }





