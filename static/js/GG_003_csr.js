const character = document.getElementById('character');

window.addEventListener('mousemove', (e) => {
  character.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

let siteNames = [];

var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(36.348504088450035, 127.38215399734425),
        level: 3
    };
var map = new kakao.maps.Map(mapContainer, mapOption);
var geocoder = new kakao.maps.services.Geocoder();

var clickedPosition = null;
var tempMarker = null;

var markers = [];
var infowindows = [];

var selectedMarker = null;
var selectedInfowindow = null;

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    clickedPosition = mouseEvent.latLng;

    geocoder.coord2Address(clickedPosition.getLng(), clickedPosition.getLat(), function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            document.getElementById('search-input2').value = result[0].address.address_name;
        }
    });

    document.getElementById('search-input1').value = '';
    document.getElementById('search-input3').value = '';

    // 위도/경도 히든 필드에 저장
    document.getElementById('latitude').value = clickedPosition.getLat();
    document.getElementById('longitude').value = clickedPosition.getLng();

    if (tempMarker) tempMarker.setMap(null);

    tempMarker = new kakao.maps.Marker({
        position: clickedPosition,
        map: map,
        opacity: 0.5,
        clickable: false
    });
});

document.getElementById('Button1').addEventListener('click', function() {
    var siteName = document.getElementById('search-input1').value || '건설현장';
    var address = document.getElementById('search-input2').value;

    if (!siteName || !address) {
        alert("현장명과 주소를 입력해주세요.");
        return;
    }

    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            if (markers.some(m => m.marker.getPosition().equals(coords))) {
                alert("이미 등록된 위치입니다.");
                return;
            }

            var markerImage = new kakao.maps.MarkerImage(
                '/static/img/hammer.png',
                new kakao.maps.Size(40, 40)
            );

            var marker = new kakao.maps.Marker({
                position: coords,
                map: map,
                image: markerImage
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + siteName + '</div>'
            });
            infowindow.open(map, marker);
            infowindows.push(infowindow);

            siteNames.push(siteName);

            markers.push({
                marker: marker,
                siteName: siteName,
                address: address
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                openMarker(marker);
            });

            map.setCenter(coords);

            if (tempMarker) {
                tempMarker.setMap(null);
                tempMarker = null;
            }

            clickedPosition = null;
            document.getElementById('search-input1').value = '';
            document.getElementById('search-input2').value = '';
        } else {
            alert("주소를 찾을 수 없습니다.");
        }
    });
});

function openMarker(marker) {
    var markerData = markers.find(m => m.marker === marker);
    if (!markerData) return;

    geocoder.coord2Address(marker.getPosition().getLng(), marker.getPosition().getLat(), function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            document.getElementById('search-input2').value = result[0].address.address_name;
        }
    });

    document.getElementById('search-input1').value = markerData.siteName;

    if (selectedMarker) {
        selectedMarker.setImage(new kakao.maps.MarkerImage(
            '/static/img/hammer.png',
            new kakao.maps.Size(40, 40)
        ));
        selectedInfowindow?.close();
    }

    selectedMarker = marker;
    selectedInfowindow = infowindows[markers.indexOf(markerData)];
    marker.setImage(new kakao.maps.MarkerImage(
        '/static/img/hammer.png',
        new kakao.maps.Size(50, 50)
    ));
    selectedInfowindow.open(map, marker);
}

document.getElementById('ButtonDelete').addEventListener('click', function() {
    if (selectedMarker) {
        selectedMarker.setMap(null);
        if (selectedInfowindow) selectedInfowindow.close();

        var index = markers.findIndex(m => m.marker === selectedMarker);
        if (index !== -1) {
            markers.splice(index, 1);
            infowindows.splice(index, 1);
            siteNames.splice(index, 1);
        }

        selectedMarker = null;
        selectedInfowindow = null;

        alert("선택된 건설현장이 삭제되었습니다.");
    } else {
        alert("삭제할 건설현장을 선택하세요.");
    }
});

document.getElementById('search-input4').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('autocomplete-results');

    if (query === '') {
        resultsContainer.style.display = 'none';
        return;
    }

    const filteredResults = siteNames.filter(siteName => siteName.toLowerCase().startsWith(query));

    if (filteredResults.length > 0) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = filteredResults.map(site => `<div class="autocomplete-item">${site}</div>`).join('');

        document.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', function() {
                document.getElementById('search-input4').value = this.textContent;
                resultsContainer.style.display = 'none';
            });
        });
    } else {
        resultsContainer.style.display = 'none';
    }
});

document.getElementById('search-input4').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputName = this.value.trim();
        const markerData = markers.find(m => m.siteName === inputName);

        if (markerData) {
            map.setCenter(markerData.marker.getPosition());

            if (selectedMarker) {
                selectedMarker.setImage(new kakao.maps.MarkerImage(
                    '/static/img/hammer.png',
                    new kakao.maps.Size(40, 40)
                ));
                if (selectedInfowindow) selectedInfowindow.close();
            }

            selectedMarker = markerData.marker;
            selectedInfowindow = infowindows[markers.indexOf(markerData)];
            selectedMarker.setImage(new kakao.maps.MarkerImage(
                '/static/img/hammer.png',
                new kakao.maps.Size(50, 50)
            ));
            selectedInfowindow.open(map, selectedMarker);
        } else {
            alert("해당 이름의 현장을 찾을 수 없습니다.");
        }

        document.getElementById('autocomplete-results').style.display = 'none';
    }
});

document.getElementById('Button5').addEventListener('click', function() {
    const inputName = document.getElementById('search-input4').value.trim();
    const markerData = markers.find(m => m.siteName === inputName);

    if (markerData) {
        map.setCenter(markerData.marker.getPosition());

        if (selectedMarker) {
            selectedMarker.setImage(new kakao.maps.MarkerImage(
                '/static/img/hammer.png',
                new kakao.maps.Size(40, 40)
            ));
            if (selectedInfowindow) selectedInfowindow.close();
        }

        selectedMarker = markerData.marker;
        selectedInfowindow = infowindows[markers.indexOf(markerData)];
        selectedMarker.setImage(new kakao.maps.MarkerImage(
            '/static/img/hammer.png',
            new kakao.maps.Size(50, 50)
        ));
        selectedInfowindow.open(map, selectedMarker);
    } else {
        alert("해당 이름의 현장을 찾을 수 없습니다.");
    }

    document.getElementById('autocomplete-results').style.display = 'none';
});