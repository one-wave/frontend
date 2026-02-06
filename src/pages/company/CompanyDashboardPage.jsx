import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, ChevronRight, Briefcase, ChevronDown, Mail, Phone, Calendar } from "lucide-react";
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
  padding: 24px 32px;
  border-bottom: 1px solid #edf2f7;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #f8fafc;
  }
`;

const ApplicantRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr;
  align-items: center;
  gap: 16px;
`;

const ApplicantDetails = styled.div`
  margin-top: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #4a5568;

  svg {
    color: #718096;
    width: 16px;
    height: 16px;
  }
`;

const StatusSelect = styled.select`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  background: white;
  color: #2d3748;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const StatusOption = styled.option`
  padding: 8px;
`;

const StatusControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #4a5568;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #3182ce;
  }
`;

const SubmitButton = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #3182ce;
  color: white;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StatusDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const getStatusColor = (status) => {
  const statusMap = {
    "서류 대기중": { bg: "#f7fafc", color: "#718096", border: "#edf2f7" },
    "서류 검토중": { bg: "#eef6ff", color: "#3182ce", border: "#bee3f8" },
    "서류 합격": { bg: "#e6fffa", color: "#2c7a7b", border: "#b2f5ea" },
    "서류 불합격": { bg: "#fff5f5", color: "#e53e3e", border: "#fc8181" },
    "면접 예정": { bg: "#fef3c7", color: "#d97706", border: "#fcd34d" },
    "최종 합격": { bg: "#d1fae5", color: "#065f46", border: "#6ee7b7" },
  };
  return statusMap[status] || { bg: "#f7fafc", color: "#718096", border: "#edf2f7" };
};

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.border};
`;

const ExpandableRow = styled.div`
  cursor: pointer;
`;

const ExpandedContent = styled.div`
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid #edf2f7;
`;

function CompanyDashboardPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState({}); // job_post_id를 키로 하는 지원자 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobs, setExpandedJobs] = useState(new Set()); // 펼쳐진 공고 ID들
  const [expandedApplicants, setExpandedApplicants] = useState(new Set()); // 펼쳐진 지원자 ID들
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [loadingApplicants, setLoadingApplicants] = useState({}); // 각 공고별 로딩 상태
  const [pendingStatusChanges, setPendingStatusChanges] = useState({}); // 변경 대기 중인 상태들 (application_id: newStatus)
  const [statusConfirmations, setStatusConfirmations] = useState({}); // 확인 체크박스 상태 (application_id: boolean)
  const [updatingStatus, setUpdatingStatus] = useState(new Set()); // 업데이트 중인 application_id들

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
        setTotalApplicants(0);
      } catch (err) {
        console.error(err);
        setError("공고 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyJobs();
  }, []);

  // 공고별 지원자 정보 가져오기
  const fetchApplicantsForJob = async (jobPostId) => {
    if (applicants[jobPostId]) {
      return; // 이미 로드된 경우 스킵
    }

    try {
      setLoadingApplicants((prev) => ({ ...prev, [jobPostId]: true }));
      const token = localStorage.getItem("companyToken");
      const apiBaseUrl = getCompanyApiBaseUrl();
      const res = await fetch(
        `${apiBaseUrl}/api/enterprise/company/job/${jobPostId}/applications`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        }
      );

      if (!res.ok) {
        throw new Error("지원자 정보를 불러오지 못했습니다.");
      }

      const data = await res.json();
      const applications = Array.isArray(data.data) ? data.data : [];

      // 지원자 정보 변환
      const formattedApplicants = applications.map((app) => {
        const fullName = `${app.last_name || ""}${app.first_name || ""}`.trim() || "이름 없음";
        const initial = fullName.charAt(0) || "?";
        const appliedDate = app.applied_at
          ? new Date(app.applied_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).replace(/\./g, ".").replace(/\s/g, "")
          : "날짜 없음";

        // 장애 유형 추정 (작업 환경 정보 기반)
        const getDisabilityType = () => {
          // 실제로는 사용자 프로필에서 가져와야 하지만, 여기서는 작업 환경 정보로 추정
          if (app.env_eye_sight && app.env_eye_sight !== "NORMAL") return "시각장애";
          if (app.env_lstn_talk && app.env_lstn_talk !== "NORMAL") return "청각장애";
          if (app.env_stnd_walk && app.env_stnd_walk !== "NORMAL") return "지체장애";
          return "정보 없음";
        };

        return {
          application_id: app.application_id,
          user_id: app.user_id,
          job_post_id: app.job_post_id,
          name: fullName,
          initial: initial,
          bg: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          role: jobs.find((j) => j.job_post_id === jobPostId)?.job_nm || "지원 직무",
          type: getDisabilityType(),
          date: appliedDate,
          status: app.status || "서류 대기중", // API에서 받은 상태 사용
          email: app.user_email_contact || "",
          phone: app.user_phone || "",
          applied_at: app.applied_at,
          resume_snapshot: app.resume_snapshot,
          env_info: {
            env_both_hands: app.env_both_hands,
            env_eye_sight: app.env_eye_sight,
            env_hand_work: app.env_hand_work,
            env_lift_power: app.env_lift_power,
            env_lstn_talk: app.env_lstn_talk,
            env_stnd_walk: app.env_stnd_walk,
          },
        };
      });

      setApplicants((prev) => {
        const updated = {
          ...prev,
          [jobPostId]: formattedApplicants,
        };
        // 총 지원자 수 계산
        const total = Object.values(updated).reduce((sum, arr) => sum + (arr?.length || 0), 0);
        setTotalApplicants(total);
        return updated;
      });
    } catch (err) {
      console.error(`공고 ${jobPostId}의 지원자 정보 로드 실패:`, err);
      setApplicants((prev) => ({
        ...prev,
        [jobPostId]: [],
      }));
    } finally {
      setLoadingApplicants((prev) => ({ ...prev, [jobPostId]: false }));
    }
  };

  const toggleJobExpansion = async (jobPostId) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobPostId)) {
      newExpanded.delete(jobPostId);
    } else {
      newExpanded.add(jobPostId);
      // 공고를 펼칠 때 지원자 정보 가져오기
      await fetchApplicantsForJob(jobPostId);
    }
    setExpandedJobs(newExpanded);
  };

  const toggleApplicantExpansion = (applicationId) => {
    const newExpanded = new Set(expandedApplicants);
    if (newExpanded.has(applicationId)) {
      newExpanded.delete(applicationId);
    } else {
      newExpanded.add(applicationId);
    }
    setExpandedApplicants(newExpanded);
  };

  const handleStatusSelectChange = (applicationId, newStatus) => {
    // 상태 선택 시 pendingStatusChanges에 저장 (아직 전송하지 않음)
    setPendingStatusChanges((prev) => ({
      ...prev,
      [applicationId]: newStatus,
    }));
    // 확인 체크박스 초기화
    setStatusConfirmations((prev) => ({
      ...prev,
      [applicationId]: false,
    }));
  };

  const handleStatusConfirmationChange = (applicationId, checked) => {
    setStatusConfirmations((prev) => ({
      ...prev,
      [applicationId]: checked,
    }));
  };

  const handleStatusSubmit = async (applicationId, jobPostId) => {
    const newStatus = pendingStatusChanges[applicationId];
    const isConfirmed = statusConfirmations[applicationId];

    if (!newStatus) {
      alert("상태를 선택해주세요.");
      return;
    }

    if (!isConfirmed) {
      alert("확인 체크박스를 선택해주세요.");
      return;
    }

    try {
      setUpdatingStatus((prev) => new Set(prev).add(applicationId));
      const token = localStorage.getItem("companyToken");
      const apiBaseUrl = getCompanyApiBaseUrl();

      const res = await fetch(
        `${apiBaseUrl}/api/enterprise/company/application/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "상태 업데이트에 실패했습니다.");
      }

      // 성공 시 로컬 상태 업데이트
      setApplicants((prev) => {
        const jobApplicants = prev[jobPostId] || [];
        const updated = jobApplicants.map((app) =>
          app.application_id === applicationId
            ? { ...app, status: newStatus }
            : app
        );
        return {
          ...prev,
          [jobPostId]: updated,
        };
      });

      // pending 상태 제거
      setPendingStatusChanges((prev) => {
        const updated = { ...prev };
        delete updated[applicationId];
        return updated;
      });
      setStatusConfirmations((prev) => {
        const updated = { ...prev };
        delete updated[applicationId];
        return updated;
      });

      alert("상태가 성공적으로 업데이트되었습니다.");
    } catch (err) {
      console.error("상태 업데이트 실패:", err);
      alert(err.message || "상태 업데이트에 실패했습니다.");
    } finally {
      setUpdatingStatus((prev) => {
        const updated = new Set(prev);
        updated.delete(applicationId);
        return updated;
      });
    }
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

                      {isExpanded && (
                        <>
                          {loadingApplicants[job.job_post_id] ? (
                            <LoadingText style={{ padding: "40px" }}>
                              지원자 정보를 불러오는 중...
                            </LoadingText>
                          ) : jobApplicants.length > 0 ? (
                            <>
            <ListHeader>
              <div>이름</div>
              <div>지원 직무</div>
              <div>장애 유형</div>
              <div>지원 날짜</div>
              <div style={{ textAlign: "center" }}>상태</div>
            </ListHeader>

                              {jobApplicants.map((applicant) => {
                                const isExpanded = expandedApplicants.has(applicant.application_id);
                                const pendingStatus = pendingStatusChanges[applicant.application_id];
                                const displayStatus = pendingStatus || applicant.status;
                                const statusColor = getStatusColor(displayStatus);
                                const hasStatusChange = pendingStatus && pendingStatus !== applicant.status;
                                const isConfirmed = statusConfirmations[applicant.application_id] || false;
                                const isUpdating = updatingStatus.has(applicant.application_id);

                                return (
                                  <ListItem key={applicant.application_id}>
                                    <ApplicantRow>
                                      <ExpandableRow
                                        onClick={() => toggleApplicantExpansion(applicant.application_id)}
                                      >
                <UserProfile>
                                          <Avatar bg={applicant.bg}>{applicant.initial}</Avatar>
                                          <UserName>{applicant.name}</UserName>
                                          <ChevronDown
                                            size={16}
                                            style={{
                                              marginLeft: "8px",
                                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                              transition: "transform 0.2s",
                                              color: "#718096",
                                            }}
                                          />
                </UserProfile>
                                      </ExpandableRow>
                                      <TextCell>{applicant.role}</TextCell>
                                      <TextCell>{applicant.type}</TextCell>
                                      <TextCell>{applicant.date}</TextCell>
                                      <div style={{ textAlign: "center" }}>
                                        <StatusControlGroup onClick={(e) => e.stopPropagation()}>
                                          <StatusDisplay>
                                            <StatusBadge
                                              bg={statusColor.bg}
                                              color={statusColor.color}
                                              border={statusColor.border}
                                            >
                                              {displayStatus}
                                            </StatusBadge>
                                          </StatusDisplay>
                                          <StatusSelect
                                            value={pendingStatus || applicant.status}
                                            onChange={(e) =>
                                              handleStatusSelectChange(
                                                applicant.application_id,
                                                e.target.value
                                              )
                                            }
                                            style={{
                                              minWidth: "140px",
                                            }}
                                          >
                                            <StatusOption value="서류 대기중">서류 대기중</StatusOption>
                                            <StatusOption value="서류 검토중">서류 검토중</StatusOption>
                                            <StatusOption value="서류 합격">서류 합격</StatusOption>
                                            <StatusOption value="서류 불합격">서류 불합격</StatusOption>
                                            <StatusOption value="면접 예정">면접 예정</StatusOption>
                                            <StatusOption value="최종 합격">최종 합격</StatusOption>
                                          </StatusSelect>
                                          {hasStatusChange && (
                                            <>
                                              <CheckboxLabel>
                                                <input
                                                  type="checkbox"
                                                  checked={isConfirmed}
                                                  onChange={(e) =>
                                                    handleStatusConfirmationChange(
                                                      applicant.application_id,
                                                      e.target.checked
                                                    )
                                                  }
                                                />
                                                <span>확인</span>
                                              </CheckboxLabel>
                                              <SubmitButton
                                                disabled={!isConfirmed || isUpdating}
                                                onClick={() =>
                                                  handleStatusSubmit(
                                                    applicant.application_id,
                                                    job.job_post_id
                                                  )
                                                }
                                              >
                                                {isUpdating ? "전송 중..." : "전송"}
                                              </SubmitButton>
                                            </>
                                          )}
                                        </StatusControlGroup>
                                      </div>
                                    </ApplicantRow>

                                    {isExpanded && (
                                      <ExpandedContent>
                                        <ApplicantDetails>
                                          <DetailItem>
                                            <Mail size={16} />
                                            <span>{applicant.email || "이메일 없음"}</span>
                                          </DetailItem>
                                          <DetailItem>
                                            <Phone size={16} />
                                            <span>{applicant.phone || "전화번호 없음"}</span>
                                          </DetailItem>
                                          <DetailItem>
                                            <Calendar size={16} />
                                            <span>지원일: {applicant.date}</span>
                                          </DetailItem>
                                          <DetailItem>
                                            <FileText size={16} />
                                            <span>
                                              이력서: {applicant.resume_snapshot?.resumeTitle || "제목 없음"}
                                            </span>
                                          </DetailItem>
                                          <DetailItem>
                                            <span>작업 환경:</span>
                                            <span>
                                              {applicant.env_info?.env_both_hands && `양손: ${applicant.env_info.env_both_hands}`}
                                            </span>
                                          </DetailItem>
                                          <DetailItem>
                                            <span>
                                              {applicant.env_info?.env_eye_sight && `시력: ${applicant.env_info.env_eye_sight}`}
                                            </span>
                                          </DetailItem>
                                        </ApplicantDetails>
                                      </ExpandedContent>
                                    )}
              </ListItem>
                                );
                              })}
                            </>
                          ) : (
                            <EmptyText style={{ padding: "40px" }}>
                              아직 지원자가 없습니다.
                            </EmptyText>
                          )}
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
