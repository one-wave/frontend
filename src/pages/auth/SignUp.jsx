import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { User, Eye, EyeOff, Lock, Mail, UserPlus } from 'lucide-react';
import { userSignup } from '../../api/Auth';

// 백엔드 SignupRequest / EnvCondition enum 값 (value=API 전송값, label=화면 표시)
const ENV_BOTH_HANDS = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'ONE_HAND', label: '한손작업 가능' },
  { value: 'ONE_HAND_ASSIST', label: '한손보조작업 가능' },
  { value: 'BOTH_HANDS', label: '양손작업 가능' },
];
const ENV_EYE_SIGHT = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'LARGE_PRINT', label: '비교적 큰 인쇄물을 읽을 수 있음' },
  { value: 'DAILY_ACTIVITY', label: '일상적 활동 가능' },
  { value: 'FINE_PRINT', label: '아주 작은 글씨를 읽을 수 있음' },
];
const ENV_HAND_WORK = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'LARGE_ASSEMBLY', label: '큰 물품 조립가능' },
  { value: 'SMALL_ASSEMBLY', label: '작은 물품 조립가능' },
  { value: 'PRECISION', label: '정밀한 작업가능' },
];
const ENV_LIFT_POWER = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'UNDER_5KG', label: '5Kg 이내의 물건을 다룰 수 있음' },
  { value: 'UNDER_20KG', label: '5~20Kg의 물건을 다룰 수 있음' },
  { value: 'OVER_20KG', label: '20Kg 이상의 물건을 다룰 수 있음' },
];
const ENV_LSTN_TALK = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'DIFFICULT', label: '듣고 말하는 작업 어려움' },
  { value: 'SIMPLE', label: '간단한 듣고 말하기 가능' },
  { value: 'FLUENT', label: '듣고 말하기에 어려움 없음' },
];
const ENV_STND_WALK = [
  { value: 'IMPOSSIBLE', label: '불가능' },
  { value: 'NO_INFO', label: '정보없음' },
  { value: 'DIFFICULT', label: '서거나 걷는 일 어려움' },
  { value: 'PARTIAL', label: '일부 서서하는 작업 가능' },
  { value: 'PROLONGED', label: '오랫동안 가능' },
];

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

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  background-color: white;
  &:focus {
    border-color: #1e3a8a;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
`;

const SectionLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e3a8a;
  margin: 1.5rem 0 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ErrorText = styled.p`
  font-size: 0.85rem;
  color: #dc2626;
  margin-top: 0.5rem;
  margin-bottom: 0;
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

const Signup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('individual');
  const [showPassword, setShowPassword] = useState(false);

  // 구직자 회원가입 필드 (백엔드 SignupRequest 스펙)
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [envBothHands, setEnvBothHands] = useState('BOTH_HANDS');
  const [envEyeSight, setEnvEyeSight] = useState('DAILY_ACTIVITY');
  const [envHandWork, setEnvHandWork] = useState('SMALL_ASSEMBLY');
  const [envLiftPower, setEnvLiftPower] = useState('UNDER_5KG');
  const [envLstnTalk, setEnvLstnTalk] = useState('FLUENT');
  const [envStndWalk, setEnvStndWalk] = useState('PROLONGED');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIndividualSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!lastName.trim() || !firstName.trim()) {
      setErrorMessage('성과 이름을 입력해주세요.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }
    if (!password || password.length < 8) {
      setErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        lastName: lastName.trim(),
        firstName: firstName.trim(),
        email: email.trim(),
        password,
        userPhone: userPhone.trim() || null,
        birthDate: birthDate ? birthDate : null,
        envBothHands,
        envEyeSight,
        envHandWork,
        envLiftPower,
        envLstnTalk,
        envStndWalk,
      };
      const { data } = await userSignup(payload);
      const accessToken = data?.accessToken ?? data?.access_token;
      const refreshToken = data?.refreshToken ?? data?.refresh_token;
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      navigate('/', { replace: true });
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message ?? err.response?.data?.error;
      if (status === 400) {
        setErrorMessage(typeof msg === 'string' ? msg : '이메일이 이미 사용 중이거나 입력값을 확인해주세요.');
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setErrorMessage('네트워크 연결을 확인해주세요.');
      } else {
        setErrorMessage('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <HeaderSection>
        <LogoBox>
          <User size={28} color="white" fill="white" />
        </LogoBox>
        <Title>배리어 프리</Title>
        <Subtitle>장애인 구직자와 기업을 연결합니다</Subtitle>
      </HeaderSection>

      <Card>
        <TabGroup>
          <Tab 
            active={activeTab === 'individual'} 
            onClick={() => { setActiveTab('individual'); setErrorMessage(''); }}
          >
            개인 회원
          </Tab>
          <Tab 
            active={activeTab === 'corporate'} 
            onClick={() => { setActiveTab('corporate'); setErrorMessage(''); }}
          >
            기업 회원
          </Tab>
        </TabGroup>

        <FormContainer>
          <FormTitle>
            {activeTab === 'individual' ? '개인 회원(구직자) 회원가입' : '기업 회원 회원가입'}
          </FormTitle>
          <FormDescription>아래 정보를 입력하여 회원가입을 진행하세요.</FormDescription>

          {activeTab === 'individual' ? (
            <form onSubmit={handleIndividualSubmit}>
              <InputGroup>
                <Label>성</Label>
                <InputWrapper>
                  <InputIcon><UserPlus size={18} /></InputIcon>
                  <Input
                    type="text"
                    placeholder="홍"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <Label>이름</Label>
                <InputWrapper>
                  <InputIcon><UserPlus size={18} /></InputIcon>
                  <Input
                    type="text"
                    placeholder="길동"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <Label>이메일</Label>
                <InputWrapper>
                  <InputIcon><Mail size={18} /></InputIcon>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <Label>비밀번호 (8자 이상)</Label>
                <InputWrapper>
                  <InputIcon><Lock size={18} /></InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8자 이상 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </PasswordToggle>
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <Label>전화번호 (선택)</Label>
                <InputWrapper>
                  <InputIcon><Mail size={18} /></InputIcon>
                  <Input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <Label>생년월일 (선택)</Label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </InputGroup>

              <SectionLabel>작업 환경·능력 (구직 매칭에 사용됩니다)</SectionLabel>
              <InputGroup>
                <Label>양손 작업 능력</Label>
                <Select value={envBothHands} onChange={(e) => setEnvBothHands(e.target.value)}>
                  {ENV_BOTH_HANDS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>시력 수준</Label>
                <Select value={envEyeSight} onChange={(e) => setEnvEyeSight(e.target.value)}>
                  {ENV_EYE_SIGHT.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>손작업 정밀도</Label>
                <Select value={envHandWork} onChange={(e) => setEnvHandWork(e.target.value)}>
                  {ENV_HAND_WORK.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>들기 힘</Label>
                <Select value={envLiftPower} onChange={(e) => setEnvLiftPower(e.target.value)}>
                  {ENV_LIFT_POWER.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>듣고 말하기 능력</Label>
                <Select value={envLstnTalk} onChange={(e) => setEnvLstnTalk(e.target.value)}>
                  {ENV_LSTN_TALK.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>서서 걷기 능력</Label>
                <Select value={envStndWalk} onChange={(e) => setEnvStndWalk(e.target.value)}>
                  {ENV_STND_WALK.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
              </InputGroup>

              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '가입 중...' : '회원가입'}
              </SubmitButton>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <FormDescription>기업 회원 가입은 담당자에게 문의해주세요.</FormDescription>
              <SubmitButton type="button" onClick={() => navigate('/login')}>
                로그인으로 이동
              </SubmitButton>
            </form>
          )}

          <FooterLink>
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </FooterLink>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default Signup;