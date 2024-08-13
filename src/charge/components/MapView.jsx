import { useEffect, useRef, memo } from 'react';
import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

const MapView = memo(({ setChargerData }) => {
  const mapContainer = useRef(null); // 지도를 담을 DOM 요소를 참조합니다.
  const mapRef = useRef(null); // 지도 객체를 참조합니다
  const markersRef = useRef([]); // 마커 배열을 참조합니다
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  useEffect(() => {
    // 네이버 맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=avh0jngjl9`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map(mapContainer.current, {
          center: new window.naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10,
        });

        mapRef.current = map;

        // 디바운스된 마커 업데이트 함수
        const updateMarkers = debounce(async () => {
          const center = map.getCenter();
          const lat = center.lat();
          const lng = center.lng();

          try {
            const response = await fetch('http://localhost:8080/charger/list', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userLatitude: lat,
                userLongitude: lng,
              }),
            });

            if (!response.ok) {
              throw new Error('네트워크 연결이 원활하지 않습니다.');
            }

            const data = await response.json();
            setChargerData(data);

            // 기존 마커 제거
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            // 새로운 마커 추가
            data.forEach(charger => {
              const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(charger.lat, charger.lng),
                map: mapRef.current,
                title: charger.statNm,
              });

              // 마커 클릭 시 정보창 표시 및 클로즈업
              window.naver.maps.Event.addListener(marker, 'click', () => {
                // 정보창을 열거나 다른 방식으로 ChargerDetail 정보 표시
                // 이 예제에서는 페이지 이동을 사용합니다.
                navigate(`/charge/place/${charger.statId}`);

                // 마커 위치로 지도 중심 이동 및 줌 레벨 조정
                mapRef.current.setCenter(marker.getPosition());
                mapRef.current.setZoom(14);
              });

              markersRef.current.push(marker); // 마커 배열에 추가
            });
          } catch (error) {
            console.error('충전소 데이터를 불러오는 중 에러가 발생하였습니다:', error);
          }
        }, 300); // 0.3초 동안의 디바운스 설정

        // 지도 중앙 위치 변경 이벤트 리스너 등록
        window.naver.maps.Event.addListener(map, 'bounds_changed', updateMarkers);

        // 초기 마커 업데이트
        updateMarkers();
      }
    };

    return () => {
      document.head.removeChild(script);
      // 컴포넌트가 언마운트될 때 모든 마커 제거
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, []); // 빈 배열로 의존성 설정

  return (
    <Box position="relative" width="100%" height="calc(100vh - 60px)" bg="gray.200">
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
    </Box>
  );
});

export default MapView;