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

const SignUpBox = styled.div`
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

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;

  a {
    color: #667eea;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 회원가입 API 호출
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  return (
    <Container>
      <SignUpBox>
        <Title>회원가입</Title>
        <Subtitle>잡케어에 오신 것을 환영합니다</Subtitle>

        <SignUpForm onSubmit={handleSignUp}>
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <SignUpButton type="submit">회원가입</SignUpButton>
        </SignUpForm>

        <SignUpLink>
          이미 계정이 있으신가요? <a onClick={() => navigate('/login')}>로그인</a>
        </SignUpLink>
      </SignUpBox>
    </Container>
  );
}

export default SignUp;
