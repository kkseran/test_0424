// 키 : 192e9539d6e5c6edba197c04a566bb64
// 비밀 : ebf65a038802e809

// http, get : 요청할 때 마다 화면이 새로고침되어 ux(사용자 편의성)가 떨어짐
// ajax : js코드로 비동기적으로 부드럽게 화면전환하여 데이터를 불러오는 요청방법

/*
1. 독립적으로 동작하는 함수 => 함수(function)
2. (객체에)의존적으로 동작하는 함수 => 메소드(method)
내장 함수 : 자바스크립트 내부에서 이미 생성된 (객체안에 들어있지않은)함수
    - ex : fetch();
내장 메소드 : 자바스크립트 내부에서 이미 생성된 객체안에 있는 종속적인 함수
(커스텀) 함수 : function 키워드로 생성한 기명, 무기명함수 전체
(커스텀) 메소드 : 객체를 생성하고 객체안에 함수를 종속시켜 만든 함수 전체
    - ex : 플러그인(스와이퍼js) 등
*/

// 동작하고자 하는 DOM요소를 변수에 넣어야 함
let body = document.querySelector('body');
let frame = document.querySelector('#list');
let base = 'https://www.flickr.com/services/rest/?';
let method1 = 'flickr.interestingness.getList';
let key = '192e9539d6e5c6edba197c04a566bb64';
let per_page = 40;
let url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
// -> rest api요청방법

// ()안에 매개변수로 url(데이터주소)을 넣어줌 : http요청 or get요청을 씀
// but. http, get 요청은 동기적 요청이므로 비동기적 요청이 필요함
// --> fetch안에 url을 요청하게되면 비동기적인 요청이 일어나서 부드러운 화면전환과 데이터 호출이 가능해짐.
fetch(url)
	.then((data) => {
		// console.log(data);
		let result = data.json();
		// console.log(result);
		return result;
	})
	.then((json) => {
		// console.log(json);
		let items = json.photos.photo;
		console.log(items);
		let htmls = '';
		items.map((el, index) => {
			console.log(el);
			// 썸네일이미지(작은이미지) 주소
			let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
			// 실제(큰)이미지 주소
			let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
			// console.log(imgSrc);

			htmls += `
            <li class="item">
				<div>
					<a href=${imgSrcBig} target="_blank">
						<img src=${imgSrc} alt=${el.title}>
					</a>
					<p>${el.title}</p>
				</div>
			</li>
            `;
		});
		frame.innerHTML = htmls;

		// 이미지로딩의 시간을 벌어줄 예정
		// 동적으로 생성된 이미지태그의 전체 갯수를 구합니다.
		//
	});
