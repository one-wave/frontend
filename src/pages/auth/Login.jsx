import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
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

const CompanySearchInput = styled.input`
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

const CompanyList = styled.ul`
  max-height: 200px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  overflow-y: auto;
  background-color: #fff;
  list-style: none;
  padding: 4px 0;
`;

const CompanyItem = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ selected }) => (selected ? '#E3F2FD' : 'transparent')};
  color: ${({ selected }) => (selected ? '#0D47A1' : '#333')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const NewCompanyBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 6px;
  background-color: #f9f9f9;
  border: 1px dashed #c0c0c0;
`;

const SmallInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const SmallButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background-color: #1565C0;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0D47A1;
  }
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddCompanyButton = styled.button`
  border: none;
  background: none;
  color: #1565C0;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
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

const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #1565C0;
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  const [companies, setCompanies] = useState([]);
  const [companySearch, setCompanySearch] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [authCode, setAuthCode] = useState('');
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [companyError, setCompanyError] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyPhone, setNewCompanyPhone] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 기업 탭으로 처음 진입할 때만 기업 목록을 불러온다.
    if (activeTab === 'company' && companies.length === 0 && !isLoadingCompanies) {
      const fetchCompanies = async () => {
        try {
          setIsLoadingCompanies(true);
          setCompanyError('');
          // Vite dev 서버 프록시(`/api` → `http://34.64.188.189:4000`)를 통해 호출
          const res = await fetch('/api/enterprise/company');
          if (!res.ok) {
            throw new Error('기업 목록을 불러오지 못했습니다.');
          }
          const data = await res.json();
          setCompanies(data.data || []);
        } catch (error) {
          console.error(error);
          setCompanyError('기업 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
          setIsLoadingCompanies(false);
        }
      };

      fetchCompanies();
    }
  }, [activeTab, companies.length, isLoadingCompanies]);

  useEffect(() => {
    if (!showToast || !toastMessage) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showToast, toastMessage]);

  const filteredCompanies = useMemo(() => {
    if (!companySearch.trim()) return companies;
    const keyword = companySearch.trim().toLowerCase();
    return companies.filter((c) =>
      c.company_name?.toLowerCase().includes(keyword)
    );
  }, [companies, companySearch]);

  const selectedCompany = useMemo(
    () => companies.find((c) => c.company_id === selectedCompanyId) || null,
    [companies, selectedCompanyId]
  );

  const isCompanyNotFound =
    companySearch.trim().length > 0 && filteredCompanies.length === 0;

  const handleLogin = async (e) => {
    e.preventDefault();

    const userType = activeTab === 'individual' ? 'jobseeker' : 'company';

    if (userType === 'jobseeker') {
      // TODO: 실제 로그인 API 연동
      navigate('/');
      return;
    }

    // 기업 로그인: 회사 선택 + 인증코드 입력 필수
    if (!selectedCompany) {
      alert('기업을 먼저 선택해주세요.');
      return;
    }

    if (!authCode.trim()) {
      alert('인증코드를 입력해주세요.');
      return;
    }

    try {
      // 기업 회원 로그인: 인증코드만 보내는 로그인 요청
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_code: authCode.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('로그인 요청이 실패했습니다.');
      }

      const result = await res.json();
      console.log('기업 로그인 성공 응답:', result);

      // 로그인 성공 시 기업용 토큰 저장
      if (result?.success && result?.token) {
        try {
          localStorage.setItem('companyToken', result.token);
          if (result.expiresAt) {
            localStorage.setItem('companyTokenExpiresAt', result.expiresAt);
          }
        } catch (storageError) {
          console.error('토큰 저장 중 오류 발생:', storageError);
        }
      }

      navigate('/company/dashboard', {
        state: {
          company: selectedCompany,
          authCode: authCode.trim(),
        },
      });
    } catch (error) {
      console.error(error);
      alert('기업 로그인에 실패했습니다. 인증코드를 다시 확인해주세요.');
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
            {activeTab === 'individual' ? '개인 회원 로그인' : '기업 회원 로그인'}
          </FormTitle>
          <FormDescription>
            {activeTab === 'individual'
              ? '이메일과 비밀번호를 입력하여 로그인하세요.'
              : '기업을 선택하고 인증코드를 입력하여 로그인하세요.'}
          </FormDescription>
        </FormHeader>

        <LoginForm onSubmit={handleLogin}>
          {activeTab === 'individual' && (
            <>
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
            </>
          )}

          {activeTab === 'company' && (
            <>
              <InputGroup>
                <LabelRow>
                  <Label>기업 선택</Label>
                  <AddCompanyButton
                    type="button"
                    onClick={() => setIsRegisterOpen((prev) => !prev)}
                  >
                    {isRegisterOpen ? '기업 추가 접기' : '기업 추가하기'}
                  </AddCompanyButton>
                </LabelRow>
                <CompanySearchInput
                  type="text"
                  placeholder="기업명을 검색해서 선택하세요"
                  value={companySearch}
                  onChange={(e) => {
                    setCompanySearch(e.target.value);
                    setSelectedCompanyId(null);
                  }}
                />
                <HelperText>
                  처음에는 기업명을 검색해 선택한 뒤, 아래에서 인증코드를 입력하세요.
                </HelperText>
                {companyError && (
                  <HelperText style={{ color: 'red' }}>{companyError}</HelperText>
                )}
                {isLoadingCompanies ? (
                  <HelperText>기업 목록을 불러오는 중입니다...</HelperText>
                ) : (
                  filteredCompanies.length > 0 && (
                    <CompanyList>
                      {filteredCompanies.map((company) => (
                        <CompanyItem
                          key={company.company_id}
                          selected={company.company_id === selectedCompanyId}
                          onClick={() => setSelectedCompanyId(company.company_id)}
                        >
                          <span>{company.company_name}</span>
                          <span style={{ fontSize: 12, color: '#777' }}>
                            {company.company_phone}
                          </span>
                        </CompanyItem>
                      ))}
                    </CompanyList>
                  )
                )}

                {(isCompanyNotFound || isRegisterOpen) && (
                  <NewCompanyBox>
                    <p style={{ fontSize: 13, marginBottom: 8 }}>
                      새로운 기업을 등록하려면 아래 정보를 입력 후 "기업 요청" 버튼을 눌러주세요.
                    </p>
                    <SmallInput
                      type="text"
                      placeholder="기업명 (예: 대한항공)"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                    />
                    <HelperText>
                      필수 항목입니다. 기업명을 정확히 입력해주세요.
                    </HelperText>
                    <SmallInput
                      type="text"
                      placeholder="대표 전화번호 (예: 1588-1519)"
                      value={newCompanyPhone}
                      onChange={(e) => setNewCompanyPhone(e.target.value)}
                    />
                    {registerMessage && (
                      <HelperText
                        style={{
                          color: registerMessage.includes('성공') ? 'green' : 'red',
                        }}
                      >
                        {registerMessage}
                      </HelperText>
                    )}
                    <SmallButton
                      type="button"
                      onClick={async () => {
                        setRegisterMessage('');
                        if (!newCompanyName.trim()) {
                          setRegisterMessage('companyName 값을 입력해주세요.');
                          return;
                        }

                        try {
                          setIsRegisterSubmitting(true);
                          const res = await fetch('/api/enterprise/company/register', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              companyName: newCompanyName.trim(),
                              companyPhone: newCompanyPhone.trim() || '1588-1519',
                            }),
                          });

                          if (res.status === 409) {
                            setRegisterMessage('이미 존재하는 기업입니다.');
                            return;
                          }

                          if (!res.ok) {
                            throw new Error('기업 등록에 실패했습니다.');
                          }

                          const result = await res.json();

                          // 1순위: { success: true, companyId: "..." } 형태 (현재 백엔드 응답)
                          // 2순위: { data: { company_id, company_name, ... } } 혹은 평범한 객체
                          let createdCompany;

                          if (result?.success && result?.companyId) {
                            createdCompany = {
                              company_id: result.companyId,
                              company_name: newCompanyName.trim(),
                              company_phone: newCompanyPhone.trim() || '1588-1519',
                            };

                            // 성공 시 응답의 companyId를 인증코드 입력란에 자동으로 채워줌
                            setAuthCode(result.companyId);
                          } else {
                            const fromData =
                              result?.data && !Array.isArray(result.data)
                                ? result.data
                                : result;

                            if (!fromData || !fromData.company_id) {
                              throw new Error('서버에서 올바른 기업 정보가 반환되지 않았습니다.');
                            }

                            createdCompany = fromData;
                          }

                          setCompanies((prev) => [...prev, createdCompany]);
                          setSelectedCompanyId(createdCompany.company_id);
                          setCompanySearch(createdCompany.company_name || newCompanyName.trim());
                          setNewCompanyName('');
                          setNewCompanyPhone('');
                          setIsRegisterOpen(false);
                          setRegisterMessage(
                            '기업이 성공적으로 등록되었습니다. 이제 인증코드를 입력해 로그인할 수 있습니다.'
                          );

                          setToastMessage(
                            '기업 등록이 완료되었습니다. 응답의 companyId를 인증코드로 사용하고 토글에 반드시 저장해주세요!'
                          );
                          setShowToast(true);
                        } catch (error) {
                          console.error(error);
                          setRegisterMessage(
                            '이미 존재하는 기업입니다.'
                          );
                        } finally {
                          setIsRegisterSubmitting(false);
                        }
                      }}
                    >
                      {isRegisterSubmitting ? '요청 중...' : '기업 요청'}
                    </SmallButton>
                  </NewCompanyBox>
                )}
              </InputGroup>

              <InputGroup>
                <Label>인증코드</Label>
                <Input
                  type="text"
                  placeholder="담당자에게 받은 인증코드를 입력하세요 (companyId가 그대로 표시됩니다)"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  disabled={!selectedCompany}
                />
                {!selectedCompany && (
                  <HelperText>
                    인증코드는 기업을 선택한 후에 입력할 수 있습니다.
                  </HelperText>
                )}
              </InputGroup>
            </>
          )}

          <LoginButton type="submit">로그인</LoginButton>
        </LoginForm>

        <SignUpLink>
          아직 계정이 없으신가요?
          <a onClick={() => navigate('/signup')}>회원가입</a>
        </SignUpLink>
      </LoginBox>

      {showToast && toastMessage && (
        <Toast>{toastMessage}</Toast>
      )}
    </Container>
  );
}

export default Login;


