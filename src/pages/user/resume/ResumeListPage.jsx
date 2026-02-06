import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, ChevronRight, Crown, Plus } from "lucide-react";
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

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  margin: 0;
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #1b3a6b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #162f56;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-color: #1b3a6b;
  }
`;

const ItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #e8eef5;
  color: #1b3a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemText = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const ItemMeta = styled.div`
  font-size: 0.85rem;
  color: #8898aa;
`;

const RepresentativeBadge = styled.span`
  background: #1b3a6b;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Chevron = styled(ChevronRight)`
  color: #8898aa;
  flex-shrink: 0;
`;

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ResumeListPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={() => navigate("/user/mypage")}>
          <ArrowLeft size={18} /> 마이페이지
        </BackBtn>
        <TitleRow>
          <PageTitle>이력서 목록</PageTitle>
          <AddBtn type="button" onClick={() => navigate("/user/resumes/new")}>
            <Plus size={18} /> 이력서 추가
          </AddBtn>
        </TitleRow>
        <List>
          {MOCK_RESUMES.map((resume) => (
            <ListItem key={resume.resumeId}>
              <ItemButton
                type="button"
                onClick={() =>
                  navigate(`/user/resumes/${resume.resumeId}`)
                }
              >
                <IconWrap>
                  <FileText size={24} />
                </IconWrap>
                <ItemText>
                  <ItemTitle>
                    {resume.resumeTitle}
                    {resume.representative && (
                      <RepresentativeBadge>
                        <Crown size={12} /> 대표
                      </RepresentativeBadge>
                    )}
                  </ItemTitle>
                  <ItemMeta>
                    최종 수정 {formatDate(resume.updatedAt)}
                  </ItemMeta>
                </ItemText>
                <Chevron size={20} />
              </ItemButton>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}

export default ResumeListPage;
