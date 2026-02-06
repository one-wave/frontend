import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bookmark,
  Building2,
  Accessibility,
  Clock,
  MapPin,
  Briefcase,
} from "lucide-react";
import Header from "../../shared/Header";

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

// 1. Hero Section (Search)
const HeroSection = styled.div`
  background-color: #0b4da2;
  padding: 60px 0;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const SearchBarWrapper = styled.div`
  background: white;
  width: 600px;
  max-width: 90%;
  margin: 0 auto;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const SearchSubmitBtn = styled.button`
  background-color: #0b4da2;
  color: white;
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background-color: #093c80;
  }
`;

// 3. Main Layout (Sidebar + Grid)
const MainLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 30px;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

// Sidebar
const Sidebar = styled.aside`
  width: 250px;
  flex-shrink: 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 24px;
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;

  input {
    accent-color: #0b4da2;
    transform: scale(1.1);
  }
`;

// Content Area
const ContentArea = styled.main`
  flex: 1;
`;

// Tabs (Existing Logic kept, styled minimally to fit)
const TabSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  color: ${(props) => (props.active ? "#0b4da2" : "#888")};
  padding-bottom: 8px;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#0b4da2" : "transparent")};
  transition: all 0.2s;
  &:hover {
    color: #0b4da2;
  }
`;

const CountHeader = styled.div`
  margin-bottom: 16px;
  font-size: 1rem;
  color: #555;
  strong {
    color: #0b4da2;
  }
`;

// Grid & Card
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 columns like the image
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CompanyInfo = styled.div`
  display: flex;
  gap: 12px;
`;

const CompanyIcon = styled.div`
  width: 44px;
  height: 44px;
  background: #f0f7ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0b4da2;
`;

const CompanyNameText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
`;

const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #222;
  line-height: 1.4;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const TagSpan = styled.span`
  background-color: ${(props) => props.bg || "#f1f8ff"};
  color: ${(props) => props.color || "#0b4da2"};
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
`;

const Deadline = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.urgent ? "#e03e3e" : "#666")};
  background: ${(props) => (props.urgent ? "#fff0f0" : "transparent")};
  padding: ${(props) => (props.urgent ? "4px 8px" : "0")};
  border-radius: 4px;
`;

const ApplyButton = styled.button`
  background-color: #00796b; /* Green from image */
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: #006054;
  }
  &::after {
    content: "›";
    font-size: 1.2rem;
    line-height: 0.8;
  }
