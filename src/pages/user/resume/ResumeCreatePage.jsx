/**
 * 이력서 추가 페이지.
 * POST /api/resumes (ResumeRequest) 연동.
 */
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../../../shared/Header";
import { createResume } from "../../../api/Auth";
import { EMPTY_RESUME_FORM, formToPayload } from "./resumeApiShape";
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

const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.95rem;
  margin: 0 0 16px 0;
`;

function ResumeCreatePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBack = () => {
    navigate("/user/resumes");
  };

  const handleSubmit = async (formData) => {
    setError("");
    setSubmitting(true);
    try {
      const payload = formToPayload(formData);
      const { data } = await createResume(payload);
      navigate(data?.resumeId ? `/user/resumes/${data.resumeId}` : "/user/resumes");
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data?.error;
      setError(typeof msg === "string" ? msg : "저장에 실패했습니다. 입력값을 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={handleBack}>
          <ArrowLeft size={18} /> 이력서 목록
        </BackBtn>
        <PageTitle>이력서 추가</PageTitle>
        <Card>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <ResumeForm
            initialValues={EMPTY_RESUME_FORM}
            onSubmit={handleSubmit}
            submitLabel={submitting ? "저장 중..." : "저장"}
            disabled={submitting}
          />
        </Card>
      </Content>
    </Container>
  );
}

export default ResumeCreatePage;
