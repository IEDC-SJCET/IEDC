const submitBTN = document.getElementById('btnSubmit');
export const openSpinner = () => {    
    submitBTN.innerHTML = `Uploading <div class="spinner-border spinner-border-sm" role="status">
                            </div>`;
    submitBTN.disabled = true;
}

export const submitDone = () => {
    submitBTN.innerHTML = `Uploaded <i class="bi bi-check2"></i>`;
    submitBTN.disabled = false;
}
export const submitNOTDone = () => {
    submitBTN.innerHTML = `Upload failed <i class="bi bi-x"></i>`;
    submitBTN.disabled = false;
}