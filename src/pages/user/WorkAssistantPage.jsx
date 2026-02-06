import styled from "@emotion/styled";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Http";
import Header from "../../shared/Header";
import {
  ChevronLeft, ChevronRight, Phone, MapPin, LocateFixed,
  Users, Clock, Info, FileText, Landmark, Building2,
} from "lucide-react";
import { REGIONS, getNearestRegion } from "../../data/regionCoords";
import KEAD_BRANCHES from "../../data/keadBranches";

const PER_PAGE = 10;

// --- Layout ---

const Page = styled.div`
  min-height: 100vh;
  background: #f4f6f9;
`;

const Wrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 28px 60px;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #e0e0e0;
  padding: 8px 14px;
  border-radius: 8px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover { background: #f5f5f5; }
`;

// --- Hero ---

const Hero = styled.section`
  background: linear-gradient(135deg, #0b4da2 0%, #1565c0 60%, #1a73e8 100%);
  color: white;
  border-radius: 16px;
  padding: 36px;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px;
`;

const HeroDesc = styled.p`
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0 0 24px;
  max-width: 700px;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const HeroItem = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.5;
`;

const IconWrap = styled.span`
  flex-shrink: 0;
  margin-top: 1px;
`;

// --- Filter Bar ---

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  color: #333;
  background: white;
  cursor: pointer;
  &:focus { border-color: #0b4da2; outline: none; }
`;

const GpsBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1.5px solid ${({ $active }) => ($active ? "#0b4da2" : "#d0d0d0")};
  background: ${({ $active }) => ($active ? "#eef6ff" : "white")};
  color: ${({ $active }) => ($active ? "#0b4da2" : "#555")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: #0b4da2; background: #eef6ff; color: #0b4da2; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Spacer = styled.div`
  flex: 1;
`;

const StatBadge = styled.span`
  font-size: 14px;
  color: #666;
  strong { color: #0b4da2; font-weight: 700; }
`;

// --- Two-column Dashboard ---

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 24px;
  align-items: start;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

// --- Panel (shared card wrapper) ---

const Panel = styled.section`
  background: white;
  border: 1px solid #e4e7ec;
  border-radius: 14px;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid #eef0f4;
  background: ${({ $bg }) => $bg || "#fafbfc"};
`;

const PanelIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $bg }) => $bg || "#eef6ff"};
  color: ${({ $color }) => $color || "#0b4da2"};
`;

const PanelTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #222;
  margin: 0;
`;

const PanelSub = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: auto;
`;

const PanelBody = styled.div`
  padding: 12px 16px;
  max-height: ${({ $sticky }) => ($sticky ? "calc(100vh - 160px)" : "none")};
  overflow-y: ${({ $sticky }) => ($sticky ? "auto" : "visible")};
`;

// --- Left: Branch contacts ---

const StickyWrap = styled.aside`
  position: sticky;
  top: 20px;
  @media (max-width: 960px) { position: static; }
`;

const BranchItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover { background: #f7f9fc; }
  & + & { border-top: 1px solid #f0f0f0; }
`;

const BranchName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin-bottom: 3px;
`;

const BranchJuris = styled.div`
  font-size: 12px;
  color: #999;
  line-height: 1.4;
  margin-bottom: 6px;
`;

const BranchPhone = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #0b4da2;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

// --- Right: Agency list ---

const AgencyRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 16px;
  transition: background 0.15s;
  &:hover { background: #fafbfe; }
  & + & { border-top: 1px solid #f0f2f5; }
`;

const AgencyInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AgencyName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px;
`;

const AgencyAddr = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #777;
  line-height: 1.4;
`;

const AgencyMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #5a7bbf;
  background: #eef3ff;
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
`;

const PhoneBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #00796b;
  text-decoration: none;
  padding: 5px 12px;
  border: 1px solid #b2dfdb;
  border-radius: 6px;
  background: #e0f2f1;
  white-space: nowrap;
  transition: all 0.15s;
  &:hover { background: #b2dfdb; }
`;

// --- Pagination ---

const PageNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 14px 20px;
  border-top: 1px solid #eef0f4;
`;

const PageBtn = styled.button`
  min-width: 34px;
  height: 34px;
  border: 1px solid ${({ $active }) => ($active ? "#0b4da2" : "#e0e0e0")};
  background: ${({ $active }) => ($active ? "#0b4da2" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#555")};
  border-radius: 8px;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover:not(:disabled) {
    border-color: #0b4da2;
    color: ${({ $active }) => ($active ? "white" : "#0b4da2")};
  }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const Empty = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #aaa;
  font-size: 14px;
`;

// --- Component ---

function WorkAssistantPage() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsDetected, setGpsDetected] = useState(false);
  const [page, setPage] = useState(0);

  const handleGps = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const region = getNearestRegion(pos.coords.latitude, pos.coords.longitude);
        if (region) setSelectedRegion(region);
        setGpsDetected(true);
        setGpsLoading(false);
        setPage(0);
      },
      () => setGpsLoading(false)
    );
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setGpsDetected(false);
    setPage(0);
  };

  const { data: agencies = [], isLoading } = useQuery({
    queryKey: ["workAssistants", selectedRegion],
    queryFn: async () => {
      const params = selectedRegion ? { region: selectedRegion } : {};
      return (await api.get("/work-assistants", { params })).data;
    },
  });

  const filteredBranches = useMemo(
    () => selectedRegion
      ? KEAD_BRANCHES.filter((b) => b.region === selectedRegion)
      : KEAD_BRANCHES,
    [selectedRegion]
  );

  const totalPages = Math.ceil(agencies.length / PER_PAGE);
  const pagedAgencies = agencies.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <Page>
      <Header />
      <Wrap>
        <BackBtn onClick={() => navigate("/")}>
          <ChevronLeft size={16} /> 메인으로
        </BackBtn>

        <Hero>
          <HeroTitle>근로지원인 지원사업</HeroTitle>
          <HeroDesc>
            중증장애인 근로자가 근로지원인의 도움을 받아 업무를 수행할 수 있도록 지원하는 제도입니다.
            아래에서 가까운 수행기관을 찾아 신청하세요.
          </HeroDesc>
          <HeroGrid>
            <HeroItem>
              <IconWrap><Users size={18} /></IconWrap>
              <div><strong>대상</strong><br />중증장애인 근로자<br />(최저임금 이상)</div>
            </HeroItem>
            <HeroItem>
              <IconWrap><Clock size={18} /></IconWrap>
              <div><strong>지원 한도</strong><br />일 8시간, 주 40시간</div>
            </HeroItem>
            <HeroItem>
              <IconWrap><Info size={18} /></IconWrap>
              <div><strong>본인부담금</strong><br />시간당 300원</div>
            </HeroItem>
            <HeroItem>
              <IconWrap><FileText size={18} /></IconWrap>
              <div><strong>신청 방법</strong><br />사업주 동의 후<br />공단에 신청</div>
            </HeroItem>
          </HeroGrid>
        </Hero>

        <FilterRow>
          <Select value={selectedRegion} onChange={handleRegionChange}>
            <option value="">전체 지역</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
          <GpsBtn onClick={handleGps} disabled={gpsLoading} $active={gpsDetected}>
            <LocateFixed size={16} />
            {gpsLoading ? "측정 중..." : gpsDetected ? "위치 감지됨" : "내 위치로 찾기"}
          </GpsBtn>
          <Spacer />
          <StatBadge>
            수행기관 <strong>{agencies.length}</strong>
            {" · "}지사 <strong>{filteredBranches.length}</strong>
          </StatBadge>
        </FilterRow>

        <Dashboard>
          <StickyWrap>
            <Panel>
              <PanelHeader>
                <PanelIcon $bg="#eef6ff" $color="#0b4da2"><Landmark size={16} /></PanelIcon>
                <PanelTitle>공단 지역본부·지사</PanelTitle>
                <PanelSub>{filteredBranches.length}개</PanelSub>
              </PanelHeader>
              <PanelBody $sticky>
                {filteredBranches.map((b) => (
                  <BranchItem key={b.branch}>
                    <BranchName>{b.branch}</BranchName>
                    <BranchJuris>{b.jurisdiction}</BranchJuris>
                    <BranchPhone href={`tel:${b.phone}`}>
                      <Phone size={12} /> {b.phone}
                    </BranchPhone>
                  </BranchItem>
                ))}
              </PanelBody>
            </Panel>
          </StickyWrap>

          <Panel>
            <PanelHeader $bg="#f8faf9">
              <PanelIcon $bg="#e0f2f1" $color="#00796b"><Building2 size={16} /></PanelIcon>
              <PanelTitle>근로지원인 수행기관</PanelTitle>
              <PanelSub>
                {agencies.length > 0 && `${page * PER_PAGE + 1}–${Math.min((page + 1) * PER_PAGE, agencies.length)} / ${agencies.length}`}
              </PanelSub>
            </PanelHeader>

            {isLoading && <Empty>기관 정보를 불러오는 중...</Empty>}
            {!isLoading && agencies.length === 0 && <Empty>해당 지역에 등록된 수행기관이 없습니다.</Empty>}

            {!isLoading && pagedAgencies.map((a) => (
              <AgencyRow key={a.id}>
                <AgencyInfo>
                  <AgencyName>{a.agencyName}</AgencyName>
                  <AgencyAddr><MapPin size={13} /> {a.address}</AgencyAddr>
                </AgencyInfo>
                <AgencyMeta>
                  <Badge>{a.branch}</Badge>
                  {a.phone && (
                    <PhoneBtn href={`tel:${a.phone.replace(/[^0-9-]/g, "")}`}>
                      <Phone size={12} /> {a.phone}
                    </PhoneBtn>
                  )}
                </AgencyMeta>
              </AgencyRow>
            ))}

            {totalPages > 1 && (
              <PageNav>
                <PageBtn onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
                  <ChevronLeft size={15} />
                </PageBtn>
                {[...Array(totalPages)].map((_, i) => (
                  <PageBtn key={i} $active={page === i} onClick={() => setPage(i)}>
                    {i + 1}
                  </PageBtn>
                ))}
                <PageBtn onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages - 1}>
                  <ChevronRight size={15} />
                </PageBtn>
              </PageNav>
            )}
          </Panel>
        </Dashboard>
      </Wrap>
    </Page>
  );
}

export default WorkAssistantPage;
