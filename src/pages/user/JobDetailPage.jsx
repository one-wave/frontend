import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../shared/Header";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  Volume2,
  Bookmark,
  ChevronLeft,
  Bot,
  CreditCard,
} from "lucide-react";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 40px;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const TopNav = styled.div`
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: white;
  color: #555;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// 1. 공고 헤더 카드
const JobHeaderCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  position: relative;
`;

const TTSButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #2e7d32;
  background-color: white;
  color: #2e7d32;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #e8f5e9;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const CompanyIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #eff6ff;
  color: #0b4da2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompanyName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #555;
`;

const JobTitle = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #222;
  margin: 0 0 16px 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;

  /* Badge Variants */
  ${(props) =>
    props.type === "d-day" &&
    `
    background-color: #fff1f0;
    color: #f5222d;
  `}
  ${(props) =>
    props.type === "location" &&
    `
    background-color: #f5f5f5;
    color: #666;
  `}
  ${(props) =>
    props.type === "blue" &&
    `
    background-color: #e6f7ff;
    color: #1890ff;
  `}
  ${(props) =>
    props.type === "orange" &&
    `
    background-color: #fff7e6;
    color: #fa8c16;
  `}
`;

// 2. AI 요약 박스
const SummaryBox = styled.div`
  background-color: #f0f7ff;
  border: 1px solid #bae7ff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
`;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #0b4da2;
  font-weight: 700;
  font-size: 16px;
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SummaryItem = styled.li`
  display: flex;
  gap: 12px;
  font-size: 15px;
  color: #333;
  line-height: 1.5;
`;

const NumberCircle = styled.span`
  background-color: #0b4da2;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
`;

// 3. 일반 정보 섹션 (흰색 카드)
const SectionCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #eee;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

// 채용 요약 그리드
const GridInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-left: 22px; /* 아이콘 크기만큼 들여쓰기 */
`;

const TextContent = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #444;
  white-space: pre-line;
  margin: 0;
`;

const BulletList = styled.ul`
  padding-left: 20px;
  margin: 0;
  color: #444;
  line-height: 1.8;

  li {
    margin-bottom: 6px;
  }
`;

// 하단 액션 버튼
const ActionContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

const ScrapButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ApplyButton = styled.button`
  flex: 3;
  padding: 16px;
  background-color: #00796b; /* 디자인의 진한 녹색 */
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 121, 107, 0.2);

  &:hover {
    background-color: #00695c;
  }
`;

