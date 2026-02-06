import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../../../shared/Header";
import { getResume, updateResume } from "../../../api/Auth";
import { responseToUpdateShape, formToPayload } from "./resumeApiShape";
import ResumeForm from "./ResumeForm";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 20px 80px;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #555;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #1b3a6b;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  margin: 0 0 24px 0;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  padding: 32px;
  margin-bottom: 20px;
`;

const Placeholder = styled.p`
  color: #8898aa;
  font-size: 0.95rem;
  margin: 0 0 24px 0;
`;

const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.95rem;
  margin: 0 0 16px 0;
`;

function ResumeEditorPage() {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loadedIsRepresentative, setLoadedIsRepresentative] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!resumeId) return;
    setLoading(true);
    setLoadError(null);
    setFormData(null);
    getResume(resumeId)
      .then((res) => {
        const data = res.data;
        setLoadedIsRepresentative(!!data?.isRepresentative);
        const shape = responseToUpdateShape(data);
        if (!shape) {
          setLoadError("이력서 데이터를 불러올 수 없습니다.");
          return;
        }
        setFormData(shape);
      })
      .catch(() => {
        setLoadError("이력서를 찾을 수 없습니다.");
      })
      .finally(() => setLoading(false));
  }, [resumeId]);

  const handleBack = () => {
    navigate(`/user/resumes/${resumeId}`);
  };

  const handleSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      const payload = formToPayload(data);
      payload.isRepresentative = loadedIsRepresentative;
      await updateResume(resumeId, payload);
      navigate(`/user/resumes/${resumeId}`);
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data?.error;
      setSubmitError(typeof msg === "string" ? msg : "저장에 실패했습니다. 입력값을 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/resumes")}>
            <ArrowLeft size={18} /> 이력서 목록
          </BackBtn>
          <Placeholder>이력서를 불러오는 중입니다...</Placeholder>
        </Content>
      </Container>
    );
  }

  if (loadError || !formData) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/resumes")}>
            <ArrowLeft size={18} /> 이력서 목록
          </BackBtn>
          <ErrorMsg>{loadError || "이력서 데이터를 불러올 수 없습니다."}</ErrorMsg>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={handleBack}>
          <ArrowLeft size={18} /> 이력서 상세로
        </BackBtn>
        <PageTitle>이력서 수정</PageTitle>
        <Card>
          {submitError && <ErrorMsg>{submitError}</ErrorMsg>}
          <ResumeForm
            key={resumeId}
            initialValues={formData}
            onSubmit={handleSubmit}
            submitLabel={submitting ? "저장 중..." : "저장"}
            disabled={submitting}
            representativeReadOnly
          />
        </Card>
      </Content>
    </Container>
  );
}

export default ResumeEditorPage;
