let btnCall = document.querySelector('.btnCall');
let menuMo = document.querySelector('manuMo');

btnCall.addEventListener('click', (e) => {
	e.preventDefault();
	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
});
