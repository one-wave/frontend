import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Http";
import Header from "../../shared/Header";
import { ChevronLeft, Phone, MapPin, Building2, Info, Users, Clock, FileText } from "lucide-react";

// --- Region auto-detect from GPS (no external API) ---

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

const REGIONS = REGION_COORDS.map((r) => r.name);

const getNearestRegion = (lat, lng) =>
  REGION_COORDS.reduce(
    (best, r) => {
      const d = Math.abs(r.lat - lat) + Math.abs(r.lng - lng);
      return d < best.d ? { name: r.name, d } : best;
    },
    { name: null, d: Infinity }
  ).name;

// --- Styled Components ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 60px;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover { background-color: #f1f1f1; }
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, #0b4da2 0%, #1a73e8 100%);
  color: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
`;

const InfoTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 12px 0;
`;

const InfoDesc = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.92;
  margin: 0 0 20px 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const InfoItem = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const RegionSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background: white;
  cursor: pointer;
  &:focus { border-color: #0b4da2; outline: none; }
`;

const ResultCount = styled.span`
  font-size: 15px;
  color: #666;
  strong { color: #0b4da2; }
`;

const AgencyCard = styled.div`
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 12px;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06); }
`;

const AgencyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const AgencyName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin: 0;
`;

const BranchBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #0b4da2;
  background: #eef6ff;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
`;

const AgencyDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
`;

const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #00796b;
  text-decoration: none;
  padding: 6px 14px;
  border: 1px solid #00796b;
  border-radius: 6px;
  margin-top: 8px;
  transition: all 0.2s;
  &:hover { background: #e0f2f1; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
`;

// --- Component ---

function WorkAssistantPage() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [gpsDetected, setGpsDetected] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const region = getNearestRegion(pos.coords.latitude, pos.coords.longitude);
        if (region) {
          setSelectedRegion(region);
          setGpsDetected(true);
        }
      },
      () => {} // GPS denied: keep "전체" as default
    );
  }, []);

  const { data: agencies = [], isLoading } = useQuery({
    queryKey: ["workAssistants", selectedRegion],
    queryFn: async () => {
      const params = selectedRegion ? { region: selectedRegion } : {};
      const res = await api.get("/work-assistants", { params });
      return res.data;
    },
  });

  return (
    <Container>
      <Header />
      <Content>
        <BackButton onClick={() => navigate("/")}>
          <ChevronLeft size={16} /> 메인으로
        </BackButton>

        <InfoCard>
          <InfoTitle>근로지원인 지원사업</InfoTitle>
          <InfoDesc>
            중증장애인 근로자가 근로지원인의 도움을 받아 업무를 수행할 수 있도록 지원하는 제도입니다.
            아래에서 가까운 수행기관을 찾아 신청하세요.
          </InfoDesc>
          <InfoGrid>
            <InfoItem>
              <Users size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div><strong>대상</strong><br />중증장애인 근로자 (최저임금 이상)</div>
            </InfoItem>
            <InfoItem>
              <Clock size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div><strong>지원 한도</strong><br />일 8시간, 주 40시간</div>
            </InfoItem>
            <InfoItem>
              <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div><strong>본인부담금</strong><br />시간당 300원</div>
            </InfoItem>
            <InfoItem>
              <FileText size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div><strong>신청</strong><br />사업주 동의 후 공단에 신청</div>
            </InfoItem>
          </InfoGrid>
        </InfoCard>

        <FilterBar>
          <RegionSelect
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">전체 지역</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </RegionSelect>
          <ResultCount>
            {gpsDetected && selectedRegion && (
              <span style={{ fontSize: 13, color: "#888", marginRight: 8 }}>
                📍 현재 위치 기반
              </span>
            )}
            <strong>{agencies.length}</strong>개 기관
          </ResultCount>
        </FilterBar>

        {isLoading && <LoadingState>기관 정보를 불러오는 중...</LoadingState>}

        {!isLoading && agencies.length === 0 && (
          <EmptyState>해당 지역에 등록된 수행기관이 없습니다.</EmptyState>
        )}

        {!isLoading &&
          agencies.map((a) => (
            <AgencyCard key={a.id}>
              <AgencyHeader>
                <AgencyName>{a.agencyName}</AgencyName>
                <BranchBadge>{a.branch}</BranchBadge>
              </AgencyHeader>
              <AgencyDetail>
                <MapPin size={14} color="#888" />
                {a.address}
              </AgencyDetail>
              {a.phone && (
                <PhoneLink href={`tel:${a.phone.replace(/[^0-9-]/g, "")}`}>
                  <Phone size={14} />
                  {a.phone}
                </PhoneLink>
              )}
            </AgencyCard>
          ))}
      </Content>
    </Container>
  );
}

export default WorkAssistantPage;
