import { useEffect, useRef } from 'react';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      // 카카오 지도 API 스크립트 로드
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=c79aa50646b333fc537b2b1930fcd6e1&autoload=false';
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          initMap();
        });
      };
    } else {
      initMap();
    }

    return () => {
      // 컴포넌트 언마운트 시 지도 객체 정리
      if (mapRef.current) {
        window.kakao.maps.destroy(mapRef.current);
      }
    };
  }, []);

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    // 마커 생성
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 인포윈도우 생성
    const iwContent =
      '<div style="padding:5px;">Hello World! <br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>';
    const iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const infowindow = new window.kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    infowindow.open(map, marker);
  };

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default Map;
