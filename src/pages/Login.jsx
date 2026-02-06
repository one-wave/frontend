import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 28px;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
  color: #666;
  font-size: 16px;
`;

const UserTypeButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`;

const UserTypeButton = styled.button`
  flex: 1;
  padding: 16px;
  background-color: ${props => props.selected ? '#667eea' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : '#666'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #e0e0e0;
  }
  
  span {
    margin: 0 16px;
    color: #999;
    font-size: 14px;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.provider === 'kakao' ? '#FEE500' : '#fff'};
  color: ${props => props.provider === 'kakao' ? '#000' : '#666'};
  border: ${props => props.provider === 'kakao' ? 'none' : '1px solid #ddd'};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('jobseeker'); // 'jobseeker' or 'company'

  const handleSocialLogin = (provider) => {
    // 소셜 로그인 로직 처리 후 해당 메인 페이지로 이동
    if (userType === 'jobseeker') {
      navigate('/user/main');
    } else {
      navigate('/company/dashboard');
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>잡케어</Title>
        <Subtitle>모두를 위한 채용 플랫폼</Subtitle>
        
        <UserTypeButtons>
          <UserTypeButton 
            selected={userType === 'jobseeker'}
            onClick={() => setUserType('jobseeker')}
          >
            🧑‍🦽 구직자
          </UserTypeButton>
          <UserTypeButton 
            selected={userType === 'company'}
            onClick={() => setUserType('company')}
          >
            🏢 기업
          </UserTypeButton>
        </UserTypeButtons>

        <Divider>
          <span>간편 로그인</span>
        </Divider>

        <SocialButtons>
          <SocialButton 
            provider="kakao"
            onClick={() => handleSocialLogin('kakao')}
          >
            💬 카카오로 시작하기
          </SocialButton>
          <SocialButton 
            provider="google"
            onClick={() => handleSocialLogin('google')}
          >
            🌐 Google로 시작하기
          </SocialButton>
        </SocialButtons>
      </LoginBox>
    </Container>
  );
}

export default Login;
