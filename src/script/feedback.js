import { openSpinner, submitDone, submitNOTDone } from "./script.js";
import { addDoc  } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';
import { FEEDBACK } from './eventFetch.js';




const feedbackFORM = document.getElementById('feedbackFORM');
feedbackFORM.addEventListener('submit',e => {
        e.preventDefault();
        openSpinner();
        addDoc(FEEDBACK, {
                    name: feedbackFORM.name.value,
                    email: feedbackFORM.email.value,
                    feedback: feedbackFORM.feedback.value,
                    UploadTimeStamp: Date.now()
                }).then(() => {
                    feedbackFORM.reset();
                    submitDone();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    submitNOTDone();
                });
})