import React, { useEffect } from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import s from "../style/restaurant/restaurant.module.css"
const { kakao } = window;
function Restaurant() {
  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.57188903486235, 126.98721142956846), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter()
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

      // 클릭한 위도, 경도 정보를 가져옵니다 
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';

      var resultDiv = document.getElementById('clickLatlng');
      console.log(message);

    });
  }, [])
  return (
    <>
      <Header></Header>
      <div className={s.container}>
        {/* <div className="store_list"></div> */}
        <div id="map" style={{ width: "100vw", height: "100%" }}></div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Restaurant
