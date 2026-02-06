import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Accessibility,
  Briefcase,
  MapPin,
  Clock,
  Building,
  Monitor,
  Home,
  Save,
  Send,
  HandMetal,
  ArrowUpDown,
  Grid3X3,
} from "lucide-react";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

// 1. Sidebar (Consistent styling)
const Sidebar = styled.aside`
  width: 260px;
  background-color: #243c5a;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 1.2rem;
  font-weight: 800;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Menu = styled.nav`
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background-color: ${(props) =>
    props.active ? "rgba(255,255,255,0.1)" : "transparent"};
  color: ${(props) => (props.active ? "white" : "#a0aec0")};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
  }
`;

const SidebarFooter = styled.div`
  padding: 24px;
  font-size: 0.75rem;
  color: #718096;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

// 2. Main Area
const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Header
const Header = styled.header`
  height: 80px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const HeaderTitle = styled.div`
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 4px;
  }
  p {
    font-size: 0.85rem;
    color: #718096;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #4a5568;
  &:hover {
    background: #f7fafc;
  }
`;

// Form Content Area
const FormContainer = styled.div`
  padding: 40px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

// Blue Banner Card
const TopBanner = styled.div`
  background-color: #243c5a;
  border-radius: 12px;
  padding: 32px;
  color: white;
  margin-bottom: 30px;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  p {
    font-size: 0.95rem;
    opacity: 0.8;
  }
`;

// Section Card
const SectionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  color: #2d3748;

  svg {
    color: #3182ce;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

// Form Elements
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;

  span {
    color: #e53e3e;
    margin-left: 2px;
  } /* Red asterisk */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3182ce;
  }
  &::placeholder {
    color: #a0aec0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  background-color: white;
  &:focus {
    border-color: #3182ce;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  min-height: 160px;
  resize: vertical;
  outline: none;
  font-family: inherit;
  &:focus {
    border-color: #3182ce;
  }
  &::placeholder {
    color: #a0aec0;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddressRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchBtn = styled.button`
  background: white;
  border: 1px solid #2b6cb0;
  color: #2b6cb0;
  padding: 0 20px;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  &:hover {
    background: #ebf8ff;
  }
`;

// Facilities Grid
const FacilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FacilityCard = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${(props) => (props.checked ? "#3182ce" : "#e2e8f0")};
  border-radius: 8px;
  background-color: ${(props) => (props.checked ? "#ebf8ff" : "white")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3182ce;
  }

  input {
    width: 18px;
    height: 18px;
    accent-color: #3182ce;
  }

  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2d3748;
  }
  svg {
    color: #4a5568;
  }
`;

// Footer Buttons
const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const BottomBtn = styled.button`
  padding: 14px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;

  ${(props) =>
    props.primary
      ? `
    background-color: #243c5a;
    color: white;
    &:hover { background-color: #1a202c; }
  `
      : `
    background-color: white;
    border: 1px solid #cbd5e0;
    color: #4a5568;
    &:hover { background-color: #f7fafc; }
  `}
`;

function JobPostPage() {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState({
    ramp: false,
    restroom: false,
    elevator: false,
    braille: false,
    monitor: false,
    signLanguage: false,
    remote: false,
    flexible: false,
  });

  const handleFacilityChange = (key) => {
    setFacilities({ ...facilities, [key]: !facilities[key] });
  };

  const handleLogout = () => navigate("/login");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("채용 공고가 성공적으로 등록되었습니다.");
    navigate("/company/dashboard");
  };

  return (
    <LayoutContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader>
          <Accessibility size={28} />
          배리어 프리
        </SidebarHeader>
        <Menu>
          <MenuItem onClick={() => navigate("/company/dashboard")}>
            <LayoutDashboard size={20} /> 대시보드
          </MenuItem>
          <MenuItem active>
            <FileText size={20} /> 공고 관리
          </MenuItem>
          <MenuItem>
            <Settings size={20} /> 설정
          </MenuItem>
        </Menu>
        <SidebarFooter>기업 관리자 포털 v1.0</SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Top Header */}
        <Header>
          <HeaderTitle>
            <h2>채용 공고 등록</h2>
            <p>새로운 채용 공고를 작성합니다</p>
          </HeaderTitle>
          <HeaderActions>
            <ActionBtn onClick={handleLogout}>
              <LogOut size={18} /> 로그아웃
            </ActionBtn>
          </HeaderActions>
        </Header>

        {/* Content Body */}
        <FormContainer>
          {/* Blue Banner */}
          <TopBanner>
            <h1>채용 공고 등록</h1>
            <p>
              장애인 인재를 위한 상세한 정보를 입력해주세요. 상세한 직무 설명과
              편의시설 정보는 매칭률을 높입니다.
            </p>
          </TopBanner>

          <form onSubmit={handleSubmit}>
            {/* 1. Basic Info */}
            <SectionCard>
              <SectionHeader>
                <Briefcase size={24} />
                <h3>기본 정보</h3>
              </SectionHeader>

              <FormGroup>
                <Label>
                  공고 제목 <span>*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="예: 프론트엔드 개발자 (웹 접근성 전문)"
                  required
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>
                    채용 직무 <span>*</span>
                  </Label>
                  <Select required>
                    <option value="">직무를 선택해주세요</option>
                    <option value="dev">개발</option>
                    <option value="design">디자인</option>
                    <option value="service">서비스/상담</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>
                    연봉 정보 <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="예: 3,500만원 ~ 4,500만원"
                    required
                  />
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#718096",
                      marginTop: "4px",
                    }}
                  >
                    협의 가능 시 "협의 후 결정"으로 입력
                  </p>
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>
                  근무지 <span>*</span>
                </Label>
                <AddressRow>
                  <Input
                    type="text"
                    placeholder="예: 서울특별시 강남구 테헤란로 123"
                    required
                  />
                  <SearchBtn type="button">
                    <MapPin size={16} /> 주소 검색
                  </SearchBtn>
                </AddressRow>
              </FormGroup>
            </SectionCard>

            {/* 2. Detail Info */}
            <SectionCard>
              <SectionHeader>
                <FileText size={24} />
                <h3>상세 내용</h3>
              </SectionHeader>

              <FormGroup>
                <Label>
                  직무 설명 및 자격 요건 <span>*</span>
                </Label>
                <TextArea
                  placeholder="[직무 설명]&#13;&#10;- 웹 프론트엔드 개발 및 유지보수&#13;&#10;- 접근성 가이드라인(WCAG 2.1) 준수 개발&#13;&#10;&#13;&#10;[자격 요건]&#13;&#10;- React, TypeScript 경험 2년 이상&#13;&#10;- 웹 접근성에 대한 이해와 관심"
                  required
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#718096",
                    marginTop: "6px",
                  }}
                >
                  장애인 지원자가 이해하기 쉽도록 명확하고 구체적으로
                  작성해주세요.
                </p>
              </FormGroup>
            </SectionCard>

            {/* 3. Facilities */}
            <SectionCard>
              <SectionHeader>
                <Accessibility size={24} />
                <h3>편의시설 및 지원 사항</h3>
              </SectionHeader>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.9rem",
                  marginBottom: "20px",
                }}
              >
                우리 기업이 제공하는 편의시설을 체크해주세요.
              </p>

              <FacilityGrid>
                <FacilityCard checked={facilities.ramp}>
                  <input
                    type="checkbox"
                    checked={facilities.ramp}
                    onChange={() => handleFacilityChange("ramp")}
                  />
                  <ArrowUpDown size={20} />
                  <span>휠체어용 경사로</span>
                </FacilityCard>

                <FacilityCard checked={facilities.restroom}>
                  <input
                    type="checkbox"
                    checked={facilities.restroom}
                    onChange={() => handleFacilityChange("restroom")}
                  />
                  <Accessibility size={20} />
                  <span>장애인 전용 화장실</span>
                </FacilityCard>

                <FacilityCard checked={facilities.elevator}>
                  <input
                    type="checkbox"
                    checked={facilities.elevator}
                    onChange={() => handleFacilityChange("elevator")}
                  />
                  <Building size={20} />
                  <span>엘리베이터</span>
                </FacilityCard>

                <FacilityCard checked={facilities.braille}>
                  <input
                    type="checkbox"
                    checked={facilities.braille}
                    onChange={() => handleFacilityChange("braille")}
                  />
                  <Grid3X3 size={20} />
                  <span>점자 블록</span>
                </FacilityCard>

                <FacilityCard checked={facilities.monitor}>
                  <input
                    type="checkbox"
                    checked={facilities.monitor}
                    onChange={() => handleFacilityChange("monitor")}
                  />
                  <Monitor size={20} />
                  <span>확대 모니터 제공</span>
                </FacilityCard>

                <FacilityCard checked={facilities.signLanguage}>
                  <input
                    type="checkbox"
                    checked={facilities.signLanguage}
                    onChange={() => handleFacilityChange("signLanguage")}
                  />
                  <HandMetal size={20} />
                  <span>수어 통역 지원</span>
                </FacilityCard>

                <FacilityCard checked={facilities.remote}>
                  <input
                    type="checkbox"
                    checked={facilities.remote}
                    onChange={() => handleFacilityChange("remote")}
                  />
                  <Home size={20} />
                  <span>재택 근무 가능</span>
                </FacilityCard>

                <FacilityCard checked={facilities.flexible}>
                  <input
                    type="checkbox"
                    checked={facilities.flexible}
                    onChange={() => handleFacilityChange("flexible")}
                  />
                  <Clock size={20} />
                  <span>시차 출퇴근제</span>
                </FacilityCard>
              </FacilityGrid>
            </SectionCard>

            {/* Bottom Actions */}
            <BottomActions>
              <BottomBtn type="button">
                <Save size={18} /> 임시 저장
              </BottomBtn>
              <BottomBtn type="submit" primary>
                <Send size={18} /> 공고 등록하기
              </BottomBtn>
            </BottomActions>
          </form>
        </FormContainer>
      </MainContent>
    </LayoutContainer>
  );
}

export default JobPostPage;
