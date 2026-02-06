import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
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
  Accessibility,
} from "lucide-react";
import CompanyLayout from "../../shared/CompanyHeader";

const FormContainer = styled.div`
  padding: 40px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const LayoutRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.8fr;
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
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

const JobListCard = styled(SectionCard)`
  max-height: 520px;
  overflow-y: auto;
`;

const JobItem = styled.div`
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid ${({ $active }) => ($active ? "#3182ce" : "#edf2f7")};
  background-color: ${({ $active }) => ($active ? "#ebf8ff" : "white")};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;

  &:hover {
    border-color: #3182ce;
    background-color: #f7fafc;
  }
`;

const JobTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
`;

const JobMeta = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const DetailLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
`;

const DetailValue = styled.div`
  font-size: 0.85rem;
  color: #2d3748;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const EditLinkButton = styled.button`
  margin-top: 12px;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  background-color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;

  &:hover {
    background-color: #f7fafc;
  }
`;

const FloatingAddButton = styled.button`
  position: fixed;
  right: 40px;
  bottom: 32px;
  padding: 14px 22px;
  border-radius: 999px;
  background-color: #243c5a;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 50;

  &:hover {
    background-color: #1a202c;
  }
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
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      const companyAuthCode = localStorage.getItem("companyAuthCode");
      if (!companyAuthCode) {
        setJobsError("기업 인증 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      try {
        setJobsLoading(true);
        setJobsError("");

        const token = localStorage.getItem("companyToken");
        const res = await fetch("/api/enterprise/company/job", {
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
        if (filtered.length > 0) {
          setSelectedJob(filtered[0]);
        }
      } catch (error) {
        console.error(error);
        setJobsError("공고 목록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setJobsLoading(false);
      }
    };

    fetchCompanyJobs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 공고 등록 API 연동 시, 백엔드에서 기대하는 스키마에 맞춰 body 구성
    alert("채용 공고가 성공적으로 등록되었습니다. (API 연동 시 백엔드로 전송)");
    setShowForm(false);
  };

  return (
    <CompanyLayout
      headerTitle="채용 공고 관리"
      headerSubtitle="우리 회사의 채용 공고를 확인하고, 새로운 공고를 등록합니다"
    >
      <FormContainer>
          {/* Blue Banner */}
          <TopBanner>
            <h1>채용 공고 관리</h1>
            <p>
              우리 회사에 등록된 공고를 확인하고, 클릭하여 상세 정보를 볼 수 있습니다.
            </p>
          </TopBanner>

          <LayoutRow>
            {/* 왼쪽: 공고 리스트 */}
            <div>
              <JobListCard>
                <SectionHeader>
                  <FileText size={24} />
                  <h3>우리 회사 공고 목록</h3>
                </SectionHeader>
                {jobsLoading && (
                  <p style={{ fontSize: "0.9rem", color: "#718096" }}>
                    공고 목록을 불러오는 중입니다...
                  </p>
                )}
                {jobsError && (
                  <p style={{ fontSize: "0.9rem", color: "#e53e3e" }}>
                    {jobsError}
                  </p>
                )}
                {!jobsLoading && !jobsError && jobs.length === 0 && (
                  <p style={{ fontSize: "0.9rem", color: "#718096" }}>
                    아직 등록된 공고가 없습니다. 우측 하단 버튼으로 새 공고를 등록해보세요.
                  </p>
                )}
                {!jobsLoading &&
                  !jobsError &&
                  jobs.length > 0 &&
                  jobs.map((job) => (
                    <JobItem
                      key={job.job_post_id}
                      $active={selectedJob?.job_post_id === job.job_post_id}
                      onClick={() => setSelectedJob(job)}
                    >
                      <JobTitle>{job.job_nm}</JobTitle>
                      <JobMeta>
                        {job.job_location} · {job.emp_type} · {job.salary}
                        {job.salary_type} · 마감일 {job.offer_end_dt}
                      </JobMeta>
                    </JobItem>
                  ))}
              </JobListCard>
            </div>

            {/* 오른쪽: 선택한 공고 상세 + 새 공고 등록 폼(토글) */}
            <div>
              <SectionCard>
                <SectionHeader>
                  <Briefcase size={24} />
                  <h3>선택한 공고 상세</h3>
                </SectionHeader>
                {selectedJob ? (
                  <>
                    <h2
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: 16,
                        color: "#2d3748",
                      }}
                    >
                      {selectedJob.job_nm}
                    </h2>
                    <DetailRow>
                      <DetailLabel>근무지</DetailLabel>
                      <DetailValue>{selectedJob.job_location}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>고용형태 / 입사형태</DetailLabel>
                      <DetailValue>
                        {selectedJob.emp_type} / {selectedJob.enter_type}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>급여</DetailLabel>
                      <DetailValue>
                        {selectedJob.salary}
                        {selectedJob.salary_type}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>경력 / 학력</DetailLabel>
                      <DetailValue>
                        {selectedJob.req_career} / {selectedJob.req_educ}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>접수기간</DetailLabel>
                      <DetailValue>
                        등록일 {selectedJob.reg_dt} ~ 마감일{" "}
                        {selectedJob.offer_end_dt}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>등록 기관</DetailLabel>
                      <DetailValue>{selectedJob.regagn_name}</DetailValue>
                    </DetailRow>

                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid #e2e8f0",
                        margin: "18px 0",
                      }}
                    />

                    <h4
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#4a5568",
                        marginBottom: 10,
                      }}
                    >
                      작업 환경 요약
                    </h4>
                    <ul
                      style={{
                        listStyle: "disc",
                        paddingLeft: "18px",
                        fontSize: "0.85rem",
                        color: "#4a5568",
                        lineHeight: 1.6,
                      }}
                    >
                      <li>양손 사용: {selectedJob.env_both_hands}</li>
                      <li>시야/시력: {selectedJob.env_eye_sight}</li>
                      <li>손 작업: {selectedJob.env_hand_work}</li>
                      <li>들기/운반: {selectedJob.env_lift_power}</li>
                      <li>듣기/말하기: {selectedJob.env_lstn_talk}</li>
                      <li>서기/걷기: {selectedJob.env_stnd_walk}</li>
                    </ul>

                    <EditLinkButton
                      type="button"
                      onClick={() =>
                        navigate(`/company/job-post/${selectedJob.job_post_id}`)
                      }
                    >
                      이 공고 수정하기
                    </EditLinkButton>
                  </>
                ) : (
                  <p style={{ fontSize: "0.9rem", color: "#718096" }}>
                    왼쪽에서 공고를 클릭하면 상세 정보를 확인할 수 있습니다.
                  </p>
                )}
              </SectionCard>

              {showForm && (
                <form onSubmit={handleSubmit}>
                  {/* 1. Basic Info */}
                  <SectionCard>
                    <SectionHeader>
                      <Briefcase size={24} />
                      <h3>기본 정보</h3>
                    </SectionHeader>

                    <FormGroup>
                      <Label>
                        공고 제목 (job_nm) <span>*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="예: 공공시설 경비원(청사, 학교, 병원 등)"
                        required
                      />
                    </FormGroup>

                    <Row>
                      <FormGroup>
                        <Label>
                          고용 형태 (emp_type) <span>*</span>
                        </Label>
                        <Select required>
                          <option value="">선택해주세요</option>
                          <option value="상용직">상용직</option>
                          <option value="계약직">계약직</option>
                        </Select>
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          입사 형태 (enter_type) <span>*</span>
                        </Label>
                        <Select required>
                          <option value="">선택해주세요</option>
                          <option value="무관">무관</option>
                          <option value="경력">경력</option>
                        </Select>
                      </FormGroup>
                    </Row>

                    <Row>
                      <FormGroup>
                        <Label>
                          급여 (salary) <span>*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="예: 1183000"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          급여 유형 (salary_type) <span>*</span>
                        </Label>
                        <Select required>
                          <option value="">선택해주세요</option>
                          <option value="월급">월급</option>
                          <option value="시급">시급</option>
                          <option value="연봉">연봉</option>
                        </Select>
                      </FormGroup>
                    </Row>

                    <FormGroup>
                      <Label>
                        근무지 (job_location) <span>*</span>
                      </Label>
                      <AddressRow>
                        <Input
                          type="text"
                          placeholder="예: 경기도 성남시 수정구 산성대로 111 (수진동)"
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
                      <h3>자격 요건</h3>
                    </SectionHeader>

                    <Row>
                      <FormGroup>
                        <Label>
                          필요 경력 (req_career) <span>*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder="예: 0년0개월 / 3년0개월"
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>
                          학력 (req_educ) <span>*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder="예: 무관 / 고졸 / 대졸"
                          required
                        />
                      </FormGroup>
                    </Row>

                    <FormGroup>
                      <Label>등록 기관명 (regagn_name)</Label>
                      <Input
                        type="text"
                        placeholder="예: 한국장애인고용공단 경기동부지사"
                      />
                    </FormGroup>
                  </SectionCard>

                  {/* 3. Facilities */}
                  <SectionCard>
                    <SectionHeader>
                      <Accessibility size={24} />
                      <h3>작업 환경 (env_*)</h3>
                    </SectionHeader>
                    <p
                      style={{
                        color: "#718096",
                        fontSize: "0.9rem",
                        marginBottom: "20px",
                      }}
                    >
                      샘플 데이터처럼 작업 환경을 요약해서 입력해주세요.
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

                    <BottomActions>
                      <BottomBtn type="submit" primary>
                        <Send size={18} /> 공고 등록하기
                      </BottomBtn>
                    </BottomActions>
                  </SectionCard>
                </form>
              )}
            </div>
          </LayoutRow>
      </FormContainer>

      <FloatingAddButton onClick={() => navigate("/company/job-post/new")}>
        <Save size={18} />
        새 공고 등록
      </FloatingAddButton>
    </CompanyLayout>
  );
}

export default JobPostPage;
