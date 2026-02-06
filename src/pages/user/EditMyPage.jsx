/**
 * 프로필 수정 페이지.
 * - 기본 정보: PUT /api/profile
 * - 비밀번호 변경: PATCH /api/profile/password (모달에서 분리)
 */
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Activity } from "lucide-react";
import Header from "../../shared/Header";

const MOCK_PROFILE_DATA = {
  lastName: "이",
  firstName: "수현",
  email: "suhyeon.lee@example.com",
  userPhone: "010-9876-5432",
  birthDate: "1999-05-20",
  envBothHandsLabel: "양손작업 가능",
  envEyeSightLabel: "일상적 활동 가능",
  envHandWorkLabel: "정밀한 조립 가능",
  envLiftPowerLabel: "5Kg 이내의 물건을 다룰 수 있음",
  envLstnTalkLabel: "듣고 말하기에 어려움 없음",
  envStndWalkLabel: "오랫동안 서있기 가능",
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #555;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #1b3a6b;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  margin-bottom: 24px;
`;

const FormInner = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const PageTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 800;
  color: #333;
  margin: 0;
`;

const PasswordBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: white;
  color: #1b3a6b;
  border: 1px solid #1b3a6b;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e8eef5;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1b3a6b;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
`;

const Field = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: #1b3a6b;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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

  label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1b3a6b;
  }
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    &:focus {
      border-color: #1b3a6b;
    }
  }
`;

const SaveBtn = styled.button`
  align-self: flex-start;
  padding: 14px 28px;
  background: #1b3a6b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #162f56;
  }
`;

// --- Modal ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 420px;
  padding: 28px 32px;
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModalField = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    &:focus {
      border-color: #1b3a6b;
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ModalBtn = styled.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;

  ${(props) =>
    props.$primary
      ? `
    background: #1b3a6b;
    color: white;
    border: none;
    &:hover { background: #162f56; }
  `
      : `
    background: white;
    color: #555;
    border: 1px solid #ddd;
    &:hover { background: #f8f9fa; }
  `}
`;

const LoadingMsg = styled.p`
  text-align: center;
  color: #666;
  padding: 60px 20px;
`;

function EditMyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        setTimeout(() => {
          setProfile({ ...MOCK_PROFILE_DATA });
          setLoading(false);
        }, 400);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      lastName: form.lastName?.value?.trim() ?? "",
      firstName: form.firstName?.value?.trim() ?? "",
      email: form.email?.value?.trim() ?? "",
      userPhone: form.userPhone?.value?.trim() ?? "",
      birthDate: form.birthDate?.value?.trim() ?? "",
      envBothHandsLabel: form.envBothHandsLabel?.value?.trim() ?? "",
      envEyeSightLabel: form.envEyeSightLabel?.value?.trim() ?? "",
      envHandWorkLabel: form.envHandWorkLabel?.value?.trim() ?? "",
      envLiftPowerLabel: form.envLiftPowerLabel?.value?.trim() ?? "",
      envLstnTalkLabel: form.envLstnTalkLabel?.value?.trim() ?? "",
      envStndWalkLabel: form.envStndWalkLabel?.value?.trim() ?? "",
    };
    console.log("PUT /api/profile", payload);
    alert("프로필이 저장되었습니다. (API 연동 후 실제 반영)");
    navigate("/user/mypage");
  };

  const openPasswordModal = () => setPasswordModalOpen(true);
  const closePasswordModal = () => {
    setPasswordModalOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!newPassword || newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    if (newPassword.length < 8) {
      alert("비밀번호는 8자 이상으로 설정해주세요.");
      return;
    }
    console.log("PATCH /api/profile/password", { currentPassword, newPassword });
    alert("비밀번호가 변경되었습니다. (API 연동 후 실제 반영)");
    closePasswordModal();
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/mypage")}>
            <ArrowLeft size={18} /> 마이페이지
          </BackBtn>
          <LoadingMsg>정보를 불러오는 중입니다...</LoadingMsg>
        </Content>
      </Container>
    );
  }

  const user = profile ?? MOCK_PROFILE_DATA;

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={() => navigate("/user/mypage")}>
          <ArrowLeft size={18} /> 마이페이지
        </BackBtn>

        <Card>
          <FormInner>
            <FormHeader>
              <PageTitle>프로필 수정</PageTitle>
              <PasswordBtn type="button" onClick={openPasswordModal}>
                <Lock size={18} /> 비밀번호 변경
              </PasswordBtn>
            </FormHeader>

            <form onSubmit={handleProfileSubmit}>
              <SectionTitle>기본 정보</SectionTitle>
              <Row>
                <Field>
                  <label>성</label>
                  <input
                    name="lastName"
                    type="text"
                    defaultValue={user.lastName}
                    placeholder="이"
                  />
                </Field>
                <Field>
                  <label>이름</label>
                  <input
                    name="firstName"
                    type="text"
                    defaultValue={user.firstName}
                    placeholder="수현"
                  />
                </Field>
              </Row>
              <Field>
                <label>이메일</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  placeholder="example@email.com"
                />
              </Field>
              <Field>
                <label>전화번호</label>
                <input
                  name="userPhone"
                  type="tel"
                  defaultValue={user.userPhone}
                  placeholder="010-0000-0000"
                />
              </Field>
              <Field>
                <label>생년월일</label>
                <input
                  name="birthDate"
                  type="date"
                  defaultValue={user.birthDate}
                />
              </Field>

              <SectionTitle style={{ marginTop: "24px" }}>
                <Activity size={20} color="#1b3a6b" /> 나의 업무 환경 및 신체 역량
              </SectionTitle>
              <CapabilityGrid>
                <CapabilityItem>
                  <label>✋ 양손 작업</label>
                  <input
                    name="envBothHandsLabel"
                    type="text"
                    defaultValue={user.envBothHandsLabel}
                    placeholder="양손작업 가능"
                  />
                </CapabilityItem>
                <CapabilityItem>
                  <label>👁 시력 활동</label>
                  <input
                    name="envEyeSightLabel"
                    type="text"
                    defaultValue={user.envEyeSightLabel}
                    placeholder="일상적 활동 가능"
                  />
                </CapabilityItem>
                <CapabilityItem>
                  <label>🔧 정밀 작업(손)</label>
                  <input
                    name="envHandWorkLabel"
                    type="text"
                    defaultValue={user.envHandWorkLabel}
                    placeholder="정밀한 조립 가능"
                  />
                </CapabilityItem>
                <CapabilityItem>
                  <label>💪 들어올리기</label>
                  <input
                    name="envLiftPowerLabel"
                    type="text"
                    defaultValue={user.envLiftPowerLabel}
                    placeholder="5Kg 이내의 물건을 다룰 수 있음"
                  />
                </CapabilityItem>
                <CapabilityItem>
                  <label>🗣 듣고 말하기</label>
                  <input
                    name="envLstnTalkLabel"
                    type="text"
                    defaultValue={user.envLstnTalkLabel}
                    placeholder="듣고 말하기에 어려움 없음"
                  />
                </CapabilityItem>
                <CapabilityItem>
                  <label>🚶 서있기/보행</label>
                  <input
                    name="envStndWalkLabel"
                    type="text"
                    defaultValue={user.envStndWalkLabel}
                    placeholder="오랫동안 서있기 가능"
                  />
                </CapabilityItem>
              </CapabilityGrid>

              <SaveBtn type="submit" style={{ marginTop: "24px" }}>
                저장하기
              </SaveBtn>
            </form>
          </FormInner>
        </Card>
      </Content>

      {passwordModalOpen && (
        <Overlay onClick={(e) => e.target === e.currentTarget && closePasswordModal()}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              <Lock size={22} /> 비밀번호 변경
            </ModalTitle>
            <form onSubmit={handlePasswordSubmit}>
              <ModalField>
                <label>현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))
                  }
                  placeholder="현재 비밀번호"
                  autoComplete="current-password"
                />
              </ModalField>
              <ModalField>
                <label>새 비밀번호</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                  }
                  placeholder="8자 이상"
                  autoComplete="new-password"
                />
              </ModalField>
              <ModalField>
                <label>새 비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                  }
                  placeholder="다시 입력"
                  autoComplete="new-password"
                />
              </ModalField>
              <ModalActions>
                <ModalBtn type="button" onClick={closePasswordModal}>
                  취소
                </ModalBtn>
                <ModalBtn type="submit" $primary>
                  변경하기
                </ModalBtn>
              </ModalActions>
            </form>
          </ModalCard>
        </Overlay>
      )}
    </Container>
  );
}

export default EditMyPage;
