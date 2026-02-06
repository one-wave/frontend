import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileText, Briefcase, MapPin, Accessibility, Send } from "lucide-react";
import CompanyLayout from "../../shared/CompanyHeader";
import { getCompanyApiBaseUrl } from "../../api/Http";

const PageContainer = styled.div`
  padding: 40px;
  overflow-y: auto;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

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
  }
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  min-height: 80px;
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

const EnvSelect = styled.select`
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

const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const SubmitBtn = styled.button`
  padding: 14px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #243c5a;
  color: white;
  border: none;
  &:hover {
    background-color: #1a202c;
  }
`;

function JobPostEditPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const isEdit = Boolean(jobId);

  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  const [jobNm, setJobNm] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [empType, setEmpType] = useState("");
  const [enterType, setEnterType] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [reqCareer, setReqCareer] = useState("");
  const [reqEduc, setReqEduc] = useState("");
  const [regagnName, setRegagnName] = useState("");
  const [envBothHands, setEnvBothHands] = useState("");
  const [envEyeSight, setEnvEyeSight] = useState("");
  const [envHandWork, setEnvHandWork] = useState("");
  const [envLiftPower, setEnvLiftPower] = useState("");
  const [envLstnTalk, setEnvLstnTalk] = useState("");
  const [envStndWalk, setEnvStndWalk] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    const fetchJob = async () => {
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
          throw new Error("공고 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        const allJobs = Array.isArray(data.data) ? data.data : [];
        const target = allJobs.find((j) => j.job_post_id === jobId);

        if (!target) {
          setError("해당 공고를 찾을 수 없습니다.");
          return;
        }

        setJobNm(target.job_nm || "");
        setJobLocation(target.job_location || "");
        setEmpType(target.emp_type || "");
        setEnterType(target.enter_type || "");
        setSalary(target.salary || "");
        setSalaryType(target.salary_type || "");
        setReqCareer(target.req_career || "");
        setReqEduc(target.req_educ || "");
        setRegagnName(target.regagn_name || "");
        setEnvBothHands(target.env_both_hands || "");
        setEnvEyeSight(target.env_eye_sight || "");
        setEnvHandWork(target.env_hand_work || "");
        setEnvLiftPower(target.env_lift_power || "");
        setEnvLstnTalk(target.env_lstn_talk || "");
        setEnvStndWalk(target.env_stnd_walk || "");
      } catch (err) {
        console.error(err);
        setError("공고 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [isEdit, jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyAuthCode = localStorage.getItem("companyAuthCode");
    const token = localStorage.getItem("companyToken");

    if (!companyAuthCode) {
      alert("회사 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    // NotNull 필드가 비어있으면 "정보없음"으로 기본값 설정
    const payload = {
      company_id: companyAuthCode,
      job_nm: jobNm || "정보없음",
      job_location: jobLocation || "정보없음",
      emp_type: empType || "정보없음",
      enter_type: enterType || "정보없음",
      salary: salary || 0,
      salary_type: salaryType || "정보없음",
      req_career: reqCareer || "정보없음",
      req_educ: reqEduc || "정보없음",
      regagn_name: regagnName || "정보없음",
      env_both_hands: envBothHands || "정보없음",
      env_eye_sight: envEyeSight || "정보없음",
      env_hand_work: envHandWork || "정보없음",
      env_lift_power: envLiftPower || "정보없음",
      env_lstn_talk: envLstnTalk || "정보없음",
      env_stnd_walk: envStndWalk || "정보없음",
    };

    const apiBaseUrl = getCompanyApiBaseUrl();
    const url = isEdit
      ? `${apiBaseUrl}/api/enterprise/company/job/${jobId}`
      : `${apiBaseUrl}/api/enterprise/company/job/register`;
    const method = isEdit ? "PUT" : "POST";

    try {
      setSubmitLoading(true);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("공고 저장 요청이 실패했습니다.");
      }

      alert(isEdit ? "공고가 성공적으로 수정되었습니다." : "공고가 성공적으로 등록되었습니다.");
      navigate("/company/job-post");
    } catch (err) {
      console.error(err);
      alert("공고 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const headerTitle = isEdit ? "채용 공고 수정" : "새 채용 공고 등록";

  return (
    <CompanyLayout
      headerTitle={headerTitle}
      headerSubtitle="공고 정보를 확인하고 수정/등록할 수 있습니다."
    >
      <PageContainer>
        {loading && <p>공고 정보를 불러오는 중입니다...</p>}
        {error && <p style={{ color: "#e53e3e" }}>{error}</p>}

        {!loading && !error && (
          <form onSubmit={handleSubmit}>
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
                  value={jobNm}
                  onChange={(e) => setJobNm(e.target.value)}
                  placeholder="예: 공공시설 경비원(청사, 학교, 병원 등)"
                  required
                />
              </FormGroup>

              <Row>
                <FormGroup>
                  <Label>
                    고용 형태 (emp_type) <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={empType}
                    onChange={(e) => setEmpType(e.target.value)}
                    placeholder="예: 계약직 / 상용직"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    입사 형태 (enter_type) <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={enterType}
                    onChange={(e) => setEnterType(e.target.value)}
                    placeholder="예: 무관 / 경력"
                    required
                  />
                </FormGroup>
              </Row>

              <Row>
                <FormGroup>
                  <Label>
                    급여 (salary) <span>*</span>
                  </Label>
                  <Input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="예: 1183000"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    급여 유형 (salary_type) <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    placeholder="예: 월급 / 시급 / 연봉"
                    required
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>
                  근무지 (job_location) <span>*</span>
                </Label>
                <AddressRow>
                  <Input
                    type="text"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="예: 경기도 성남시 수정구 산성대로 111 (수진동)"
                    required
                  />
                  <SearchBtn type="button">
                    <MapPin size={16} /> 주소 검색
                  </SearchBtn>
                </AddressRow>
              </FormGroup>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <FileText size={24} />
                <h3>자격 요건 및 등록 정보</h3>
              </SectionHeader>

              <Row>
                <FormGroup>
                  <Label>
                    필요 경력 (req_career) <span>*</span>
                  </Label>
                  <Input
                    type="text"
                    value={reqCareer}
                    onChange={(e) => setReqCareer(e.target.value)}
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
                    value={reqEduc}
                    onChange={(e) => setReqEduc(e.target.value)}
                    placeholder="예: 무관 / 고졸 / 대졸"
                    required
                  />
                </FormGroup>
              </Row>

              <FormGroup>
                <Label>등록 기관명 (regagn_name)</Label>
                <Input
                  type="text"
                  value={regagnName}
                  onChange={(e) => setRegagnName(e.target.value)}
                  placeholder="예: 한국장애인고용공단 경기동부지사"
                />
              </FormGroup>
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <Accessibility size={24} />
                <h3>작업 환경 (env_*)</h3>
              </SectionHeader>

              <FormGroup>
                <Label>양손 사용 (env_both_hands)</Label>
                <EnvSelect
                  value={envBothHands}
                  onChange={(e) => setEnvBothHands(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="한손작업 가능">한손작업 가능</option>
                  <option value="한손보조작업 가능">한손보조작업 가능</option>
                  <option value="양손작업 가능">양손작업 가능</option>
                </EnvSelect>
              </FormGroup>
              <FormGroup>
                <Label>시야/시력 (env_eye_sight)</Label>
                <EnvSelect
                  value={envEyeSight}
                  onChange={(e) => setEnvEyeSight(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="비교적 큰 인쇄물을 읽을 수 있음">
                    비교적 큰 인쇄물을 읽을 수 있음
                  </option>
                  <option value="일상적 활동 가능">일상적 활동 가능</option>
                  <option value="아주 작은 글씨를 읽을 수 있음">
                    아주 작은 글씨를 읽을 수 있음
                  </option>
                </EnvSelect>
              </FormGroup>
              <FormGroup>
                <Label>손 작업 (env_hand_work)</Label>
                <EnvSelect
                  value={envHandWork}
                  onChange={(e) => setEnvHandWork(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="큰 물품 조립가능">큰 물품 조립가능</option>
                  <option value="작은 물품 조립가능">작은 물품 조립가능</option>
                  <option value="정밀한 작업가능">정밀한 작업가능</option>
                </EnvSelect>
              </FormGroup>
              <FormGroup>
                <Label>들기/운반 (env_lift_power)</Label>
                <EnvSelect
                  value={envLiftPower}
                  onChange={(e) => setEnvLiftPower(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="5Kg 이내">5Kg 이내</option>
                  <option value="5~20Kg">5~20Kg</option>
                  <option value="20Kg 이상">20Kg 이상</option>
                </EnvSelect>
              </FormGroup>
              <FormGroup>
                <Label>듣기/말하기 (env_lstn_talk)</Label>
                <EnvSelect
                  value={envLstnTalk}
                  onChange={(e) => setEnvLstnTalk(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="듣고 말하는 작업 어려움">
                    듣고 말하는 작업 어려움
                  </option>
                  <option value="간단한 듣고 말하기 가능">
                    간단한 듣고 말하기 가능
                  </option>
                  <option value="듣고 말하기에 어려움 없음">
                    듣고 말하기에 어려움 없음
                  </option>
                </EnvSelect>
              </FormGroup>
              <FormGroup>
                <Label>서기/걷기 (env_stnd_walk)</Label>
                <EnvSelect
                  value={envStndWalk}
                  onChange={(e) => setEnvStndWalk(e.target.value)}
                >
                  <option value="">선택해주세요</option>
                  <option value="정보없음">정보없음</option>
                  <option value="서거나 걷는 일 어려움">
                    서거나 걷는 일 어려움
                  </option>
                  <option value="일부 서서하는 작업 가능">
                    일부 서서하는 작업 가능
                  </option>
                  <option value="오랫동안 가능">오랫동안 가능</option>
                </EnvSelect>
              </FormGroup>
            </SectionCard>

            <BottomActions>
              <SubmitBtn type="submit" disabled={submitLoading}>
                <Send size={18} />{" "}
                {submitLoading
                  ? "저장 중..."
                  : isEdit
                    ? "공고 수정하기"
                    : "공고 등록하기"}
              </SubmitBtn>
            </BottomActions>
          </form>
        )}
      </PageContainer>
    </CompanyLayout>
  );
}

export default JobPostEditPage;

