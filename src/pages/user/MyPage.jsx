import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  Settings,
  Upload,
  Save,
  Edit3,
  Building,
  Monitor,
  Briefcase,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Header from "../../shared/Header";

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

// 1. Hero Section
const HeroSection = styled.div`
  background-color: #0b4da2;
  padding: 50px 0;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

// 2. Main Content
const Content = styled.main`
  max-width: 800px;
  margin: -30px auto 60px;
  margin-top: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Profile Section
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const AvatarCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eff6ff;
  border: 2px solid #0b4da2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0b4da2;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ProfileDesc = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
`;

const EditButton = styled.button`
  border: 1px solid #0b4da2;
  background: white;
  color: #0b4da2;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover {
    background: #f0f7ff;
  }
`;

// Resume Section - Uploaded State
const UploadedArea = styled.div`
  border: 2px dashed #2e7d32;
  background-color: #e8f5e9;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
`;

const UploadSuccessMsg = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1b5e20;
  margin-bottom: 8px;
`;

const UploadSubMsg = styled.p`
  font-size: 0.95rem;
  color: #4caf50;
  margin-bottom: 24px;
`;

const UploadedFileCard = styled.div`
  background: white;
  border: 1px solid #c8e6c9;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileIcon = styled(FileText)`
  color: #2e7d32;
`;

const FileName = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin-bottom: 4px;
`;

const FileSize = styled.span`
  font-size: 0.85rem;
  color: #888;
`;

const FileActions = styled.div`
  display: flex;
  gap: 8px;
`;

const FileActionBtn = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  cursor: pointer;
  border: 1px solid ${(props) => (props.delete ? "#e57373" : "#0b4da2")};
  color: ${(props) => (props.delete ? "#d32f2f" : "#0b4da2")};

  &:hover {
    background: ${(props) => (props.delete ? "#ffebee" : "#f0f7ff")};
  }
`;

// Resume Section - Initial Upload
const UploadArea = styled.div`
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0b4da2;
    background-color: #f0f7ff;
  }
`;

const UploadIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: #e3f2fd;
  color: #0b4da2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const FileInput = styled.input`
  display: none;
`;

// Facilities Section
const SectionGroup = styled.div`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CheckItem = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${(props) => (props.checked ? "#0b4da2" : "#eee")};
  border-radius: 6px;
  background: ${(props) => (props.checked ? "#f0f7ff" : "white")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0b4da2;
  }

  input {
    width: 18px;
    height: 18px;
    accent-color: #0b4da2;
  }

  span {
    font-size: 0.95rem;
    color: #333;
  }
`;

// Footer Action
const SaveButton = styled.button`
  width: 100%;
  background-color: #0b4da2;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11, 77, 162, 0.2);

  &:hover {
    background-color: #093c80;
  }
