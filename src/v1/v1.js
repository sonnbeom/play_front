import React, { useState, useEffect } from 'react';
import { Map, MapMarker, InfoWindow } from 'react-kakao-maps-sdk';

const Search = () => {
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    // Initialize the map and other necessary objects
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // Search for places based on the keyword
    const searchPlaces = () => {
      const keyword = document.getElementById('keyword').value;
      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return;
      }

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

    // Display the search results on the map
    const displayPlaces = (places) => {
      setMarkers((prevMarkers) => {
        prevMarkers.forEach((marker) => marker.setMap(null));
        return [];
      });

      const bounds = new window.kakao.maps.LatLngBounds();
      places.forEach((place, index) => {
        const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = addMarker(placePosition, index);
        bounds.extend(placePosition);

        // Add event listeners to the marker and the list item
        window.kakao.maps.event.addListener(marker, 'mouseover', () =>
          displayInfowindow(marker, place.place_name)
        );
        window.kakao.maps.event.addListener(marker, 'mouseout', () =>
          infowindow.close()
        );
      });

      map.setBounds(bounds);
    };

    // Add a marker to the map
    const addMarker = (position, idx) => {
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
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      return marker;
    };

    // Display the pagination
    const displayPagination = (pagination) => {
      const paginationEl = document.getElementById('pagination');
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;
        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = () => pagination.gotoPage(i);
        }
        paginationEl.appendChild(el);
      }
    };

    // Display the info window
    const displayInfowindow = (marker, title) => {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      infowindow.setContent(content);
      infowindow.open(map, marker);
      setInfoWindow(infowindow);
    };

    // Clean up the map and markers when the component is unmounted
    return () => {
      markers.forEach((marker) => marker.setMap(null));
      infoWindow?.close();
    };
  }, []);

  return (
    <div>
      <input type="text" id="keyword" placeholder="키워드를 입력하세요" />
      <button onClick={searchPlaces}>검색하기</button>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <ul id="placesList"></ul>
      <div id="pagination"></div>
    </div>
  );
};

export default Search;
