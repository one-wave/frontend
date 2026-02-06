import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Languages,
  Crown,
} from "lucide-react";
import Header from "../../../shared/Header";
import { MOCK_RESUMES } from "./mockResumes";

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

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  margin-bottom: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const ResumeTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RepresentativeBadge = styled.span`
  background: #1b3a6b;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$primary
      ? `
    background: #1b3a6b;
    color: white;
    border: none;
    &:hover { background: #162f56; }
  `
      : `
    background: white;
    color: #c53030;
    border: 1px solid #feb2b2;
    &:hover { background: #fff5f5; }
  `}
`;

const Section = styled.section`
  padding: 24px 28px;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: #1b3a6b;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: #8898aa;
  margin: 0 0 24px 0;
`;

const Item = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
`;

const ItemSub = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 4px;
`;

const ItemDesc = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-top: 8px;
`;

const EmptyMsg = styled.p`
  font-size: 0.9rem;
  color: #8898aa;
  margin: 0;
`;

const ErrorMsg = styled.p`
  text-align: center;
  color: #c53030;
  padding: 40px 20px;
`;

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ResumeDetailPage() {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const resume = MOCK_RESUMES.find((r) => r.resumeId === resumeId);

  const handleDelete = () => {
    if (window.confirm("이 이력서를 삭제하시겠습니까?")) {
      // 백 연동 전: 목록으로 이동만
      navigate("/user/resumes");
    }
  };

  if (!resume) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/resumes")}>
            <ArrowLeft size={18} /> 목록으로
          </BackBtn>
          <ErrorMsg>이력서를 찾을 수 없습니다.</ErrorMsg>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={() => navigate("/user/resumes")}>
          <ArrowLeft size={18} /> 이력서 목록
        </BackBtn>

        <TitleRow>
          <ResumeTitle>
            {resume.resumeTitle}
            {resume.representative && (
              <RepresentativeBadge>
                <Crown size={14} /> 대표 이력서
              </RepresentativeBadge>
            )}
          </ResumeTitle>
          <ButtonGroup>
            <ActionButton
              $primary
              type="button"
              onClick={() =>
                navigate(`/user/resumes/${resume.resumeId}/edit`)
              }
            >
              <Edit3 size={18} /> 수정
            </ActionButton>
            <ActionButton type="button" onClick={handleDelete}>
              <Trash2 size={18} /> 삭제
            </ActionButton>
          </ButtonGroup>
        </TitleRow>

        <Meta>
          생성일 {formatDate(resume.createdAt)} · 수정일{" "}
          {formatDate(resume.updatedAt)}
        </Meta>

        <Card>
          {resume.educations?.length > 0 && (
            <Section>
              <SectionTitle>
                <GraduationCap size={20} /> 학력
              </SectionTitle>
              {resume.educations.map((e) => (
                <Item key={e.educationId}>
                  <ItemTitle>{e.schoolName}</ItemTitle>
                  <ItemSub>
                    {e.major} · {e.degreeLabel ?? e.degree} ·{" "}
                    {e.graduationStatusLabel ?? e.graduationStatus}
                  </ItemSub>
                  <ItemSub>
                    {formatDate(e.enrollmentDate)} ~{" "}
                    {formatDate(e.graduationDate)}
                  </ItemSub>
                </Item>
              ))}
            </Section>
          )}

          {resume.careers?.length > 0 && (
            <Section>
              <SectionTitle>
                <Briefcase size={20} /> 경력
              </SectionTitle>
              {resume.careers.map((c) => (
                <Item key={c.careerId}>
                  <ItemTitle>
                    {c.companyName}
                    {c.currentJob && " (재직 중)"}
                  </ItemTitle>
                  <ItemSub>
                    {c.department} · {c.position}
                  </ItemSub>
                  <ItemSub>
                    {formatDate(c.startDate)} ~ {formatDate(c.endDate)}
                  </ItemSub>
                  {c.description && (
                    <ItemDesc>{c.description}</ItemDesc>
                  )}
                </Item>
              ))}
            </Section>
          )}

          {resume.certificates?.length > 0 && (
            <Section>
              <SectionTitle>
                <BookOpen size={20} /> 자격증
              </SectionTitle>
              {resume.certificates.map((c) => (
                <Item key={c.certificateId}>
                  <ItemTitle>{c.certificateName}</ItemTitle>
                  <ItemSub>
                    {c.issuingOrganization} · {formatDate(c.acquiredDate)}
                  </ItemSub>
                </Item>
              ))}
            </Section>
          )}

          {resume.awards?.length > 0 && (
            <Section>
              <SectionTitle>
                <Award size={20} /> 수상
              </SectionTitle>
              {resume.awards.map((a) => (
                <Item key={a.awardId}>
                  <ItemTitle>{a.awardName}</ItemTitle>
                  <ItemSub>
                    {a.issuingOrganization} · {formatDate(a.awardDate)}
                  </ItemSub>
                  {a.description && (
                    <ItemDesc>{a.description}</ItemDesc>
                  )}
                </Item>
              ))}
            </Section>
          )}

          {resume.languages?.length > 0 && (
            <Section>
              <SectionTitle>
                <Languages size={20} /> 어학
              </SectionTitle>
              {resume.languages.map((l) => (
                <Item key={l.languageId}>
                  <ItemTitle>{l.languageName}</ItemTitle>
                  <ItemSub>
                    {l.testName}
                    {l.score && ` ${l.score}`}
                    {l.grade && ` (${l.grade})`} ·{" "}
                    {formatDate(l.acquiredDate)}
                  </ItemSub>
                </Item>
              ))}
            </Section>
          )}

          {!resume.educations?.length &&
            !resume.careers?.length &&
            !resume.certificates?.length &&
            !resume.awards?.length &&
            !resume.languages?.length && (
              <Section>
                <EmptyMsg>등록된 내용이 없습니다.</EmptyMsg>
              </Section>
            )}
        </Card>
      </Content>
    </Container>
  );
}

export default ResumeDetailPage;
