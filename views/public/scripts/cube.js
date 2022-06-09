
const forgotPass = document.querySelector(`.forgot-pass`);
const newUser = document.querySelector(`.sign_up-link--button`);

const forgotPassSide = document.querySelector('.cube__face--right');
forgotPass.addEventListener('click', () => {
    forgotPassSide.classList.add(`show-left`);
})