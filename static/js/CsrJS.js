const character = document.getElementById('character');

window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});



document.getElementById('excelInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    alert("선택한 파일: " + file.name);
    // 여기서 파일을 서버로 전송하거나, 파싱 라이브러리(XLSX.js 등)로 처리 가능
  }
});


var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(36.34849732974174, 127.38215396431515), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