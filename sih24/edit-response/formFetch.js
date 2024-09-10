import { openSpinner, submitDone, submitNOTDone } from "/src/script/main.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  addDoc,
  setDoc,
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNbmkHVo6YAOk69h9OgMGbQJBUlW5xz4c",
  authDomain: "iedc-admin.firebaseapp.com",
  projectId: "iedc-admin",
  storageBucket: "iedc-admin.appspot.com",
  messagingSenderId: "200933316108",
  appId: "1:200933316108:web:8b5d08b6295d0962ec8029",
};

// Initialize Firebase app and Firestore
initializeApp(firebaseConfig);
const DB = getFirestore();
const HACKATHON = collection(DB, "sih-hackathon-24");

// Get the form element
const SUBMITFORM = document.getElementById("SUBMITFORM");

// Function to extract form data
function getData() {
  let data = {};
  const formData = new FormData(SUBMITFORM);

  // Create base object for team leader
  let teamLeader = {
    studentName: formData.get("studentName"),
    studentEmail: formData.get("studentEmail"),
    studentPhone: formData.get("studentPhone"),
    stay: formData.get("modeOfAttending"),
    gender: formData.get("gender"),
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
    member2Stay: formData.get("member2Stay"),
    member2Gender: formData.get("member2Gender"),
  };
  if (member2.member2Name) members.push(member2); // Add member2 only if name is not empty

  // Member 3
  let member3 = {
    member3Name: formData.get("member3Name"),
    member3Email: formData.get("member3Email"),
    member3Branch: formData.get("member3Branch"),
    member3Year: formData.get("member3Year"),
    member3FoodPreference: formData.get("member3FoodPreference"),
    member3Stay: formData.get("member3Stay"),
    member3Gender: formData.get("member3Gender"),
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
      member4Stay: formData.get("member4Stay"),
      member4Gender: formData.get("member4Gender"),
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
      member5Stay: formData.get("member5Stay"),
      member5Gender: formData.get("member5Gender"),
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
      member6Stay: formData.get("member6Stay"),
      member6Gender: formData.get("member6Gender"),
    }
    : { member6Name: "NA", member6Branch: "NA", member6Year: "NA" };
  if (member6.member6Name !== "NA") members.push(member6); // Add member6 if not default

  // Add cleaned-up data to final data object
  data.teamLeader = teamLeader;
  data.members = members; // List of all valid members
  data.teamName = formData.get("teamName");
  data.categoryOfProduct = formData.get("categoryOfProduct");
  data.techStack = formData.get("techStack");
  data.psCode = formData.get("psCode");
  data.psTheme = formData.get("psTheme");
  data.psTitle = formData.get("psTitle");
  data.psDescribe = formData.get("psDescribe");
  data.terms = formData.get("terms");
  data.UploadTimeStamp = Date.now();

  // Count number of members
  data.countOfMembers = members.length + 1; // Includes the team leader

  return data;
}

// Function to populate form with fetched data
function populateForm(data) {
  const { teamLeader, members, categoryOfProduct, teamName, techStack, terms, psCode,
    psTheme,
    psTitle,
    psDescribe } =
    data;

  // Team Leader details
  setInputValue("studentName", teamLeader.studentName);
  setInputValue("studentEmail", teamLeader.studentEmail);
  setInputValue("studentPhone", teamLeader.studentPhone);
  setInputValue("linkedin", teamLeader.linkedin);
  setInputValue("portfolio", teamLeader.portfolio);

  // Set radio buttons for team leader
  setRadioButton("foodPreference", teamLeader.foodPreference);
  setRadioButton("gender", teamLeader.gender);
  setRadioButton("modeOfAttending", teamLeader.stay);
  setRadioButton("fieldOfStudy", teamLeader.branch);
  setRadioButton("currentYear", teamLeader.currentYear);

  // Populate team members
  members.forEach((member, index) => {
    let memberIndex = index + 2; // Team members start from 2 to 6
    const memberDiv = document.getElementById(`member${memberIndex}`);
    console.log(member);

    if (memberDiv) {
      // Expand the member section
      memberDiv.classList.add("show");

      setInputValue(
        `member${memberIndex}Name`,
        member[`member${memberIndex}Name`]
      );
      setInputValue(
        `member${memberIndex}Email`,
        member[`member${memberIndex}Email`]
      );

      setRadioButton(
        `member${memberIndex}Branch`,
        member[`member${memberIndex}Branch`]
      );
      setRadioButton(
        `member${memberIndex}Year`,
        member[`member${memberIndex}Year`]
      );
      setRadioButton(
        `member${memberIndex}FoodPreference`,
        member[`member${memberIndex}FoodPreference`]
      );
      setRadioButton(
        `member${memberIndex}Stay`,
        member[`member${memberIndex}Stay`]
      );
      setRadioButton(
        `member${memberIndex}Gender`,
        member[`member${memberIndex}Gender`]
      );
    }
  });

  // Populate product details
  setInputValue("teamName", teamName);
  setRadioButton("categoryOfProduct", categoryOfProduct);
  setInputValue("techStack", techStack);
  setInputValue("psCode", psCode);
  setInputValue("psTheme", psTheme);
  setInputValue("psTitle", psTitle);
  setInputValue("psDescribe", psDescribe);
  // if (terms == "on") {
  //   document.getElementById("terms").checked = true;
  // } else {
  //   document.getElementById("no-terms").checked = true;
  // }
}

// Helper function to set input value
function setInputValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.value = value || "";
  }
}

// Helper function to set radio button
function setRadioButton(name, value) {
  if (value) {
    const radio = document.querySelector(
      `input[name="${name}"][value="${value}"]`
    );
    if (radio) {
      radio.checked = true;
    }
  }
}

// ... (rest of the code remains the same)
// Handle form submission
SUBMITFORM.addEventListener("submit", async (e) => {
  e.preventDefault();
  openSpinner();
  console.log("Form submitted");

  try {
    const formData = getData();
    const docId = document.getElementById("docId").value;

    if (docId) {
      // Update existing document
      const docRef = doc(DB, "sih-hackathon-24", docId);
      const collectionRefSelected = doc(DB, "sih-hackathon-selected-24", docId);

      await setDoc(collectionRefSelected, formData).then(() => {
        updateDoc(docRef, formData).then(() => {
          submitDone();
        });
      });
    } else {
      // Create new document
      // await addDoc(HACKATHON, formData);
      console.log("Form data:", formData);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    submitNOTDone();
  } finally {
    // openSpinner(false);
  }
});

// Fetch data on button click
document.getElementById("submitBtn").addEventListener("click", async () => {
  const docId = document.getElementById("docId").value;

  if (!docId) {
    alert("Please enter a document ID!");
    return;
  }

  // openSpinner();

  try {
    const docRef = doc(DB, "sih-hackathon-24", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      populateForm(docSnap.data());
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
      alert("No such document found!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    alert("Failed to fetch document.");
  } finally {
    // openSpinner(false);
  }
});

function isVisible(element) {
  return document.getElementById(element).classList.contains("show");
}

const search = new URLSearchParams(window.location.href.split("?")[1]);
if (search.get("id")) {
  document.getElementById("fetchDataDiv").style.display = "none";
  const secretIdInput = document.querySelector("#docId");
  secretIdInput.value = search.get("id");
  const dataFetchButton = document.getElementById("submitBtn");
  dataFetchButton.click();
}
