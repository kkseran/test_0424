// 050ac3b68013cf1cfd5ebb60c2528615

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.4868302, 126.7829877), //지도의 중심좌표.
	level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
let branchBtn = document.querySelectorAll('.branch li');
let trafficOnBtn = document.querySelectorAll('.traffic li')[1];
let trafficOffBtn = document.querySelectorAll('.traffic li')[0];

// 객체 {} : 성격이 다른 내용을 묶는 자료형태, 배열 [] : 성격이 같은 내용을 묶는 자료형태
let markerOptions = [
	{
		title: '본점', // 제목
		lating: new kakao.maps.LatLng(37.4868302, 126.7829877), // 지도(마커 포지션)의 위치
		imgSrc: '../img/marker1.png', // 마커이미지 경로(location.html 기준으로 작성)
		imgSize: new kakao.maps.Size(232, 99), // 마커이미지 사이즈
		imgPosition: { offset: new kakao.maps.Point(116, 69) }, // 마커에서 이미지의 위치
		// x축은 이미지사이즈의 절반(116), y축은 임의 조절
		button: branchBtn[0], // 마커와 매치시킬 버튼의 인덱스
	},
	{
		title: '지점1',
		lating: new kakao.maps.LatLng(37.5240628, 126.8048386),
		imgSrc: '../img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPosition: { offset: new kakao.maps.Point(116, 69) },
		button: branchBtn[1],
	},
	{
		title: '지점2',
		lating: new kakao.maps.LatLng(37.504277, 126.7620249),
		imgSrc: '../img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPosition: { offset: new kakao.maps.Point(116, 69) },
		button: branchBtn[2],
	},
];

markerOptions.forEach((el, index) => {
	let marker = new kakao.maps.Marker({
		map: map, // 앞의 map은 marker 함수의 키이름이고, 뒤의 map은 10번줄의 map
		position: el.lating, // 지도의 위치, 위도경도의 값. markerOptions 변수의 lating 값
		title: el.title,
		image: new kakao.maps.MarkerImage(el.imgSrc, el.imgSize, el.imgPosition),
	});

	// 버튼을 클릭했을때 해당위치로 이동 및 해당버튼 활성화
	el.button.addEventListener('click', () => {
		// 버튼활성화부터
		branchBtn.forEach((el) => {
			el.classList.remove('on');
		});
		el.button.classList.add('on');

		map.setCenter(el.lating);
	});
});

trafficOnBtn.addEventListener('click', () => {
	if (trafficOnBtn.classList.contains('on')) return;
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	trafficOffBtn.classList.remove('on');
	trafficOnBtn.classList.add('on');
});
trafficOffBtn.addEventListener('click', () => {
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	trafficOnBtn.classList.remove('on');
	trafficOffBtn.classList.add('on');
});
