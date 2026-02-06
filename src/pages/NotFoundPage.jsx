import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0a4ea4;
  color: white;
  text-align: center;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 18px;
  margin: 20px 0 40px;
  opacity: 0.9;
  max-width: 500px;
`;

const Button = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>페이지를 찾을 수 없습니다</ErrorMessage>
      <Description>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        <br />
        URL을 다시 확인해주세요.
      </Description>
      <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
    </Container>
  );
}

export default NotFoundPage;
