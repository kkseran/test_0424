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
			let title = el.snippet.title;
			if (title.length > 30) title = title.substr(0, 30) + '...';
			let des = el.snippet.description;
			if (des.length > 50) des = des.substr(0, 50) + '...';

			// 기준이 되는 글자를 정해서 자르는 방법
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];
			console.log(date.split('T'));

			result += `<article>
            <a href='https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}&list=PL4P8Dv_rpsNwo0cm5Xh6w3K3JzTVSOcku' target="_blank" class='pic'>
                <img src='${el.snippet.thumbnails.medium.url}' alt='' />
            </a>
            <div class='con'>
                <h2>${title}</h2>
                <p>${des}</p>
                <span>${date}</span>
            </div>
        </article>`;
			console.log(result);
			vidList.innerHTML = result;
		});
	});
