import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #da190b;
  }
`;

const Content = styled.main`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const WelcomeText = styled.h2`
  color: #333;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
`;

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 처리 후 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <Container>
      <Header>
        <Title>Home</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>
      <Content>
        <WelcomeBox>
          <WelcomeText>환영합니다! 🎉</WelcomeText>
          <Description>
            React Router Dom과 Emotion을 사용한 홈 페이지입니다.
          </Description>
        </WelcomeBox>
      </Content>
    </Container>
  );
}

export default Home;