function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTTS = () => {
    setIsSpeaking(!isSpeaking);
    alert(isSpeaking ? "TTS 중지" : "공고 내용을 읽어드립니다.");
  };

  return (
    <Container>
      <Header />

      <Content>
        {/* 상단 네비게이션 */}
        <TopNav>
          <BackButton onClick={() => navigate("/")}>
            <ChevronLeft size={16} /> 공고 목록으로
          </BackButton>
        </TopNav>

        {/* 1. 헤더 카드 */}
        <JobHeaderCard>
          <CompanyInfo>
            <CompanyIcon>
              <Building2 size={16} />
            </CompanyIcon>
            <CompanyName>한국장애인고용공단</CompanyName>
          </CompanyInfo>

          <JobTitle>행정 사무 보조원</JobTitle>

          <BadgeContainer>
            <Badge type="d-day">⏰ 마감 임박 D-3</Badge>
            <Badge type="location">📍 서울 영등포구</Badge>
            <Badge type="blue">#휠체어접근가능</Badge>
            <Badge type="orange">#근로지원인지원</Badge>
          </BadgeContainer>

          <TTSButton onClick={handleTTS}>
            {isSpeaking ? (
              <>🔇 읽기 중지</>
            ) : (
              <>
                <Volume2 size={16} /> 이 공고 듣기
              </>
            )}
          </TTSButton>
        </JobHeaderCard>

        {/* 2. AI 요약 */}
        <SummaryBox>
          <SummaryHeader>
            <Bot size={20} /> AI 3줄 요약
          </SummaryHeader>
          <SummaryList>
            <SummaryItem>
              <NumberCircle>1</NumberCircle>
              일반 사무 행정 업무(문서 작성, 데이터 입력, 전화 응대)를 담당하며,
              특별한 경력이 필요하지 않습니다.
            </SummaryItem>
            <SummaryItem>
              <NumberCircle>2</NumberCircle>
              근로지원인이 상시 배치되어 업무 중 필요한 보조를 받을 수 있습니다.
            </SummaryItem>
            <SummaryItem>
              <NumberCircle>3</NumberCircle>
              건물 전체가 휠체어 접근 가능하며, 장애 유형별 맞춤 보조기기가
              지원됩니다.
            </SummaryItem>
          </SummaryList>
        </SummaryBox>

        {/* 3. 채용 요약 (Grid) */}
        <SectionCard>
          <SectionTitle>
            <Briefcase size={20} /> 채용 요약
          </SectionTitle>
          <GridInfo>
            <InfoBox>
              <InfoLabel>
                <CreditCard size={16} /> 급여
              </InfoLabel>
              <InfoValue>2,400만원 ~ 2,800만원</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <Briefcase size={16} /> 고용 형태
              </InfoLabel>
              <InfoValue>계약직 (정규직 전환 가능)</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <Clock size={16} /> 근무 시간
              </InfoLabel>
              <InfoValue>주 35시간</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <MapPin size={16} /> 근무지
              </InfoLabel>
              <InfoValue>서울 영등포구</InfoValue>
            </InfoBox>
          </GridInfo>
        </SectionCard>

        {/* 4. 업무 내용 */}
        <SectionCard>
          <SectionTitle>
            <Briefcase size={20} /> 업무 내용
          </SectionTitle>
          <TextContent>
            한국장애인고용공단은 장애인의 직업 안정을 위해 설립된
            공공기관입니다. 행정 사무 보조원으로서 부서 내 일반 행정 업무를
            지원하게 됩니다.
            <br />
            <br />
            주요 업무로는 문서 작성 및 정리, 데이터 입력 및 관리, 내방객 안내,
            전화 응대, 회의 자료 준비 등이 있습니다. 업무 강도는 높지 않으며,
            충분한 교육 기간이 제공됩니다.
          </TextContent>
        </SectionCard>

        {/* 5. 자격 요건 & 우대 사항 */}
        <SectionCard>
          <SectionTitle>
            <div style={{ marginRight: "8px" }}>✅</div> 자격 요건
          </SectionTitle>
          <BulletList>
            <li>기본적인 컴퓨터 활용 능력 (한글, 엑셀 등)</li>
            <li>성실하고 책임감 있는 업무 태도</li>
            <li>원활한 의사소통 능력</li>
          </BulletList>
          <div style={{ height: "30px" }} /> {/* 간격 */}
          <SectionTitle>
            <div style={{ marginRight: "8px" }}>⭐</div> 우대 사항
          </SectionTitle>
          <BulletList>
            <li>행정 또는 사무 관련 경험</li>
            <li>공공기관 근무 경험</li>
            <li>관련 자격증 보유자 (ITQ, 워드프로세서 등)</li>
          </BulletList>
        </SectionCard>

        {/* 6. 근무 환경 */}
        <SectionCard>
          <SectionTitle>
            <div style={{ marginRight: "8px" }}>♿</div> 근무 환경 및 편의 시설
          </SectionTitle>
          <BulletList>
            <li>건물 전체 휠체어 접근 가능 (자동문, 엘리베이터)</li>
            <li>근로지원인 상시 배치</li>
            <li>장애 유형별 맞춤 보조기기 지원</li>
          </BulletList>
        </SectionCard>

        {/* 하단 액션 버튼 */}
        <ActionContainer>
          <ScrapButton onClick={() => alert("스크랩 되었습니다.")}>
            <Bookmark size={20} /> 스크랩
          </ScrapButton>
          <ApplyButton onClick={() => alert("지원 페이지로 이동합니다.")}>
            지원하기
          </ApplyButton>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default JobDetailPage;
