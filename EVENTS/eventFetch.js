import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";

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

let collider =
  window.innerWidth < 768
    ? "collapse img-fluid"
    : "collapse-horizontal show collapse img-fluid";
let valid = {
  btnBG: "",
  btnCOLOR: "greencolor",
  btnText: "Reg Now",
  icon: "bi bi-chevron-right",
};
let invalid = {
  btnBG: "",
  btnCOLOR: "text-black-50",
  btnText: "Expired",
  icon: "bi bi-clock",
};

const templete = (data, i) => {
  let validity = data.LinkExpireAt > Date.now() ? valid : invalid;
  let EventDate = new Date(data.EventStartsAt);
  data.Description = data.Description.toString().replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  );
  let collapseTarget = "EventBody" + i.toString();
  return `
            <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <div class="boxDesign">
                    <a data-bs-toggle="collapse" aria-expanded="true" data-bs-target="#${collapseTarget}" aria-controls="${collapseTarget}">
                        <img src=${
                          data.IMG_URL
                        } alt="EventIMG" class="img-fluid rounded-3" style="height: 400px; width: 100%; object-fit: cover">
                    </a>
                </div>
                <div class="card shadow-lg text-black ${collider} boxDesign" id="${collapseTarget}">
                    <div class="fs-4 fw-bold text-black card-header">${
                      data.EventName
                    }</div>
                    <div class="fs-7 text-black-50 fw-bolder card-body p-1 px-3">
                        <p>${data.Description}</p><br>
                        <p>Venue: ${data.EventVenue}</p>
                        <p>Date: ${EventDate.getDate()} - ${
    EventDate.getMonth() + 1
  } - ${EventDate.getFullYear()}</p>
                    </div>
                    <div class="card-footer ${validity.btnBG} text-end">
                    <a href=${data.RedirectLink} class="${
    validity.btnCOLOR
  } py-2 fs-6 fw-bold">
                        ${validity.btnText} <i class="${validity.icon}"></i>
                    </a>
                    </div>
                </div>
            </div>
            `;
};

const EVENTS = collection(DB, "EVENTS");
const qry = query(EVENTS, orderBy("EventStartsAt", "desc"));
const eventContainer = document.getElementById("eventSECTION");
eventContainer.innerHTML = "";
const querySnapshot = await getDocs(qry);
let i = 1;
querySnapshot.forEach((doc) => {
  let data = doc.data();
  eventContainer.innerHTML += templete(data, i);
  i++;
});
