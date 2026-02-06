const REGION_COORDS = [
  { name: "서울", lat: 37.5665, lng: 126.9780 },
  { name: "부산", lat: 35.1796, lng: 129.0756 },
  { name: "대구", lat: 35.8714, lng: 128.6014 },
  { name: "인천", lat: 37.4563, lng: 126.7052 },
  { name: "광주", lat: 35.1595, lng: 126.8526 },
  { name: "대전", lat: 36.3504, lng: 127.3845 },
  { name: "울산", lat: 35.5384, lng: 129.3114 },
  { name: "세종", lat: 36.4800, lng: 127.2890 },
  { name: "경기", lat: 37.4138, lng: 127.5183 },
  { name: "강원", lat: 37.8228, lng: 128.1555 },
  { name: "충북", lat: 36.6357, lng: 127.4917 },
  { name: "충남", lat: 36.5184, lng: 126.8000 },
  { name: "전북", lat: 35.7175, lng: 127.1530 },
  { name: "전남", lat: 34.8679, lng: 126.9910 },
  { name: "경북", lat: 36.4919, lng: 128.8889 },
  { name: "경남", lat: 35.4606, lng: 128.2132 },
  { name: "제주", lat: 33.4890, lng: 126.4983 },
];

export const REGIONS = REGION_COORDS.map((r) => r.name);

export const getNearestRegion = (lat, lng) =>
  REGION_COORDS.reduce(
    (best, r) => {
      const d = Math.abs(r.lat - lat) + Math.abs(r.lng - lng);
      return d < best.d ? { name: r.name, d } : best;
    },
    { name: null, d: Infinity }
  ).name;

export default REGION_COORDS;
