import styled from "@emotion/styled";
import { FileText, Users, ChevronRight } from "lucide-react";
import CompanyLayout from "../../shared/CompanyHeader";

const DashboardBody = styled.div`
  padding: 40px;
  overflow-y: auto;
`;

// Stats Card (Total Applicants)
const MainStatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1rem;
    color: #718096;
    margin-bottom: 12px;
    font-weight: 600;
  }
  .number {
    font-size: 3rem;
    font-weight: 800;
    color: #2d3748;
    line-height: 1;
    margin-bottom: 12px;
  }
  .sub {
    font-size: 0.95rem;
    color: #00a84e;
    font-weight: 600;
  } /* Green text */
`;

const IconBox = styled.div`
  width: 64px;
  height: 64px;
  background: #f0f4ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b4da2;
`;

// Recent Applicants Section
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  button {
    color: #4a5568;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
`;

const ApplicantList = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr;
  padding: 20px 32px;
  border-bottom: 1px solid #edf2f7;
  font-size: 0.85rem;
  font-weight: 700;
  color: #718096;
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr;
  padding: 20px 32px;
  border-bottom: 1px solid #edf2f7;
  align-items: center;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #f8fafc;
    cursor: pointer;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.bg || "#4299e1"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
`;

const UserName = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #2d3748;
`;

const TextCell = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;

  /* Status Colors */
  background-color: ${(props) =>
    props.status === "review"
      ? "#eef6ff"
      : props.status === "interview"
        ? "#e6fffa"
        : "#fff5f5"};
  color: ${(props) =>
    props.status === "review"
      ? "#3182ce"
      : props.status === "interview"
        ? "#2c7a7b"
        : "#718096"};
  border: 1px solid
    ${(props) =>
      props.status === "review"
        ? "#bee3f8"
        : props.status === "interview"
          ? "#b2f5ea"
          : "#edf2f7"};
`;

function CompanyDashboardPage() {
  const applicants = [
    {
      id: 1,
      name: "이수현",
      initial: "이",
      bg: "#4299e1",
      role: "프론트엔드 개발",
      type: "지체장애",
      date: "2026.02.06",
      status: "review",
      statusText: "서류 검토중",
    },
    {
      id: 2,
      name: "김민준",
      initial: "김",
      bg: "#00a84e",
      role: "데이터 분석",
      type: "청각장애",
      date: "2026.02.05",
      status: "interview",
      statusText: "면접 예정",
    },
    {
      id: 3,
      name: "박지민",
      initial: "박",
      bg: "#a0aec0",
      role: "서비스직",
      type: "시각장애",
      date: "2026.02.04",
      status: "fail",
      statusText: "불합격",
    },
    {
      id: 4,
      name: "최우진",
      initial: "최",
      bg: "#805ad5",
      role: "백엔드 개발",
      type: "지체장애",
      date: "2026.02.03",
      status: "review",
      statusText: "서류 검토중",
    },
  ];

  const headerSubtitle = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <CompanyLayout
      headerTitle="안녕하세요, 관리자님"
      headerSubtitle={headerSubtitle}
    >
      <DashboardBody>
          {/* Total Count Card */}
          <MainStatCard>
            <StatInfo>
              <h3>총 지원자 수</h3>
              <div className="number">12</div>
              <div className="sub">오늘 신규 지원 +3명</div>
            </StatInfo>
            <IconBox>
              <Users size={32} />
            </IconBox>
          </MainStatCard>

          {/* Recent Applicants List */}
          <SectionHeader>
            <h3>
              <FileText size={20} /> 최근 지원자 현황
            </h3>
            <button>
              전체보기 <ChevronRight size={16} />
            </button>
          </SectionHeader>

          <ApplicantList>
            <ListHeader>
              <div>이름</div>
              <div>지원 직무</div>
              <div>장애 유형</div>
              <div>지원 날짜</div>
              <div style={{ textAlign: "center" }}>상태</div>
            </ListHeader>

            {applicants.map((item) => (
              <ListItem key={item.id}>
                <UserProfile>
                  <Avatar bg={item.bg}>{item.initial}</Avatar>
                  <UserName>{item.name}</UserName>
                </UserProfile>
                <TextCell>{item.role}</TextCell>
                <TextCell>{item.type}</TextCell>
                <TextCell>{item.date}</TextCell>
                <div style={{ textAlign: "center" }}>
                  <StatusBadge status={item.status}>
                    {item.statusText}
                  </StatusBadge>
                </div>
              </ListItem>
            ))}
          </ApplicantList>
      </DashboardBody>
    </CompanyLayout>
  );
}

export default CompanyDashboardPage;