`;

// Helper for random tag colors to match image
const getTagStyle = (tag) => {
  if (tag.includes("재택") || tag.includes("신입"))
    return { bg: "#e6f9ed", color: "#00a84e" };
  if (tag.includes("탄력") || tag.includes("경력"))
    return { bg: "#f3eafa", color: "#7a3db8" };
  return { bg: "#eef6ff", color: "#0b4da2" };
};

// --- Main Component ---

function UserMainPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters, setFilters] = useState({
    wheelchair: false,
    remote: false,
    visual: false,
    hearing: false,
  });

  // 기존 데이터 유지
  const jobs = [
    {
      id: 1,
      title: "웹 프론트엔드 개발자 (웹 접근성 전문)",
      company: "주식회사 배리어프리",
      location: "서울 강남구",
      salary: "연봉 3,500~",
      tags: ["재택근무", "경사로있음", "탄력근무제"],
      deadline: "D-7",
      urgent: false,
    },
    {
      id: 2,
      title: "행정 사무 보조원",
      company: "한국장애인고용공단",
      location: "서울 판교",
      salary: "회사내규",
      tags: ["휠체어접근가능", "근로지원인지원"],
      deadline: "마감 D-3",
      urgent: true,
    },
    {
      id: 3,
      title: "UX 리서처 (접근성 테스트)",
      company: "(주) 디지털인클루전",
      location: "서울 마포구",
      salary: "연봉 3,200~",
      tags: ["재택근무", "탄력근무제"],
      deadline: "D-14",
      urgent: false,
    },
    {
      id: 4,
      title: "데이터 분석가 (주니어)",
      company: "열린기술 주식회사",
      location: "서울 성수동",
      salary: "연봉 4,000~",
      tags: ["재택근무", "경사로있음"],
      deadline: "마감 D-5",
      urgent: true,
    },
  ];

  const contests = [
    {
      id: 1,
      title: "배리어프리 앱 개발 공모전",
      company: "한국장애인고용공단",
      tags: ["앱 개발", "접근성", "장애인"],
      deadline: "~03.31",
      urgent: false,
    },
    {
      id: 2,
      title: "소셜 벤처 아이디어 경진대회",
      company: "사회적기업진흥원",
      tags: ["아이디어", "사회문제", "창업"],
      deadline: "~04.15",
      urgent: false,
    },
  ];

  const educationPrograms = [
    {
      id: 1,
      title: "IT 실무 역량 강화 과정",
      company: "한국장애인고용공단",
      tags: ["IT", "개발", "온라인"],
      deadline: "상시모집",
      urgent: false,
    },
    {
      id: 2,
      title: "디지털 마케팅 전문가 과정",
      company: "한국산업인력공단",
      tags: ["마케팅", "SNS", "오프라인"],
      deadline: "마감임박",
      urgent: true,
    },
  ];

  const handleJobClick = (jobId) => {
    navigate(`/user/job/${jobId}`);
  };

  const getData = () => {
    if (activeTab === "jobs") return jobs;
    if (activeTab === "contests") return contests;
    return educationPrograms;
  };

  const currentData = getData();

  return (
    <Container>
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <HeroSection>
        <HeroTitle>나에게 맞는 일자리를 찾아보세요</HeroTitle>
        <HeroSubtitle>접근성을 고려한 채용 공고만 모았습니다</HeroSubtitle>
        <SearchBarWrapper>
          <SearchInput
            placeholder="직무, 회사명, 또는 키워드를 검색해보세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchSubmitBtn>
            <Search size={18} /> 검색
          </SearchSubmitBtn>
        </SearchBarWrapper>
      </HeroSection>

      {/* 3. Main Layout */}
      <MainLayout>
        {/* Sidebar */}
        <Sidebar>
          <FilterGroup>
            <FilterTitle>
              <Accessibility size={18} /> 장애 유형
            </FilterTitle>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.wheelchair}
                onChange={(e) =>
                  setFilters({ ...filters, wheelchair: e.target.checked })
                }
              />{" "}
              지체장애
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.visual}
                onChange={(e) =>
                  setFilters({ ...filters, visual: e.target.checked })
                }
              />{" "}
              시각장애
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.hearing}
                onChange={(e) =>
                  setFilters({ ...filters, hearing: e.target.checked })
                }
              />{" "}
              청각장애
            </CheckboxLabel>
          </FilterGroup>

          <hr
            style={{
              margin: "20px 0",
              border: "0",
              borderTop: "1px solid #eee",
            }}
          />

          <FilterGroup>
            <FilterTitle>
              <Building2 size={18} /> 근무 조건
            </FilterTitle>
            <CheckboxLabel>
              <input type="checkbox" /> 휠체어 가능
            </CheckboxLabel>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={filters.remote}
                onChange={(e) =>
                  setFilters({ ...filters, remote: e.target.checked })
                }
              />{" "}
              재택 근무 가능
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" /> 탄력 근무제
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" /> 근로지원인 지원
            </CheckboxLabel>
          </FilterGroup>
        </Sidebar>

        {/* Content Area */}
        <ContentArea>
          <TabSection>
            <Tab
              active={activeTab === "jobs"}
              onClick={() => setActiveTab("jobs")}
            >
              구직 정보
            </Tab>
            <Tab
              active={activeTab === "contests"}
              onClick={() => setActiveTab("contests")}
            >
              공모전
            </Tab>
            <Tab
              active={activeTab === "education"}
              onClick={() => setActiveTab("education")}
            >
              교육 프로그램
            </Tab>
          </TabSection>

          <CountHeader>
            총 <strong>{currentData.length}</strong>건의 공고
          </CountHeader>

          <Grid>
            {currentData.map((item) => (
              <Card
                key={item.id}
                onClick={() => activeTab === "jobs" && handleJobClick(item.id)}
              >
                <div>
                  <CardHeader>
                    <CompanyInfo>
                      <CompanyIcon>
                        {activeTab === "jobs" ? (
                          <Building2 size={24} />
                        ) : (
                          <Briefcase size={24} />
                        )}
                      </CompanyIcon>
                      <div>
                        <CompanyNameText>{item.company}</CompanyNameText>
                        <CardTitle>{item.title}</CardTitle>
                      </div>
                    </CompanyInfo>
                    <Bookmark size={20} color="#ccc" />
                  </CardHeader>

                  <TagsWrapper>
                    {item.tags.map((tag, idx) => {
                      const style = getTagStyle(tag);
                      return (
                        <TagSpan key={idx} bg={style.bg} color={style.color}>
                          #{tag}
                        </TagSpan>
                      );
                    })}
                  </TagsWrapper>
                </div>

                <CardFooter>
                  <Deadline urgent={item.urgent}>
                    <Clock size={16} /> {item.deadline}
                  </Deadline>
                  <ApplyButton>지원하기</ApplyButton>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </ContentArea>
      </MainLayout>
    </Container>
  );
}

export default UserMainPage;
