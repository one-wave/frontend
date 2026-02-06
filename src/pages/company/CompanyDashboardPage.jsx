import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, ChevronRight, Briefcase } from "lucide-react";
import CompanyLayout from "../../shared/CompanyHeader";
import { getCompanyApiBaseUrl } from "../../api/Http";

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

const JobSection = styled.div`
  margin-bottom: 40px;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
  overflow: hidden;
`;

const JobCardHeader = styled.div`
  padding: 24px 32px;
  border-bottom: 2px solid #edf2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

const JobTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
  }

  span {
    font-size: 0.85rem;
    color: #718096;
    font-weight: 500;
  }
`;

const ApplicantCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #3182ce;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr;
  padding: 20px 32px;
  border-bottom: 1px solid #edf2f7;
  font-size: 0.85rem;
  font-weight: 700;
  color: #718096;
  background: #f8fafc;
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

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  font-size: 0.95rem;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  color: #e53e3e;
  font-size: 0.95rem;
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  font-size: 0.95rem;
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
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({}); // job_post_id를 키로 하는 지원자 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobs, setExpandedJobs] = useState(new Set()); // 펼쳐진 공고 ID들
  const [totalApplicants, setTotalApplicants] = useState(0);

  // 공고 목록 가져오기
  useEffect(() => {
    const fetchCompanyJobs = async () => {
      const companyAuthCode = localStorage.getItem("companyAuthCode");
      if (!companyAuthCode) {
        setError("기업 인증 정보가 없습니다. 다시 로그인해주세요.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("companyToken");
        const apiBaseUrl = getCompanyApiBaseUrl();
        const res = await fetch(`${apiBaseUrl}/api/enterprise/company/job`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        if (!res.ok) {
          throw new Error("공고 목록을 불러오지 못했습니다.");
        }

        const data = await res.json();
        const allJobs = Array.isArray(data.data) ? data.data : [];

        const filtered = allJobs.filter(
          (job) => job.company_id === companyAuthCode
        );

        setJobs(filtered);

        // TODO: 실제 지원자 정보 API 연동 필요
        // 임시로 더미 데이터 사용
        const dummyApplicants = {};
        let totalCount = 0;
        filtered.forEach((job) => {
          // 각 공고별 지원자 정보 (실제 API 연동 시 수정 필요)
          const jobApplicants = [
            {
              id: `${job.job_post_id}-1`,
              name: "이수현",
              initial: "이",
              bg: "#4299e1",
              role: job.job_nm || "지원 직무",
              type: "지체장애",
              date: new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).replace(/\./g, ".").replace(/\s/g, ""),
              status: "review",
              statusText: "서류 검토중",
              jobPostId: job.job_post_id,
            },
            {
              id: `${job.job_post_id}-2`,
              name: "김민준",
              initial: "김",
              bg: "#00a84e",
              role: job.job_nm || "지원 직무",
              type: "청각장애",
              date: new Date(Date.now() - 86400000).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).replace(/\./g, ".").replace(/\s/g, ""),
              status: "interview",
              statusText: "면접 예정",
              jobPostId: job.job_post_id,
            },
          ];
          dummyApplicants[job.job_post_id] = jobApplicants;
          totalCount += jobApplicants.length;
        });
        setApplicants(dummyApplicants);
        setTotalApplicants(totalCount);
      } catch (err) {
        console.error(err);
        setError("공고 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, []);

  const toggleJobExpansion = (jobPostId) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobPostId)) {
      newExpanded.delete(jobPostId);
    } else {
      newExpanded.add(jobPostId);
    }
    setExpandedJobs(newExpanded);
  };

  const handleApplicantClick = (applicant) => {
    // 지원자 상세 페이지로 이동 (경로는 실제 구조에 맞게 수정 필요)
    navigate(`/company/dashboard/applicant/${applicant.id}`, {
      state: { applicant, jobPostId: applicant.jobPostId },
    });
  };

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
              <div className="number">{totalApplicants}</div>
              <div className="sub">등록된 공고: {jobs.length}개</div>
            </StatInfo>
            <IconBox>
              <Users size={32} />
            </IconBox>
          </MainStatCard>

          {/* Jobs and Applicants List */}
          <SectionHeader>
            <h3>
              <FileText size={20} /> 공고별 지원자 현황
            </h3>
            <button onClick={() => navigate("/company/job-post")}>
              공고 관리 <ChevronRight size={16} />
            </button>
          </SectionHeader>

          {loading && <LoadingText>공고 목록을 불러오는 중입니다...</LoadingText>}
          {error && <ErrorText>{error}</ErrorText>}
          {!loading && !error && jobs.length === 0 && (
            <EmptyText>등록된 공고가 없습니다.</EmptyText>
          )}

          {!loading && !error && jobs.length > 0 && (
            <>
              {jobs.map((job) => {
                const jobApplicants = applicants[job.job_post_id] || [];
                const isExpanded = expandedJobs.has(job.job_post_id);

                return (
                  <JobSection key={job.job_post_id}>
                    <JobCard>
                      <JobCardHeader onClick={() => toggleJobExpansion(job.job_post_id)}>
                        <JobTitle>
                          <Briefcase size={20} color="#3182ce" />
                          <div>
                            <h4>{job.job_nm || "공고 제목 없음"}</h4>
                            <span>{job.job_location} · {job.emp_type}</span>
                          </div>
                        </JobTitle>
                        <ApplicantCount>
                          <Users size={18} />
                          지원자 {jobApplicants.length}명
                          <ChevronRight 
                            size={18} 
                            style={{ 
                              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform 0.2s"
                            }} 
                          />
                        </ApplicantCount>
                      </JobCardHeader>

                      {isExpanded && jobApplicants.length > 0 && (
                        <>
                          <ListHeader>
                            <div>이름</div>
                            <div>지원 직무</div>
                            <div>장애 유형</div>
                            <div>지원 날짜</div>
                            <div style={{ textAlign: "center" }}>상태</div>
                          </ListHeader>

                          {jobApplicants.map((applicant) => (
                            <ListItem 
                              key={applicant.id}
                              onClick={() => handleApplicantClick(applicant)}
                            >
                              <UserProfile>
                                <Avatar bg={applicant.bg}>{applicant.initial}</Avatar>
                                <UserName>{applicant.name}</UserName>
                              </UserProfile>
                              <TextCell>{applicant.role}</TextCell>
                              <TextCell>{applicant.type}</TextCell>
                              <TextCell>{applicant.date}</TextCell>
                              <div style={{ textAlign: "center" }}>
                                <StatusBadge status={applicant.status}>
                                  {applicant.statusText}
                                </StatusBadge>
                              </div>
                            </ListItem>
                          ))}
                        </>
                      )}

                      {isExpanded && jobApplicants.length === 0 && (
                        <EmptyText style={{ padding: "40px" }}>
                          아직 지원자가 없습니다.
                        </EmptyText>
                      )}
                    </JobCard>
                  </JobSection>
                );
              })}
            </>
          )}
      </DashboardBody>
    </CompanyLayout>
  );
}

export default CompanyDashboardPage;
