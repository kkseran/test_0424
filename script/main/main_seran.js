let btnCall = document.querySelector('.btnCall');

function openclose() {
	let menuMo = document.querySelector('.menuMo');
	if (menuMo.style.left === '-270px') {
		menuMo.style.left = '0px';
		btnCall.classList.add('on');
	} else {
		menuMo.style.left = '-270px';
		btnCall.classList.remove('on');
	}
}

btnCall.addEventListener('click', openclose);
