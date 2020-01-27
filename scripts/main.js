const DEFAULT_REDIRECT_URL = 'https://inha-ice.github.io/';
const SERVER_URL = 'http://home.astro36.me:3000';

const buttonGoLogin = document.querySelector('#go-login');
const buttonGoSignUp = document.querySelector('#go-signup');
const buttonLogin = document.querySelector('#login');
const buttonSignUp = document.querySelector('#signup');
const checkboxTerms = document.querySelector('#check-terms');
const checkboxPrivacyPolicy = document.querySelector('#check-privacy-policy');
const pageWrapper = document.querySelector('.page-wrapper');
const pageCover = document.querySelector('.page-cover');
const textLoginId = document.querySelector('#login-id');
const textLoginPassword = document.querySelector('#login-password');
const textSignUpId = document.querySelector('#signup-id');
const textSignUpName = document.querySelector('#signup-name');
const textSignUpPassword = document.querySelector('#signup-password');
const textSignUpPasswordRepeat = document.querySelector('#signup-password-repeat');

const isUserId = (text) => /^\d{8}$/.test(text);
const isUserName = (text) => text.length <= 50;
const isPassword = (text) => text.length >= 4;

const goLogin = () => {
  pageCover.classList.remove('page-cover--init');
  pageCover.classList.remove('page-cover--right');
  pageCover.classList.add('page-cover--left');
  pageWrapper.scrollLeft = 10000;
};

const goSignUp = () => {
  pageCover.classList.remove('page-cover--init');
  pageCover.classList.add('page-cover--right');
  pageCover.classList.remove('page-cover--left');
  pageWrapper.scrollLeft = 0;
};

const postData = (url, data) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const popup = (message) => {
  console.log(message);
  alert(message);
};

const redirect = () => {
  const params = new URLSearchParams(window.location.search);
  const url = params.get('redirect_url') || DEFAULT_REDIRECT_URL;
  window.location.href = url;
};

const login = async () => {
  const id = textLoginId.value;
  const password = textLoginPassword.value;
  if (id && isUserId(id) && password && isPassword(password)) {
    const res = await postData(`${SERVER_URL}/auth`, { id, password });
    if (res.ok) {
      popup('Login Success');
      redirect();
    } else {
      const body = await res.json();
      popup(`Login Error: ${body.message}`);
    }
  } else {
    popup('Login Error: The given id or password is invalid');
  }
};

const signUp = async () => {
  const id = textSignUpId.value;
  const name = textSignUpName.value;
  const password = textSignUpPassword.value;
  const passwordRepeat = textSignUpPasswordRepeat.value;
  const checkTerms = checkboxTerms.checked;
  const checkPrivacyPolicy = checkboxPrivacyPolicy.checked;
  if (checkTerms && checkPrivacyPolicy) {
    if (
      id && isUserId(id) && name && isUserName(name)
      && password && isPassword(password) && password === passwordRepeat
    ) {
      const res = await postData(`${SERVER_URL}/users`, { id, name, password });
      if (res.ok) {
        popup('Sign Up Success');
        redirect();
      } else {
        const body = await res.json();
        popup(`Sign Up Error: ${body.message}`);
      }
    } else {
      popup('Sign Up Error: The required data is missing');
    }
  } else {
    popup('Sign Up Error: All checkboxes are not checked');
  }
};

buttonGoLogin.addEventListener('click', goLogin);
buttonGoSignUp.addEventListener('click', goSignUp);
buttonLogin.addEventListener('click', login);
buttonSignUp.addEventListener('click', signUp);
