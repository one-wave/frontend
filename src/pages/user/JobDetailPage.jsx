import styled from "@emotion/styled";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { getResumes } from "../../api/Auth";
import { api } from "../../api/Http";
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
  const location = useLocation();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // UserMainPage에서 전달받은 데이터
  const { jobData, matchScore } = location.state || {};
  
  // 데이터가 없으면 (직접 URL 접근) API 호출 필요
  if (!jobData) {
    // TODO: API로 jobId를 사용해 데이터 가져오기
  }

  // 급여 표시
  const salaryDisplay = jobData 
    ? `${jobData.salaryType} ${(jobData.salary / 10000).toLocaleString()}만원`
    : "2,400만원 ~ 2,800만원";

  // 마감일 계산
  let deadline = "마감";
  let daysLeft = 0;
  if (jobData?.offerEndDt) {
    const dateStr = String(jobData.offerEndDt);
    const endDate = new Date(
      dateStr.substring(0, 4),
      parseInt(dateStr.substring(4, 6)) - 1,
      dateStr.substring(6, 8)
    );
    const today = new Date();
    daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    deadline = daysLeft > 0 ? `D-${daysLeft}` : "마감";
  }

  const handleTTS = () => {
    setIsSpeaking(!isSpeaking);
    alert(isSpeaking ? "TTS 중지" : "공고 내용을 읽어드립니다.");
  };

  const handleApply = async () => {
    try {
      // 1. 이력서 목록 조회
      const { data: resumes } = await getResumes();
      const resumeList = Array.isArray(resumes) ? resumes : [];
      
      // 2. 대표 이력서 찾기
      const representativeResume = resumeList.find(r => r.isRepresentative) || resumeList[0];
      
      if (!representativeResume) {
        alert("이력서가 없습니다. 먼저 이력서를 작성해주세요.");
        navigate("/user/resumes/create");
        return;
      }
      
      const payload = {
        jobPostId: jobId,
        resumeId: representativeResume.resumeId
      };
      
      // 3. 지원하기 POST 요청
      await api.post("/applications", payload);
      
      alert("지원이 완료되었습니다!");
      // 필요시 지원 내역 페이지로 이동
      // navigate("/user/applications");
      
    } catch (error) {
      console.error("지원 실패:", error);
      console.error("에러 응답 데이터:", error.response?.data);
      console.error("에러 상태 코드:", error.response?.status);
      
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
      } else if (error.response?.status === 409 || error.response?.status === 500) {
        alert("이미 지원한 공고입니다.");
      } else {
        alert("지원에 실패했습니다. 다시 시도해주세요.");
      }
    }
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
            <CompanyName>{jobData?.companyName || "한국장애인고용공단"}</CompanyName>
          </CompanyInfo>

          <JobTitle>{jobData?.jobNm || "행정 사무 보조원"}</JobTitle>

          <BadgeContainer>
            {daysLeft > 0 && daysLeft <= 7 && (
              <Badge type="d-day">⏰ 마감 임박 {deadline}</Badge>
            )}
            {jobData?.jobLocation && (
              <Badge type="location">📍 {jobData.jobLocation}</Badge>
            )}
            {jobData?.empType && (
              <Badge type="blue">#{jobData.empType}</Badge>
            )}
            {jobData?.reqCareer && (
              <Badge type="orange">#{jobData.reqCareer}</Badge>
            )}
            {matchScore && (
              <Badge type="blue">🎯 매칭점수 {matchScore}점</Badge>
            )}
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
              <InfoValue>{salaryDisplay}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <Briefcase size={16} /> 고용 형태
              </InfoLabel>
              <InfoValue>{jobData?.empType || "계약직"}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <Clock size={16} /> 학력
              </InfoLabel>
              <InfoValue>{jobData?.reqEduc || "무관"}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>
                <MapPin size={16} /> 근무지
              </InfoLabel>
              <InfoValue>{jobData?.jobLocation || "서울"}</InfoValue>
            </InfoBox>
          </GridInfo>
        </SectionCard>

        {/* 하단 액션 버튼 */}
        <ActionContainer>
          <ScrapButton onClick={() => alert("스크랩 되었습니다.")}>
            <Bookmark size={20} /> 스크랩
          </ScrapButton>
          <ApplyButton onClick={handleApply}>
            지원하기
          </ApplyButton>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default JobDetailPage;
