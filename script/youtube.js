// AIzaSyBUOCxCOPILmnFIM5-h5jjQhoqGKFnvFnU
// https://www.googleapis.com/youtube/v3/playlistItems
// PL4P8Dv_rpsNwo0cm5Xh6w3K3JzTVSOcku&index=3

let vidList = document.querySelector('.vidList');
let key = 'AIzaSyBUOCxCOPILmnFIM5-h5jjQhoqGKFnvFnU';
let playListId = 'PL4P8Dv_rpsNwo0cm5Xh6w3K3JzTVSOcku&index=3';
let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=6`;

fetch(url)
	.then((data) => {
		console.log(data);
		return data.json();
	})
	.then((json) => {
		console.log(json);
		let items = json.items;
		// json.items : 배열의 형태로 데이터들을 불러옴
		let result = '';
		items.map((el) => {
			// 데이터를 편집해서 필요크기만 사용하도록

			// 글자 수로 자르는 방법
			// let title = el.snippet.title;
			// if (title.length > 30) title = title.substr(0, 30) + '...';
			let des = el.snippet.description;
			if (des.length > 50) des = des.substr(0, 50) + '...';

			// 기준이 되는 글자를 정해서 자르는 방법
			let title = el.snippet.title;
			title = title.split('(')[0];
			title = title.split(']')[1];
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];
			// console.log(date.split('T'));

			result += `<article>
            <a href=${el.snippet.resourceId.videoId} class='pic'>
                <img src='${el.snippet.thumbnails.medium.url}' alt='' />
            </a>
            <div class='con'>
                <h2>${title}</h2>
                <p>${des}</p>
                <span>${date}</span>
            </div>
        </article>`;
			// console.log(result);
			vidList.innerHTML = result;
		});
	});

// let article = document.querySelectorAll('.vidList article');
// console.log(article);
// 동적DOM으로 생성한 요소는 쿼리셀렉터로 찾을 수 없음

// 동적DOM으로 생성한 요소에 이벤트를 부여하려면?
// js가 데이터를 fetch로 요청하고, 데이터가 오기까지 기다렸다가 이후에 js코딩을 해석하는 것이 아니라
// 10번줄에서 fetch로 데이터를 요청하고 11번에서 데이터를 받기전에 이미 51번의 아티클을 쿼리셀렉터로 검색하는 코드를 실행함.
// 따라서 데이터를 받아야 동적 DOM이 생성되는 것 이므로, 해당 아티클은 존재하지않는 DOM인 것. => 이벤트를 부여할 수 없음

// 이벤트 위임(버블링) : 이벤트가 발생하면 부모요소에서 자식요소로 이벤트가 전파되는 현상(반대로도 가능)
// ---> 동적 DOM 요소에 이벤트를 부여할 수 없는 문제를 이벤트위임으로 해결(부모요소에 이벤트 부여)

vidList.addEventListener('click', (e) => {
	e.preventDefault();
	// 이벤트가 무분별하게 발생하는 현상을 막는 코드

	/* 돔 탐색에는 하향식, 상향식 두 가지 방향이 있음
	하향식 : querySelector 등
	상향식 : closest 등
--> 보통은 하향식으로 탐색하지만 특수상황, 상태, 미래시등의 경우
	해당요소에서부터 찾는 상향식 탐색법이 정확함
	*/

	/* 이벤트 위임으로 코딩하게되면 부모영역(vidList) 전체에 이벤트가 발생 - 콘솔에러 */
	/* 따라서 이벤트를 정확하게 img(a)태그를 클릭했을때만 발생하도록 해야 함 */
	if (!e.target.closest('a')) return;
	// 만약 클릭한 대상이 a태그가 아니면 rethrn

	let vidId = e.target.closest('a').getAttribute('href');
	// 클릭한 target의 가까운 a태그를 찾아서 href 속성을 가져오는 코드
	console.log(vidId);
	// 동적DOM으로 팝업창 생성
	let pop = document.createElement('figure');
	// 가상메모리에서 figure태그를 생성
	pop.classList.add('pop');

	pop.innerHTML = `
	<iframe src='https://www.youtube.com/embed/${vidId}'
		frameborder='0' width='100%' height='100%'
	></iframe>
	<span class='btnClose'>CLOSE</span>
	`;
	vidList.append(pop);
});

// close버튼 코딩
// let close = document.querySelector('.btnClose');
// close버튼도 동적DOM이기때문에 쿼리셀렉터로 탐색 불가

vidList.addEventListener('click', (e) => {
	// 클로즈버튼도 vidList에 이벤트위임으로 해결해야하는데,
	// .pop이 만들어져야 생성되는 2중 동적DOM의 산물이기때문에 코드가 충돌함
	// ---> 이럴때 '조건문'으로 해결 가능 / 즉, .pop이 존재하는지를 조건문으로 물어보면 해결
	let pop = vidList.querySelector('.pop');
	// pop이라는변수는 현재 찾을 수 없는 값이지만 img(a)를 클릭해서 팝업이 생성되면 그 순간 존재하는 요소가 됨
	if (pop) {
		let close = pop.querySelector('.btnClose');
		if (e.target == close) pop.remove();
	}
});
