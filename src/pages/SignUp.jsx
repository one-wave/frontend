import { useState } from 'react';
import styled from '@emotion/styled';
import { User, Globe, Eye, EyeOff, Lock, Mail, UserPlus } from 'lucide-react';

const Signup = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      {/* 로고 및 제목 섹션 */}
      <HeaderSection>
        <LogoBox>
          <User size={28} color="white" fill="white" />
        </LogoBox>
        <Title>배리어 프리</Title>
        <Subtitle>장애인 구직자와 기업을 연결합니다</Subtitle>
      </HeaderSection>

      {/* 회원가입 카드 */}
      <Card>
        <TabGroup>
          <Tab 
            active={activeTab === 'individual'} 
            onClick={() => setActiveTab('individual')}
          >
            개인 회원
          </Tab>
          <Tab 
            active={activeTab === 'corporate'} 
            onClick={() => setActiveTab('corporate')}
          >
            기업 회원
          </Tab>
        </TabGroup>

        <FormContainer>
          <FormTitle>
            {activeTab === 'individual' ? '개인 회원(구직자) 회원가입' : '기업 회원 회원가입'}
          </FormTitle>
          <FormDescription>아래 정보를 입력하여 회원가입을 진행하세요.</FormDescription>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* 이름 필드 */}
            <InputGroup>
              <Label>이름</Label>
              <InputWrapper>
                <InputIcon><UserPlus size={18} /></InputIcon>
                <Input type="text" placeholder="홍길동" />
              </InputWrapper>
            </InputGroup>

            {/* 이메일 필드 */}
            <InputGroup>
              <Label>이메일</Label>
              <InputWrapper>
                <InputIcon><Mail size={18} /></InputIcon>
                <Input type="email" placeholder="example@email.com" />
              </InputWrapper>
            </InputGroup>
            
            {/* 비밀번호 필드 */}
            <InputGroup>
              <Label>비밀번호</Label>
              <InputWrapper>
                <InputIcon><Lock size={18} /></InputIcon>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="8자 이상 입력하세요" 
                />
                <PasswordToggle 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            <SubmitButton type="submit">회원가입</SubmitButton>
          </form>

          <FooterLink>
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </FooterLink>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default Signup;

// --- Emotion Styled Components (공통 스타일 유지) ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: 'Pretendard', -apple-system, sans-serif;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoBox = styled.div`
  background-color: #1565C0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.4rem;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 500;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #f1f5f9;
`;

const TabGroup = styled.div`
  display: flex;
  background-color: #f9fafb;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1.1rem 0;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#1e3a8a' : '#9ca3af'};
  border-bottom: ${props => props.active ? '3px solid #1e3a8a' : '3px solid transparent'};
`;

const FormContainer = styled.div`
  padding: 2.5rem 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.4rem;
`;

const FormDescription = styled.p`
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.6rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #9ca3af;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #1565C0;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 1.1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  &:hover { background-color: #1e3a8a; }
  &:active { transform: scale(0.98); }
`;

const FooterLink = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7280;
  a {
    color: #1e3a8a;
    font-weight: 700;
    text-decoration: none;
    margin-left: 0.4rem;
    &:hover { text-decoration: underline; }
  }
`;