import React, { useState } from 'react';
import { Map, MapMarker, MapInfoWindow, useKakaoLoader } from 'react-kakao-maps-sdk';

const SearchPlaces = () => {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const { isLoaded } = useKakaoLoader({
    appkey: 'c79aa50646b333fc537b2b1930fcd6e1',
  });

  const searchPlaces = () => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        setMarkers(
          data.map((place, index) => (
            <MapMarker
              key={index}
              position={{
                lat: place.y,
                lng: place.x,
              }}
              onMouseOver={() => setInfoWindow({ content: place.place_name, position: { lat: place.y, lng: place.x } })}
              onMouseOut={() => setInfoWindow(null)}
            />
          ))
        );
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <div>
      <input
        id="keyword"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={searchPlaces}>검색</button>
      {isLoaded && (
        <Map center={{ lat: 37.566826, lng: 126.9786567 }} level={3} style={{ width: '100%', height: '500px' }}>
          {markers}
          {infoWindow && (
            <MapInfoWindow position={infoWindow.position}>
              {infoWindow.content}
            </MapInfoWindow>
          )}
        </Map>
      )}
      <ul id="placesList">
        {places.map((place, index) => (
          <li key={index} className="item">
            <span className={`markerbg marker_${index + 1}`}></span>
            <div className="info">
              <h5>{place.place_name}</h5>
              {place.road_address_name ? (
                <span>
                  {place.road_address_name}
                  <span className="jibun gray">{place.address_name}</span>
                </span>
              ) : (
                <span>{place.address_name}</span>
              )}
              <span className="tel">{place.phone}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPlaces;
