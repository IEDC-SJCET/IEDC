import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";
import { openSpinner, submitDone, submitNOTDone } from "./main.js";
const firebaseConfig = {
  apiKey: "AIzaSyCNbmkHVo6YAOk69h9OgMGbQJBUlW5xz4c",
  authDomain: "iedc-admin.firebaseapp.com",
  projectId: "iedc-admin",
  storageBucket: "iedc-admin.appspot.com",
  messagingSenderId: "200933316108",
  appId: "1:200933316108:web:8b5d08b6295d0962ec8029",
};
initializeApp(firebaseConfig);
const DB = getFirestore();
const EVENTS = collection(DB, "EVENTS");
const FEEDBACK = collection(DB, "FEEDBACK");

let valid = {
  btn: "btn-success px-4",
  btnText: "Reg Now",
  icon: "bi bi-chevron-right",
};
let invalid = {
  btn: "mybtn px-4",
  btnText: "Expired",
  icon: "bi bi-clock",
};

const homeEventTemplate = (data) => {
  let validity = data.LinkExpireAt > Date.now() ? valid : false;

  if (validity) {
    let EventDate = new Date(data.EventStartsAt);
    data.Description = data.Description.toString().replace(
      /(?:\r\n|\r|\n)/g,
      "<br>"
    );
    return `<div class="d-flex w-100 flex-column flex-md-row justify-content-center align-items-center gap-3">
                        <div class="boxDesign">
                            <img src=${
                              data.IMG_URL
                            } alt="EventIMG" style="height: 400px; width: 100%; object-fit: cover" class="img-fluid rounded-3">
                        </div>
                        <div class="card shadow-lg text-black boxDesign img-fluid">
                            <div class="fs-4 fw-bold text-black card-header d-flex align-items-center gap-2">${
                              data.EventName
                            }
                                <div class="spinner-grow text-danger spinner-grow-sm" role="status"></div>
                            </div>
                            <div class="fs-7 text-black-50 fw-bolder card-body p-1 px-3">
                                <p>${data.Description}</p><br>
                                <p>Venue: ${data.EventVenue}</p>
                                <p>Date: ${EventDate.getDate()} - ${
      EventDate.getMonth() + 1
    } - ${EventDate.getFullYear()}</p>
                            </div>
                            <div class="card-footer text-end">
                            <a href=${
                              data.RedirectLink
                            } class="btn btn-success px-4 fs-6 fw-bold">
                                Reg Now <i class="bi bi-chevron-right"></i>
                            </a>
                            </div>
                        </div>
                    </div>
                `;
  } else return -1;
};

const Aqry = query(EVENTS, orderBy("EventStartsAt", "desc"));
const homeEventContainer = document.getElementById("homeEvent");

const AquerySnapshot = await getDocs(Aqry);
AquerySnapshot.forEach((doc) => {
  let data = doc.data();
  let returnEvent = homeEventTemplate(data);
  if (returnEvent != -1) {
    homeEventContainer.innerHTML = `<h2 class="text-black fw-bold text-center fs-2" data-aos="fade-up" data-aos-duration="1200">
    BOOTCAMP LIVE <span class="greencolor">EVENT<i class="bi bi-thunder"></i></span> 
</h2>`;
    homeEventContainer.innerHTML += returnEvent;
  }
});

const templete = (i, data) => {
  let validity = data.LinkExpireAt > Date.now() ? valid : invalid;
  let display = i > 3 ? "d-none d-md-block" : " ";
  return `<div class="Event${i} bg-white card  border ${display}">
                <div class="card-img">
                    <img src=${data.IMG_URL} alt="" srcset=""
                    class="img-fluid m-auto">
                </div>
                <div class="card-img-overlay eventIMGoverlay rounded-0 d-flex flex-column">
                    <a href = ${data.RedirectLink} class=" m-auto mb-4 btn ${validity.btn} rounded-5 border">${validity.btnText} &nbsp;<i class="${validity.icon}"></i></a>
                </div>
            </div>`;
};

const qry = query(EVENTS, orderBy("EventStartsAt", "desc"));
const container5 = document.getElementById("container5");
window.addEventListener("load", async function () {
  const querySnapshot = await getDocs(qry);
  let i = 1;
  container5.innerHTML = "";
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (i < 6) {
      container5.innerHTML += templete(i, data);
    }
    i++;
  });
});

const feedbackFORM = document.getElementById("feedbackFORM");
feedbackFORM.addEventListener("submit", (e) => {
  e.preventDefault();
  openSpinner();
  addDoc(FEEDBACK, {
    name: feedbackFORM.name.value,
    email: feedbackFORM.email.value,
    feedback: feedbackFORM.feedback.value,
    UploadTimeStamp: Date.now(),
  })
    .then(() => {
      feedbackFORM.reset();
      submitDone();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      submitNOTDone();
    });
});
