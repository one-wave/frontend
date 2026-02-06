/**
 * 이력서 추가 페이지.
 * API 연동 시: onSubmit에서 formData를 POST /api/resumes body로 전달.
 */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../../../shared/Header";
import { EMPTY_RESUME_FORM } from "./resumeApiShape";
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

function ResumeCreatePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/user/resumes");
  };

  const handleSubmit = (formData) => {
    // 연동 시: POST /api/resumes body로 formData 전달
    console.log("POST /api/resumes body:", formData);
    alert("저장되었습니다. (API 연동 후 실제 저장)");
    navigate("/user/resumes");
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
          <ResumeForm
            initialValues={EMPTY_RESUME_FORM}
            onSubmit={handleSubmit}
            submitLabel="저장"
          />
        </Card>
      </Content>
    </Container>
  );
}

export default ResumeCreatePage;
