import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background-color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  color: #667eea;
  font-size: 24px;
  cursor: pointer;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Content = styled.main`
  max-width: 900px;
  margin: 30px auto;
  padding: 0 40px;
`;

const JobHeader = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const JobTitle = styled.h1`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 32px;
`;

const CompanyName = styled.h2`
  margin: 0 0 24px 0;
  color: #667eea;
  font-size: 20px;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 14px 28px;
  background-color: ${props => props.primary ? '#667eea' : props.tts ? '#ff6b6b' : '#f0f0f0'};
  color: ${props => props.primary || props.tts ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const JobInfo = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  margin-bottom: 32px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 8px;
`;

const InfoText = styled.p`
  margin: 0 0 12px 0;
  color: #555;
  font-size: 15px;
  line-height: 1.8;
`;

const SummaryBox = styled.div`
  background-color: #f0f4ff;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin-bottom: 20px;
`;

const SummaryTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #667eea;
  font-size: 16px;
  font-weight: 600;
`;

const SummaryText = styled.p`
  margin: 8px 0;
  color: #555;
  font-size: 14px;
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 6px 16px;
  background-color: #e8f0ff;
  color: #667eea;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
`;

function JobDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTTS = () => {
    setIsSpeaking(!isSpeaking);
    // TTS 로직 구현
    alert(isSpeaking ? 'TTS 중지' : 'TTS 시작 - 공고 내용을 읽어드립니다');
  };

  const handleApply = () => {
    alert('지원이 완료되었습니다!');
  };

  return (
    <Container>
      <Header>
        <Logo onClick={() => navigate('/')}>잡케어</Logo>
        <BackButton onClick={() => navigate(-1)}>← 목록으로</BackButton>
      </Header>

      <Content>
        <JobHeader>
          <JobTitle>웹 프론트엔드 개발자</JobTitle>
          <CompanyName>테크케어</CompanyName>
          
          <InfoText>
            📍 서울 강남구 테헤란로 123<br />
            💰 연봉 3,500~4,500만원<br />
            📆 경력무관 · 정규직<br />
            👥 채용 인원: 2명
          </InfoText>

          <TagList>
            <Tag>♿️ 휠체어 가능</Tag>
            <Tag>🏠 재택 근무</Tag>
            <Tag>🎓 신입 가능</Tag>
            <Tag>🚇 역세권</Tag>
          </TagList>

          <ActionButtons>
            <Button primary onClick={handleApply}>✉️ 지원하기</Button>
            <Button tts onClick={handleTTS}>
              {isSpeaking ? '🔇 읽기 중지' : '🔊 내용 읽어주기'}
            </Button>
          </ActionButtons>
        </JobHeader>

        <SummaryBox>
          <SummaryTitle>🤖 AI 3줄 요약</SummaryTitle>
          <SummaryText>• React 기반 웹 개발 업무로 신입/경력 모두 지원 가능합니다.</SummaryText>
          <SummaryText>• 휠체어 접근 가능하며 주 2~3일 재택근무가 가능합니다.</SummaryText>
          <SummaryText>• 복지가 우수하며, 장애인 채용 우대 기업입니다.</SummaryText>
        </SummaryBox>

        <JobInfo>
          <InfoSection>
            <SectionTitle>주요 업무</SectionTitle>
            <InfoText>
              • React 기반 웹 서비스 프론트엔드 개발<br />
              • 사용자 인터페이스(UI) 구현 및 최적화<br />
              • 백엔드 개발자와 협업하여 API 연동<br />
              • 웹 접근성(WCAG) 준수 및 개선
            </InfoText>
          </InfoSection>

          <InfoSection>
            <SectionTitle>자격 요건</SectionTitle>
            <InfoText>
              • HTML, CSS, JavaScript 기본 지식 보유자<br />
              • React 또는 Vue.js 등 프레임워크 사용 경험 (학습 경험 포함)<br />
              • Git을 활용한 협업 경험<br />
              • 적극적인 커뮤니케이션 능력
            </InfoText>
          </InfoSection>

          <InfoSection>
            <SectionTitle>우대 사항</SectionTitle>
            <InfoText>
              • TypeScript 사용 경험<br />
              • 웹 접근성 관련 개발 경험<br />
              • 포트폴리오 보유자
            </InfoText>
          </InfoSection>

          <InfoSection>
            <SectionTitle>편의시설 및 복지</SectionTitle>
            <InfoText>
              ♿️ <strong>휠체어 접근:</strong> 경사로, 엘리베이터, 전용 화장실 완비<br />
              🏠 <strong>유연근무:</strong> 주 2~3일 재택근무 가능<br />
              🅿️ <strong>주차:</strong> 장애인 전용 주차공간 2개<br />
              🍽️ <strong>식사:</strong> 사내 구내식당 (휠체어 접근 가능)<br />
              💼 <strong>기타:</strong> 보조기기 구입 지원금, 의료비 지원
            </InfoText>
          </InfoSection>

          <InfoSection>
            <SectionTitle>근무 조건</SectionTitle>
            <InfoText>
              • 근무 시간: 09:00 ~ 18:00 (주 5일, 주 40시간)<br />
              • 근무 형태: 정규직<br />
              • 시작일: 협의 후 결정<br />
              • 연봉: 경력에 따라 협의 (3,500만원~)
            </InfoText>
          </InfoSection>
        </JobInfo>
      </Content>
    </Container>
  );
}

export default JobDetailPage;
