import React, { useState, useEffect } from 'react';

const V2 = () => {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // 지도 초기화
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  const searchPlaces = () => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  const displayPlaces = (places) => {
    // 마커 제거
    removeMarker();

    places.forEach((place, index) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index);
      const itemEl = getListItem(index, place);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우 장착
      (function (marker, title) {
        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          infowindow.close();
        };
      })(marker, places[index].place_name);

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });
  };

  const addMarker = (position, idx, title) => {
    // 마커 생성 및 지도에 표시
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new window.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
    });
    marker.setMap(map);
    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    const infowindow = new window.kakao.maps.InfoWindow({ content });
    infowindow.open(map, marker);
  };

  const getListItem = (index, place) => {
    const el = document.createElement('li');
    el.className = 'item';

    const itemStr = `
      <span class="markerbg marker_${index + 1}"></span>
      <div class="info">
        <h5>${place.place_name}</h5>
        ${
          place.road_address_name
            ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>`
            : `<span>${place.address_name}</span>`
        }
        <span class="tel">${place.phone}</span>
      </div>
    `;

    el.innerHTML = itemStr;
    return el;
  };

  return (
    <div>
      <input
        id="keyword"
        type="text"
        placeholder="키워드를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={searchPlaces}>검색</button>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  );
};

export default V2;
