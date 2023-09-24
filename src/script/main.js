export const openSpinner = () => {    
    const submitBTN = document.getElementById('btnSubmit');
    submitBTN.innerHTML = `Uploading <div class="spinner-border spinner-border-sm" role="status">
                            </div>`;
    submitBTN.disabled = true;
}

export const submitDone = () => {
    const submitBTN = document.getElementById('btnSubmit');
    submitBTN.innerHTML = `Uploaded <i class="bi bi-check2"></i>`;
    submitBTN.disabled = true;
}
export const submitNOTDone = () => {
    const submitBTN = document.getElementById('btnSubmit');
    submitBTN.innerHTML = `Upload failed <i class="bi bi-x-lg"></i>`;
    submitBTN.disabled = false;
}

export function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = -(current - previous);

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years';   
    }
}

export function common(){
        document.getElementById("loader").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
        console.log("done loading");
}