`;

function MyPage() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [facilities, setFacilities] = useState({
    wheelchair: false,
    elevator: false,
    parking: false,
    braille: false,
    screenReader: false,
    signLang: false,
    monitor: false,
    remote: false,
    flexible: false,
    shortTime: false,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + " MB");
    }
  };

  const handleFileDelete = () => {
    setFileName("");
    setFileSize("");
  };

  const handleFileReplace = () => {
    document.getElementById("resume-file").click();
  };

  const toggleCheck = (key) => {
    setFacilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("설정이 저장되었습니다!");
  };

  return (
    <Container>
      <Header />

      <HeroSection>
        <HeroTitle>마이페이지</HeroTitle>
        <HeroSubtitle>프로필과 편의시설 설정을 관리하세요</HeroSubtitle>
      </HeroSection>

      <Content>
        {/* 1. Profile Summary Card */}
        <Card>
          <CardHeader
            style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}
          >
            <CardTitle>
              <User size={20} /> 프로필 요약
            </CardTitle>
            <EditButton onClick={() => alert("수정 페이지로 이동")}>
              <Edit3 size={16} /> 수정
            </EditButton>
          </CardHeader>

          <div style={{ marginTop: "20px" }}>
            <ProfileWrapper>
              <AvatarCircle>
                <User size={40} />
              </AvatarCircle>
              <ProfileInfo>
                <ProfileName>김지원</ProfileName>
                <ProfileDesc>
                  웹 개발에 관심이 많은 시각장애 구직자입니다. 스크린 리더
                  환경에서도 효율적으로 작업할 수 있으며, 접근성 높은 웹
                  서비스를 만들고 싶습니다.
                </ProfileDesc>
              </ProfileInfo>
            </ProfileWrapper>
          </div>
        </Card>

        {/* 2. Resume Management Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <FileText size={20} /> 이력서 관리
            </CardTitle>
          </CardHeader>

          <FileInput
            id="resume-file"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
          />

          {fileName ? (
            <UploadedArea>
              <UploadIconWrapper
                style={{ background: "#c8e6c9", color: "#2e7d32" }}
              >
                <CheckCircle size={24} />
              </UploadIconWrapper>
              <UploadSuccessMsg>이력서가 업로드되었습니다</UploadSuccessMsg>
              <UploadSubMsg>아래에서 파일을 확인하세요</UploadSubMsg>

              <UploadedFileCard>
                <FileInfo>
                  <FileIcon size={28} />
                  <div>
                    <FileName>{fileName}</FileName>
                    <FileSize>{fileSize}</FileSize>
                  </div>
                </FileInfo>
                <FileActions>
                  <FileActionBtn onClick={handleFileReplace}>
                    <RefreshCw size={16} /> 교체
                  </FileActionBtn>
                  <FileActionBtn delete onClick={handleFileDelete}>
                    <Trash2 size={16} /> 삭제
                  </FileActionBtn>
                </FileActions>
              </UploadedFileCard>
            </UploadedArea>
          ) : (
            <UploadArea
              onClick={() => document.getElementById("resume-file").click()}
            >
              <UploadIconWrapper>
                <Upload size={24} />
              </UploadIconWrapper>
              <div>
                <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                  이력서 PDF 파일을 여기로 끌어오거나
                </p>
                <p style={{ fontWeight: 600 }}>클릭해서 업로드하세요</p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#999",
                    marginTop: "8px",
                  }}
                >
                  PDF 형식만 지원됩니다 (최대 10MB)
                </p>
              </div>
            </UploadArea>
          )}
        </Card>

        {/* 3. Facilities Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Settings size={20} /> 맞춤형 편의시설 및 근무 조건
            </CardTitle>
          </CardHeader>

          <SectionGroup>
            <SubTitle>
              <Building size={18} /> 물리적 환경
            </SubTitle>
            <GridContainer>
              <CheckItem checked={facilities.wheelchair}>
                <input
                  type="checkbox"
                  checked={facilities.wheelchair}
                  onChange={() => toggleCheck("wheelchair")}
                />
                <span>휠체어용 경사로</span>
              </CheckItem>
              <CheckItem checked={facilities.parking}>
                <input
                  type="checkbox"
                  checked={facilities.parking}
                  onChange={() => toggleCheck("parking")}
                />
                <span>장애인 전용 화장실</span>
              </CheckItem>
              <CheckItem checked={facilities.braille}>
                <input
                  type="checkbox"
                  checked={facilities.braille}
                  onChange={() => toggleCheck("braille")}
                />
                <span>점자 블록</span>
              </CheckItem>
              <CheckItem checked={facilities.elevator}>
                <input
                  type="checkbox"
                  checked={facilities.elevator}
                  onChange={() => toggleCheck("elevator")}
                />
                <span>엘리베이터</span>
              </CheckItem>
            </GridContainer>
          </SectionGroup>

          <hr
            style={{
              margin: "24px 0",
              border: "none",
              borderTop: "1px solid #eee",
            }}
          />

          <SectionGroup>
            <SubTitle>
              <Monitor size={18} /> 업무 지원
            </SubTitle>
            <GridContainer>
              <CheckItem checked={facilities.screenReader}>
                <input
                  type="checkbox"
                  checked={facilities.screenReader}
                  onChange={() => toggleCheck("screenReader")}
                />
                <span>스크린 리더 호환</span>
              </CheckItem>
              <CheckItem checked={facilities.signLang}>
                <input
                  type="checkbox"
                  checked={facilities.signLang}
                  onChange={() => toggleCheck("signLang")}
                />
                <span>수어 통역 지원</span>
              </CheckItem>
              <CheckItem checked={facilities.monitor}>
                <input
                  type="checkbox"
                  checked={facilities.monitor}
                  onChange={() => toggleCheck("monitor")}
                />
                <span>확대 모니터 제공</span>
              </CheckItem>
            </GridContainer>
          </SectionGroup>

          <hr
            style={{
              margin: "24px 0",
              border: "none",
              borderTop: "1px solid #eee",
            }}
          />

          <SectionGroup>
            <SubTitle>
              <Briefcase size={18} /> 근무 형태
            </SubTitle>
            <GridContainer>
              <CheckItem checked={facilities.remote}>
                <input
                  type="checkbox"
                  checked={facilities.remote}
                  onChange={() => toggleCheck("remote")}
                />
                <span>재택 근무 필수</span>
              </CheckItem>
              <CheckItem checked={facilities.flexible}>
                <input
                  type="checkbox"
                  checked={facilities.flexible}
                  onChange={() => toggleCheck("flexible")}
                />
                <span>시차 출퇴근제</span>
              </CheckItem>
              <CheckItem checked={facilities.shortTime}>
                <input
                  type="checkbox"
                  checked={facilities.shortTime}
                  onChange={() => toggleCheck("shortTime")}
                />
                <span>단시간 근로</span>
              </CheckItem>
            </GridContainer>
          </SectionGroup>
        </Card>

        <SaveButton onClick={handleSave}>
          <Save size={20} /> 설정 저장하기
        </SaveButton>
      </Content>
    </Container>
  );
}

export default MyPage;
