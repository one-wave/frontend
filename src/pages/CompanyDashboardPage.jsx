import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

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
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#667eea' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: ${props => props.primary ? 'none' : '2px solid #667eea'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const Content = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
`;

const PageTitle = styled.h1`
  margin: 0 0 32px 0;
  color: #333;
  font-size: 32px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  padding: 32px;
  border-radius: 16px;
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  opacity: 0.9;
`;

const ChartSection = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #333;
  font-size: 24px;
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
  font-weight: 600;
`;

const TableSection = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #f8f9fa;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
`;

const Badge = styled.span`
  padding: 6px 12px;
  background-color: ${props => {
    if (props.status === 'new') return '#e3f2fd';
    if (props.status === 'reviewing') return '#fff3e0';
    return '#e8f5e9';
  }};
  color: ${props => {
    if (props.status === 'new') return '#1976d2';
    if (props.status === 'reviewing') return '#f57c00';
    return '#388e3c';
  }};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

function CompanyDashboardPage() {
  const navigate = useNavigate();

  const recentApplications = [
    { id: 1, name: '김민수', position: '웹 프론트엔드 개발자', date: '2024-02-05', status: 'new' },
    { id: 2, name: '이지은', position: '데이터 분석가', date: '2024-02-04', status: 'reviewing' },
    { id: 3, name: '박준형', position: '고객 상담원', date: '2024-02-03', status: 'reviewed' },
    { id: 4, name: '최서연', position: '콘텐츠 기획자', date: '2024-02-02', status: 'new' },
  ];

  const getStatusText = (status) => {
    if (status === 'new') return '신규';
    if (status === 'reviewing') return '검토중';
    return '검토완료';
  };

  return (
    <Container>
      <Header>
        <Logo>잡케어 기업</Logo>
        <HeaderButtons>
          <Button onClick={() => navigate('/company/job-post')}>
            ✏️ 공고 등록
          </Button>
          <Button primary onClick={() => navigate('/login')}>
            로그아웃
          </Button>
        </HeaderButtons>
      </Header>

      <Content>
        <PageTitle>대시보드</PageTitle>

        <StatsGrid>
          <StatCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <StatValue>24</StatValue>
            <StatLabel>📝 총 지원자 수</StatLabel>
          </StatCard>

          <StatCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <StatValue>8</StatValue>
            <StatLabel>👥 오늘 본 면접</StatLabel>
          </StatCard>

          <StatCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <StatValue>3.2%</StatValue>
            <StatLabel>📊 장애인 고용률</StatLabel>
          </StatCard>

          <StatCard gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            <StatValue>₩240만</StatValue>
            <StatLabel>💰 예상 지원금</StatLabel>
          </StatCard>
        </StatsGrid>

        <ChartSection>
          <SectionTitle>📈 월별 장애인 고용 현황</SectionTitle>
          <ChartPlaceholder>
            📊 차트 영역 (Chart.js 또는 Recharts 연동 가능)
          </ChartPlaceholder>
        </ChartSection>

        <TableSection>
          <SectionTitle>최근 지원자 목록</SectionTitle>
          <Table>
            <thead>
              <tr>
                <Th>지원자명</Th>
                <Th>지원 직무</Th>
                <Th>지원일</Th>
                <Th>상태</Th>
                <Th>액션</Th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map(app => (
                <tr key={app.id}>
                  <Td>{app.name}</Td>
                  <Td>{app.position}</Td>
                  <Td>{app.date}</Td>
                  <Td>
                    <Badge status={app.status}>
                      {getStatusText(app.status)}
                    </Badge>
                  </Td>
                  <Td>
                    <Button style={{ padding: '6px 12px', fontSize: '13px' }}>
                      상세보기
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableSection>
      </Content>
    </Container>
  );
}

export default CompanyDashboardPage;
