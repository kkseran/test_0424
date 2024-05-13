// 050ac3b68013cf1cfd5ebb60c2528615

var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.4868302, 126.7829877), //지도의 중심좌표.
	level: 2, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var marker = new kakao.maps.Marker();

// 타일 로드가 완료되면 지도 중심에 마커를 표시합니다
kakao.maps.event.addListener(map, 'tilesloaded', displayMarker);

function displayMarker() {
	// 마커의 위치를 지도중심으로 설정합니다
	marker.setPosition(map.getCenter());
	marker.setMap(map);

	// 아래 코드는 최초 한번만 타일로드 이벤트가 발생했을 때 어떤 처리를 하고
	// 지도에 등록된 타일로드 이벤트를 제거하는 코드입니다
	// kakao.maps.event.removeListener(map, 'tilesloaded', displayMarker);
}
