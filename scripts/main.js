const pageCover = document.querySelector('.page-cover');

const goLogin = () => {
  pageCover.classList.remove('page-cover--init');
  pageCover.classList.remove('page-cover--right');
  pageCover.classList.add('page-cover--left');
};

const goSignUp = () => {
  pageCover.classList.remove('page-cover--init');
  pageCover.classList.add('page-cover--right');
  pageCover.classList.remove('page-cover--left');
};

document.querySelector('#go-login').addEventListener('click', goLogin);
document.querySelector('#go-signup').addEventListener('click', goSignUp);
