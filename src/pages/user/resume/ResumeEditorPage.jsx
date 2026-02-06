/**
 * 이력서 수정 페이지.
 * 저장된 이력서를 불러와 폼에 채운 뒤, 연동 시 PUT /api/resumes/{resumeId} body로 전달.
 */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../../../shared/Header";
import { MOCK_RESUMES } from "./mockResumes";
import { responseToUpdateShape } from "./resumeApiShape";
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
  color: #c53030;
  font-size: 0.95rem;
  margin: 0 0 24px 0;
`;

function ResumeEditorPage() {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = () => {
      setLoading(true);
      setError(null);
      const resume = MOCK_RESUMES.find((r) => r.resumeId === resumeId);
      if (!resume) {
        setError("이력서를 찾을 수 없습니다.");
        setFormData(null);
      } else {
        setFormData(responseToUpdateShape(resume));
      }
      setLoading(false);
    };
    load();
  }, [resumeId]);

  const handleBack = () => {
    navigate(`/user/resumes/${resumeId}`);
  };

  const handleSubmit = (payload) => {
    // 연동 시: PUT /api/resumes/{resumeId} body로 payload 전달
    console.log("PUT /api/resumes/" + resumeId + " body:", payload);
    alert("저장되었습니다. (API 연동 후 실제 저장)");
    navigate(`/user/resumes/${resumeId}`);
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

  if (error) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/resumes")}>
            <ArrowLeft size={18} /> 이력서 목록
          </BackBtn>
          <ErrorMsg>{error}</ErrorMsg>
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
          <ResumeForm
            initialValues={formData}
            onSubmit={handleSubmit}
            submitLabel="저장"
          />
        </Card>
      </Content>
    </Container>
  );
}

export default ResumeEditorPage;
