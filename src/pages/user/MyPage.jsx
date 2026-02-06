import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getResumes } from "../../api/Auth";
import { api } from "../../api/Http";
import { getCompanyApiBaseUrl } from "../../api/Http";
import {
  User,
  Crown,
  Edit3,
  FolderOpen,
  Send,
  Calendar,
  Bookmark,
  Activity,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  CheckCircle,
} from "lucide-react";
import Header from "../../shared/Header";

// 백엔드 GET /api/profile 응답 형식에 맞춤. 표시용 기본값
const defaultProfileDisplay = {
  lastName: "",
  firstName: "",
  email: "",
  userPhone: "",
  birthDate: "",
  envBothHandsLabel: "정보 없음",
  envEyeSightLabel: "정보 없음",
  envHandWorkLabel: "정보 없음",
  envLiftPowerLabel: "정보 없음",
  envLstnTalkLabel: "정보 없음",
  envStndWalkLabel: "정보 없음",
};

function formatDate(value) {
  if (!value) return "";
  const s = typeof value === "string" ? value : (value.dateTime || value);
  const str = String(s);
  if (str.length >= 10) return str.slice(0, 10).replace(/-/g, ". ");
  return str;
}

// --- Styled Components (스타일 정의) ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 80px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`;

// 1. 프로필 섹션 스타일
const ProfileSection = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ProfileBasicInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f0f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1b3a6b;
  border: 2px solid #dee2e6;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Name = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
  margin: 0;
`;

const StatusBadge = styled.span`
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const InfoTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #555;
  background-color: #f8f9fa;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #eee;
`;

const ActionLink = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0;
`;

// 신체/환경 조건 그리드
const CapabilitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1b3a6b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CapabilityItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #eee;
  word-break: keep-all;
`;

const CapLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: #1b3a6b;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CapValue = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
`;

// 2. 대표 이력서 섹션 스타일
const ResumeHeader = styled.div`
  background-color: #1b3a6b;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
`;

const ResumeBody = styled.div`
  padding: 30px;
`;

const HelperText = styled.p`
  font-size: 0.9rem;
  color: #8898aa;
  margin-bottom: 20px;
`;

const ResumeTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px dashed #eee;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;

  label {
    display: block;
    font-size: 0.85rem;
    color: #8898aa;
    margin-bottom: 6px;
  }
  p {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;

  ${(props) =>
    props.primary
      ? `
    background-color: #1B3A6B;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(27, 58, 107, 0.2);
    &:hover { background-color: #162f56; transform: translateY(-1px); }
  `
      : `
    background-color: white;
    color: #333;
    border: 1px solid #ddd;
    &:hover { background-color: #f8f9fa; border-color: #ccc; }
  `}
`;

// 3. 활동 현황 스타일
const ActivityContainer = styled.div`
  padding: 30px;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityItem = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #1b3a6b;
  }
`;

const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  background-color: ${(props) => props.bg || "#f0f4f8"};
  color: ${(props) => props.color || "#333"};
`;

const Count = styled.span`
  font-size: 1.6rem;
  font-weight: 800;
  color: #333;
`;

const Label = styled.span`
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
`;

// --- Main Component ---

function MyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [representativeResume, setRepresentativeResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [applicationStats, setApplicationStats] = useState({
    totalApplications: 0,
    interviewScheduled: 0,
  });
  const [scrapedCount, setScrapedCount] = useState(0);

  // 스크랩 개수 가져오기
  const getScrapedCount = () => {
    try {
      const scraped = localStorage.getItem("scrapedJobs");
      const scrapedJobs = scraped ? JSON.parse(scraped) : [];
      return scrapedJobs.length;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    let cancelled = false;

    // 초기 스크랩 개수 설정
    setScrapedCount(getScrapedCount());

    // 스크랩 변경 이벤트 리스너
    const handleScrapedUpdate = () => {
      if (!cancelled) {
        setScrapedCount(getScrapedCount());
      }
    };

    window.addEventListener("scrapedJobsUpdated", handleScrapedUpdate);

    const load = async () => {
      setLoading(true);
      setProfileError(null);
      try {
        const [profileRes, resumesRes] = await Promise.all([
          getProfile(),
          getResumes().catch(() => ({ data: [] })),
        ]);

        if (!cancelled) {
          setProfile(profileRes.data);
          const list = Array.isArray(resumesRes?.data) ? resumesRes.data : [];
          const rep = list.find((r) => r.isRepresentative) || list[0] || null;
          setRepresentativeResume(rep);
        }

        // 지원 통계 가져오기
        const userId = localStorage.getItem("userId");
        if (userId && !cancelled) {
          try {
            const apiBaseUrl = getCompanyApiBaseUrl();
            const token = localStorage.getItem("accessToken");
            
            const response = await fetch(
              `${apiBaseUrl}/api/enterprise/company/applications?userId=${userId}`,
              {
                headers: token
                  ? {
                      Authorization: `Bearer ${token}`,
                    }
                  : undefined,
              }
            );

            if (!response.ok) {
              throw new Error("지원 통계를 불러오지 못했습니다.");
            }

            const data = await response.json();
            const allApplications = Array.isArray(data.data)
              ? data.data
              : Array.isArray(data)
              ? data
              : [];

            if (!cancelled) {
              // 현재 로그인한 사용자의 user_id와 일치하는 지원 내역만 필터링
              const currentUserId = localStorage.getItem("userId");
              const applications = allApplications.filter(
                (app) => app.user_id === currentUserId
              );

              const totalApplications = applications.length;
              const interviewScheduled = applications.filter(
                (app) => app.status === "면접 예정"
              ).length;

              setApplicationStats({
                totalApplications,
                interviewScheduled,
              });
            }
          } catch (appErr) {
            console.error("지원 통계 조회 실패:", appErr);
            // 지원 통계 조회 실패는 무시 (기본값 0 유지)
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("프로필 조회 실패:", err);
          setProfileError(err.response?.status === 401 ? "로그인이 필요합니다." : "프로필을 불러올 수 없습니다.");
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
      window.removeEventListener("scrapedJobsUpdated", handleScrapedUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#666" }}>
        정보를 불러오는 중입니다...
      </div>
    );
  }

  if (profileError) {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <ProfileSection>
              <HelperText style={{ color: "#dc2626", marginBottom: 16 }}>{profileError}</HelperText>
              <ActionButton primary onClick={() => navigate("/login")}>
                로그인
              </ActionButton>
            </ProfileSection>
          </Card>
        </Content>
      </Container>
    );
  }

  const user = {
    ...defaultProfileDisplay,
    ...profile,
    birthDate: profile?.birthDate != null ? formatDate(profile.birthDate) : "",
  };

  return (
    <Container>
      <Header />

      <Content>
        {/* 1. 프로필 정보 (목데이터 적용됨) */}
        <Card>
          <ProfileSection>
            <ProfileHeader>
              <ProfileBasicInfo>
                <Avatar>{user.lastName ? user.lastName[0] : <User />}</Avatar>

                <InfoText>
                  <NameWrapper>
                    <Name>
                      {user.lastName}
                      {user.firstName}
                    </Name>
                    <StatusBadge>
                      <CheckCircle size={12} /> 구직 중
                    </StatusBadge>
                  </NameWrapper>

                  <TagRow>
                    <InfoTag>
                      <Mail size={14} /> {user.email}
                    </InfoTag>
                    <InfoTag>
                      <Phone size={14} /> {user.userPhone}
                    </InfoTag>
                    <InfoTag>
                      <CalendarIcon size={14} /> {user.birthDate}
                    </InfoTag>
                  </TagRow>
                </InfoText>
              </ProfileBasicInfo>

              <ActionLink onClick={() => navigate("/user/profile/edit")}>
                <Edit3 size={16} /> 정보 수정
              </ActionLink>
            </ProfileHeader>

            <Divider />

            <CapabilitySection>
              <SectionTitle>
                <Activity size={20} color="#1b3a6b" /> 나의 업무 환경 및 신체
                역량
              </SectionTitle>
              <CapabilityGrid>
                <CapabilityItem>
                  <CapLabel>✋ 양손 작업</CapLabel>
                  <CapValue>{user.envBothHandsLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
                <CapabilityItem>
                  <CapLabel>👁 시력 활동</CapLabel>
                  <CapValue>{user.envEyeSightLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
                <CapabilityItem>
                  <CapLabel>🔧 정밀 작업(손)</CapLabel>
                  <CapValue>{user.envHandWorkLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
                <CapabilityItem>
                  <CapLabel>💪 들어올리기</CapLabel>
                  <CapValue>{user.envLiftPowerLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
                <CapabilityItem>
                  <CapLabel>🗣 듣고 말하기</CapLabel>
                  <CapValue>{user.envLstnTalkLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
                <CapabilityItem>
                  <CapLabel>🚶 서있기/보행</CapLabel>
                  <CapValue>{user.envStndWalkLabel || "정보 없음"}</CapValue>
                </CapabilityItem>
              </CapabilityGrid>
            </CapabilitySection>
          </ProfileSection>
        </Card>

        {/* 2. 대표 이력서 (백엔드 GET /api/resumes 중 isRepresentative 또는 첫 번째) */}
        <Card>
          <ResumeHeader>
            <Crown size={20} fill="white" /> 나의 대표 이력서
          </ResumeHeader>
          <ResumeBody>
            <HelperText>기업에게 가장 먼저 보여지는 이력서입니다.</HelperText>

            {representativeResume ? (
              <>
                <ResumeTitle>{representativeResume.resumeTitle || "제목 없음"}</ResumeTitle>
                <InfoGrid>
                  <InfoBox>
                    <label>최근 수정일</label>
                    <p>{formatDate(representativeResume.updatedAt) || "—"}</p>
                  </InfoBox>
                </InfoGrid>
                <ButtonGroup>
                  <ActionButton primary onClick={() => navigate(`/user/resumes/${representativeResume.resumeId}`)}>
                    <FolderOpen size={18} /> 이력서 보기
                  </ActionButton>
                  <ActionButton onClick={() => navigate("/user/resumes")}>
                    <FolderOpen size={18} /> 전체 이력서
                  </ActionButton>
                </ButtonGroup>
              </>
            ) : (
              <>
                <ResumeTitle>대표 이력서를 설정해주세요</ResumeTitle>
                <HelperText>이력서를 작성한 뒤 대표로 지정하면 기업에 노출됩니다.</HelperText>
                <ButtonGroup>
                  <ActionButton primary onClick={() => navigate("/user/resumes")}>
                    <FolderOpen size={18} /> 이력서 목록
                  </ActionButton>
                </ButtonGroup>
              </>
            )}
          </ResumeBody>
        </Card>

        {/* 3. 활동 현황 (통계) */}
        <Card>
          <ActivityContainer>
            <SectionTitle>내 활동 현황</SectionTitle>
            <ActivityGrid>
              <ActivityItem>
                <IconCircle bg="#E3F2FD" color="#1976D2">
                  <Send size={24} />
                </IconCircle>
                <Count>{applicationStats.totalApplications}</Count>
                <Label>지원 완료</Label>
              </ActivityItem>

              <ActivityItem>
                <IconCircle bg="#FFF8E1" color="#FFA000">
                  <Calendar size={24} />
                </IconCircle>
                <Count>{applicationStats.interviewScheduled}</Count>
                <Label>면접 예정</Label>
              </ActivityItem>

              <ActivityItem>
                <IconCircle bg="#FCE4EC" color="#D81B60">
                  <Bookmark size={24} />
                </IconCircle>
                <Count>{scrapedCount}</Count>
                <Label>스크랩 공고</Label>
              </ActivityItem>
            </ActivityGrid>
          </ActivityContainer>
        </Card>
      </Content>
    </Container>
  );
}

export default MyPage;
