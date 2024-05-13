let btnCall = document.querySelector('.btnCall');
let menuMo = document.querySelector('.menuMo');

btnCall.addEventListener('click', (e) => {
	e.preventDefault();
	// e : event 객체 (=btnCall(a태그))
	// preventDefault() : 기본값방지
	// ---> a태그의 기본 (링크)기능을 없앰
	btnCall.classList.toggle('on');
	// toggle 같은 곳을 클릭 할 때
	// add, remove 다른 곳을 클릭 할 때
	menuMo.classList.toggle('on');
});
