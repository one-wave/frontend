import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 48px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 460px;
`;

const LogoIcon = styled.div`
  width: 56px;
  height: 56px;
  background-color: #1565C0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 24px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 24px;
  color: #666;
  font-size: 14px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.div`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.active ? '#1565C0' : '#999'};
  border-bottom: 2px solid ${props => props.active ? '#1565C0' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #1565C0;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 24px;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
`;

const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1565C0;
  }

  &::placeholder {
    color: #999;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #1565C0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: #0D47A1;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 14px;

  a {
    color: #1565C0;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    margin-left: 4px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('individual'); // 'individual' or 'company'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    const userType = activeTab === 'individual' ? 'jobseeker' : 'company';
    
    if (userType === 'jobseeker') {
      navigate('/');
    } else {
      navigate('/company/dashboard');
    }
  };

  return (
    <Container>
      <LogoIcon>
        <User size={32} />
      </LogoIcon>
      <Title>배리어 프리</Title>
      <Subtitle>장애인 구직자와 기업을 연결합니다</Subtitle>
      
      <LoginBox>
        <TabContainer>
          <Tab 
            active={activeTab === 'individual'} 
            onClick={() => setActiveTab('individual')}
          >
            개인 회원
          </Tab>
          <Tab 
            active={activeTab === 'company'} 
            onClick={() => setActiveTab('company')}
          >
            기업 회원
          </Tab>
        </TabContainer>

        <FormHeader>
          <FormTitle>
            {activeTab === 'individual' ? '개인 회원(구직자) 로그인' : '기업 회원 로그인'}
          </FormTitle>
          <FormDescription>
            이메일과 비밀번호를 입력하여 로그인하세요.
          </FormDescription>
        </FormHeader>

        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="8자 이상 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          
          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>

        <SignUpLink>
          아직 계정이 없으신가요?
          <a onClick={() => navigate('/signup')}>회원가입</a>
        </SignUpLink>
      </LoginBox>
    </Container>
  );
}

export default Login;


