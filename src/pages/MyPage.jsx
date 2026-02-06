import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background-color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  color: #667eea;
  font-size: 24px;
  cursor: pointer;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Content = styled.main`
  max-width: 900px;
  margin: 30px auto;
  padding: 0 40px;
`;

const Section = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #333;
  font-size: 24px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
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
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FileUploadBox = styled.div`
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.hasFile ? '#f0f4ff' : '#fafafa'};

  &:hover {
    border-color: #667eea;
    background-color: #f0f4ff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInfo = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
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

function MyPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [facilities, setFacilities] = useState({
    wheelchair: false,
    elevator: false,
    parking: false,
    braille: false,
    signLanguage: false,
    tts: false,
    subtitles: false,
    flexible: false,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleFacilityChange = (key) => {
    setFacilities({ ...facilities, [key]: !facilities[key] });
  };

  const handleSave = () => {
    alert('저장되었습니다!');
  };

  return (
    <Container>
      <Header>
        <Logo onClick={() => navigate('/user/main')}>잡케어</Logo>
        <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
      </Header>

      <Content>
        <Section>
          <SectionTitle>기본 정보</SectionTitle>
          
          <FormGroup>
            <Label>이름</Label>
            <Input type="text" placeholder="이름을 입력하세요" />
          </FormGroup>

          <FormGroup>
            <Label>이메일</Label>
            <Input type="email" placeholder="example@email.com" />
          </FormGroup>

          <FormGroup>
            <Label>전화번호</Label>
            <Input type="tel" placeholder="010-0000-0000" />
          </FormGroup>

          <FormGroup>
            <Label>주소</Label>
            <Input type="text" placeholder="서울시 강남구..." />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>이력서 관리</SectionTitle>
          
          <FormGroup>
            <Label>이력서 파일 업로드 (PDF)</Label>
            <FileUploadBox 
              hasFile={!!fileName}
              onClick={() => document.getElementById('resume-file').click()}
            >
              <FileInput 
                id="resume-file"
                type="file" 
                accept=".pdf"
                onChange={handleFileUpload}
              />
              {fileName ? (
                <FileInfo>📄 {fileName}</FileInfo>
              ) : (
                <FileInfo>📁 클릭하여 PDF 파일을 업로드하세요</FileInfo>
              )}
            </FileUploadBox>
          </FormGroup>

          <FormGroup>
            <Label>자기소개</Label>
            <TextArea placeholder="자기소개를 작성해주세요" />
          </FormGroup>

          <FormGroup>
            <Label>경력 사항</Label>
            <TextArea placeholder="경력 사항을 작성해주세요" />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>필요한 편의시설 및 지원</SectionTitle>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            선택하신 항목을 바탕으로 맞춤 공고를 추천해드립니다.
          </p>
          
          <CheckboxGrid>
            <CheckboxLabel checked={facilities.wheelchair}>
              <input 
                type="checkbox" 
                checked={facilities.wheelchair}
                onChange={() => handleFacilityChange('wheelchair')}
              />
              <span>♿️ 휠체어 접근</span>
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
              <span>🅿️ 장애인 주차</span>
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
              <span>🤟 수어 통역</span>
            </CheckboxLabel>
            
            <CheckboxLabel checked={facilities.tts}>
              <input 
                type="checkbox" 
                checked={facilities.tts}
                onChange={() => handleFacilityChange('tts')}
              />
              <span>🔊 음성 지원</span>
            </CheckboxLabel>
            
            <CheckboxLabel checked={facilities.subtitles}>
              <input 
                type="checkbox" 
                checked={facilities.subtitles}
                onChange={() => handleFacilityChange('subtitles')}
              />
              <span>📝 자막 지원</span>
            </CheckboxLabel>
            
            <CheckboxLabel checked={facilities.flexible}>
              <input 
                type="checkbox" 
                checked={facilities.flexible}
                onChange={() => handleFacilityChange('flexible')}
              />
              <span>🏠 재택/유연근무</span>
            </CheckboxLabel>
          </CheckboxGrid>
        </Section>

        <ButtonGroup>
          <Button onClick={() => navigate(-1)}>취소</Button>
          <Button primary onClick={handleSave}>저장하기</Button>
        </ButtonGroup>
      </Content>
    </Container>
  );
}

export default MyPage;
