const MODAL_ACTIVE_CLASS_NAME = 'modal-active';
const MODAL_ERROR_VALUE = 'input-error';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#form');

const openFormModalBtn = document.querySelector('#open-form-modal-btn');
const launchBtn = document.querySelector('#launch-btn');
const closeBtns = document.querySelectorAll('.close-tab');

const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

openFormModalBtn.addEventListener('click', () => {
    formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
})

const closeFormModal = () => {
    formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
    userName.value = '';
    userEmail.value = '';
};

const closeSuccessModal = () => {
    successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
    userName.value = '';
    userEmail.value = '';
};

const openSuccessModal = () => {
    successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
};

closeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        closeFormModal();
        closeSuccessModal();
    })
})


form.addEventListener('submit', e => {
    // if(userName.value === '' || userEmail.value === ''){
    //     userName.classList.add(MODAL_ERROR_VALUE);
    //     userEmail.classList.add(MODAL_ERROR_VALUE);
    // } else {
    //     userName.classList.remove(MODAL_ERROR_VALUE);
    //     userEmail.classList.remove(MODAL_ERROR_VALUE);
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        closeFormModal();
        setTimeout(openSuccessModal, 700);
        setTimeout(closeSuccessModal, 3000);
      })
      .catch((error) => console.log('Sending form failed'));
    // }
})

