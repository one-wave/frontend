import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Content = styled.main`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 40px;
`;

const PageTitle = styled.h1`
  margin: 0 0 32px 0;
  color: #333;
  font-size: 32px;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Section = styled.div`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 2px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #667eea;
  font-size: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-size: 15px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  background-color: ${props => props.checked ? '#f0f4ff' : '#f9f9f9'};
  border: 2px solid ${props => props.checked ? '#667eea' : '#e0e0e0'};
  transition: all 0.2s;

  &:hover {
    background-color: #f0f4ff;
  }
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  span {
    color: #333;
    font-size: 14px;
    font-weight: ${props => props.checked ? '600' : '400'};
  }
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 14px 32px;
  background-color: ${props => props.primary ? '#667eea' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

function JobPostPage() {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState({
    ramp: false,
    elevator: false,
    parking: false,
    restroom: false,
    braille: false,
    signLanguage: false,
    assistiveDevice: false,
    flexibleWork: false,
  });

  const handleFacilityChange = (key) => {
    setFacilities({ ...facilities, [key]: !facilities[key] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('채용 공고가 등록되었습니다!');
    navigate('/company/dashboard');
  };

  return (
    <Container>
      <Header/>
      <Content>
        <PageTitle>채용 공고 등록</PageTitle>

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>기본 정보</SectionTitle>
            
            <FormGroup>
              <Label>공고 제목 *</Label>
              <Input 
                type="text" 
                placeholder="예: 웹 프론트엔드 개발자 모집"
                required
              />
            </FormGroup>

            <GridRow>
              <FormGroup>
                <Label>직무 분야 *</Label>
                <Select required>
                  <option value="">선택하세요</option>
                  <option value="dev">개발</option>
                  <option value="design">디자인</option>
                  <option value="planning">기획</option>
                  <option value="marketing">마케팅</option>
                  <option value="cs">고객상담</option>
                  <option value="admin">사무/행정</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>고용 형태 *</Label>
                <Select required>
                  <option value="">선택하세요</option>
                  <option value="regular">정규직</option>
                  <option value="contract">계약직</option>
                  <option value="parttime">파트타임</option>
                  <option value="intern">인턴</option>
                </Select>
              </FormGroup>
            </GridRow>

            <GridRow>
              <FormGroup>
                <Label>경력 요건 *</Label>
                <Select required>
                  <option value="">선택하세요</option>
                  <option value="newcomer">신입</option>
                  <option value="1-3">경력 1~3년</option>
                  <option value="3-5">경력 3~5년</option>
                  <option value="5+">경력 5년 이상</option>
                  <option value="any">경력무관</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>채용 인원 *</Label>
                <Input 
                  type="number" 
                  min="1"
                  placeholder="1"
                  required
                />
              </FormGroup>
            </GridRow>
          </Section>

          <Section>
            <SectionTitle>근무 조건</SectionTitle>
            
            <FormGroup>
              <Label>근무 지역 *</Label>
              <Input 
                type="text" 
                placeholder="예: 서울시 강남구 테헤란로 123"
                required
              />
            </FormGroup>

            <GridRow>
              <FormGroup>
                <Label>급여 *</Label>
                <Input 
                  type="text" 
                  placeholder="예: 연봉 3,500~4,500만원"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>근무 시간 *</Label>
                <Input 
                  type="text" 
                  placeholder="예: 09:00~18:00"
                  required
                />
              </FormGroup>
            </GridRow>
          </Section>

          <Section>
            <SectionTitle>상세 내용</SectionTitle>
            
            <FormGroup>
              <Label>주요 업무 *</Label>
              <TextArea 
                placeholder="구체적인 업무 내용을 작성해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>자격 요건 *</Label>
              <TextArea 
                placeholder="필수 자격 요건을 작성해주세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>우대 사항</Label>
              <TextArea 
                placeholder="우대 사항을 작성해주세요 (선택사항)"
              />
            </FormGroup>

            <FormGroup>
              <Label>복지 및 혜택</Label>
              <TextArea 
                placeholder="제공되는 복지 및 혜택을 작성해주세요"
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>편의시설 안내</SectionTitle>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              회사에서 제공 가능한 편의시설을 체크해주세요. 이는 장애인 구직자에게 중요한 정보입니다.
            </p>
            
            <CheckboxGrid>
              <CheckboxLabel checked={facilities.ramp}>
                <input 
                  type="checkbox" 
                  checked={facilities.ramp}
                  onChange={() => handleFacilityChange('ramp')}
                />
                <span>♿️ 경사로</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.elevator}>
                <input 
                  type="checkbox" 
                  checked={facilities.elevator}
                  onChange={() => handleFacilityChange('elevator')}
                />
                <span>🛗 엘리베이터</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.parking}>
                <input 
                  type="checkbox" 
                  checked={facilities.parking}
                  onChange={() => handleFacilityChange('parking')}
                />
                <span>🅿️ 장애인 주차공간</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.restroom}>
                <input 
                  type="checkbox" 
                  checked={facilities.restroom}
                  onChange={() => handleFacilityChange('restroom')}
                />
                <span>🚻 장애인 화장실</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.braille}>
                <input 
                  type="checkbox" 
                  checked={facilities.braille}
                  onChange={() => handleFacilityChange('braille')}
                />
                <span>👆 점자 블록</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.signLanguage}>
                <input 
                  type="checkbox" 
                  checked={facilities.signLanguage}
                  onChange={() => handleFacilityChange('signLanguage')}
                />
                <span>🤟 수어 통역 지원</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.assistiveDevice}>
                <input 
                  type="checkbox" 
                  checked={facilities.assistiveDevice}
                  onChange={() => handleFacilityChange('assistiveDevice')}
                />
                <span>🖥️ 보조기기 지원</span>
              </CheckboxLabel>
              
              <CheckboxLabel checked={facilities.flexibleWork}>
                <input 
                  type="checkbox" 
                  checked={facilities.flexibleWork}
                  onChange={() => handleFacilityChange('flexibleWork')}
                />
                <span>🏠 재택/유연근무 가능</span>
              </CheckboxLabel>
            </CheckboxGrid>
          </Section>

          <ButtonGroup>
            <Button type="button" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button type="submit" primary>
              공고 등록하기
            </Button>
          </ButtonGroup>
        </Form>
      </Content>
    </Container>
  );
}

export default JobPostPage;
