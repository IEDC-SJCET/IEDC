import { openSpinner, submitDone, submitNOTDone } from "/src/script/main.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  addDoc,
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";

// import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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
const HACKATHON = collection(DB, "sih-hackathon-24");
// const storage = getStorage();

// var file;
// var file_name;
// formData.delete('terms');//to delete entite input field
// let data = {};

const SUBMITFORM = document.getElementById("SUBMITFORM");

function getData() {
  let data = {};
  const formData = new FormData(SUBMITFORM);

  // Create base object for team leader
  let teamLeader = {
    studentName: formData.get("studentName"),
    studentEmail: formData.get("studentEmail"),
    studentPhone: formData.get("studentPhone"),
    stay: formData.get("modeOfAttending"),
    branch: formData.get("fieldOfStudy"),
    currentYear: formData.get("currentYear"),
    linkedin: formData.get("linkedin"),
    portfolio: formData.get("portfolio"),
    foodPreference: formData.get("foodPreference"),
  };

  // Clean up empty fields in teamLeader
  teamLeader = Object.fromEntries(
    Object.entries(teamLeader).filter(
      ([_, value]) => value && value.trim() !== ""
    )
  );

  let members = [];

  // Member 2
  let member2 = {
    member2Name: formData.get("member2Name"),
    member2Email: formData.get("member2Email"),
    member2Branch: formData.get("member2Branch"),
    member2Year: formData.get("member2Year"),
    member2FoodPreference: formData.get("member2FoodPreference"),
  };
  if (member2.member2Name) members.push(member2); // Add member2 only if name is not empty

  // Member 3
  let member3 = {
    member3Name: formData.get("member3Name"),
    member3Email: formData.get("member3Email"),
    member3Branch: formData.get("member3Branch"),
    member3Year: formData.get("member3Year"),
    member3FoodPreference: formData.get("member3FoodPreference"),
  };
  if (member3.member3Name) members.push(member3); // Add member3 only if name is not empty

  // Member 4
  let member4 = isVisible("member4")
    ? {
        member4Name: formData.get("member4Name"),
        member4Email: formData.get("member4Email"),
        member4Branch: formData.get("member4Branch"),
        member4Year: formData.get("member4Year"),
        member4FoodPreference: formData.get("member4FoodPreference"),
      }
    : { member4Name: "NA", member4Branch: "NA", member4Year: "NA" };
  if (member4.member4Name !== "NA") members.push(member4); // Add member4 if not default

  // Member 5
  let member5 = isVisible("member5")
    ? {
        member5Name: formData.get("member5Name"),
        member5Email: formData.get("member5Email"),
        member5Branch: formData.get("member5Branch"),
        member5Year: formData.get("member5Year"),
        member5FoodPreference: formData.get("member5FoodPreference"),
      }
    : { member5Name: "NA", member5Branch: "NA", member5Year: "NA" };
  if (member5.member5Name !== "NA") members.push(member5); // Add member5 if not default
  // Member 6
  let member6 = isVisible("member6")
    ? {
        member6Name: formData.get("member6Name"),
        member6Email: formData.get("member6Email"),
        member6Branch: formData.get("member6Branch"),
        member6Year: formData.get("member6Year"),
        member6FoodPreference: formData.get("member6FoodPreference"),
      }
    : { member6Name: "NA", member6Branch: "NA", member6Year: "NA" };
  if (member6.member6Name !== "NA") members.push(member6); // Add member6 if not default

  // Add cleaned-up data to final data object
  data.teamLeader = teamLeader;
  data.members = members; // List of all valid members
  data.teamName = formData.get("teamName");
  data.categoryOfProduct = formData.get("categoryOfProduct");
  data.techStack = formData.get("techStack");
  data.terms = formData.get("terms");
  data.UploadTimeStamp = Date.now();

  // Count number of members
  data.countOfMembers = members.length + 1; // Includes the team leader

  return data;
}

SUBMITFORM.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");

  openSpinner();

  let data = getData();

  // Validating LinkedIn and portfolio URLs

  if (
    data.teamLeader.linkedin &&
    data.teamLeader.linkedin.split(".").length <= 1
  ) {
    submitNOTDone();
    alert("LinkedIn URL is not valid");
    return false;
  }

  if (
    data.teamLeader.portfolio &&
    data.teamLeader.portfolio.split(".").length <= 1
  ) {
    submitNOTDone();
    alert("Portfolio URL is not valid");
    return false;
  }

  console.log(data);

  // Example Firebase logic to save data (uncomment when using Firebase)
  addDoc(HACKATHON, data)
    .then((docRef) => {
      let URL = "./success/#" + docRef.id;
      setTimeout(() => {
        window.location.replace(URL);
      }, 1000);
      submitDone();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      submitNOTDone();
    });

  // });
});

function isVisible(element) {
  return document.getElementById(element).classList.contains("show");
}
