// 변수설정
let btnCall = document.querySelector('.btnCall');
let menuMo = document.querySelector('.menuMo');

btnCall.addEventListener('click', (e) => {
	e.preventDefault();
	// a태그가 가지고있는 기본 이벤트를 막아줌(링크이동X)
	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
});
