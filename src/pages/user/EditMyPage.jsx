import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Activity } from "lucide-react";
import Header from "../../shared/Header";
import { getProfile, updateProfile, changePassword } from "../../api/Auth";


const ENV_BOTH_HANDS = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "ONE_HAND", label: "한손작업 가능" },
  { value: "ONE_HAND_ASSIST", label: "한손보조작업 가능" },
  { value: "BOTH_HANDS", label: "양손작업 가능" },
];
const ENV_EYE_SIGHT = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "LARGE_PRINT", label: "비교적 큰 인쇄물을 읽을 수 있음" },
  { value: "DAILY_ACTIVITY", label: "일상적 활동 가능" },
  { value: "FINE_PRINT", label: "아주 작은 글씨를 읽을 수 있음" },
];
const ENV_HAND_WORK = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "LARGE_ASSEMBLY", label: "큰 물품 조립가능" },
  { value: "SMALL_ASSEMBLY", label: "작은 물품 조립가능" },
  { value: "PRECISION", label: "정밀한 작업가능" },
];
const ENV_LIFT_POWER = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "UNDER_5KG", label: "5Kg 이내의 물건을 다룰 수 있음" },
  { value: "UNDER_20KG", label: "5~20Kg의 물건을 다룰 수 있음" },
  { value: "OVER_20KG", label: "20Kg 이상의 물건을 다룰 수 있음" },
];
const ENV_LSTN_TALK = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "DIFFICULT", label: "듣고 말하는 작업 어려움" },
  { value: "SIMPLE", label: "간단한 듣고 말하기 가능" },
  { value: "FLUENT", label: "듣고 말하기에 어려움 없음" },
];
const ENV_STND_WALK = [
  { value: "IMPOSSIBLE", label: "불가능" },
  { value: "NO_INFO", label: "정보없음" },
  { value: "DIFFICULT", label: "서거나 걷는 일 어려움" },
  { value: "PARTIAL", label: "일부 서서하는 작업 가능" },
  { value: "PROLONGED", label: "오랫동안 가능" },
];

function toDateValue(v) {
  if (!v) return "";
  const s = typeof v === "string" ? v : (v.dateTime != null ? v.dateTime : String(v));
  return String(s).slice(0, 10);
}

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
  select {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    background: white;
    &:focus {
      border-color: #1b3a6b;
    }
  }
`;

const ReadOnlyField = styled.div`
  margin-bottom: 16px;
  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  p {
    margin: 0;
    padding: 12px 14px;
    background: #f7fafc;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #4a5568;
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

const ErrorMsg = styled.p`
  font-size: 0.9rem;
  color: #dc2626;
  margin: 0 0 16px 0;
`;

function EditMyPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setProfileError(null);
      try {
        const { data } = await getProfile();
        if (!cancelled) setProfile(data);
      } catch (err) {
        if (!cancelled) {
          setProfileError(err.response?.status === 401 ? "로그인이 필요합니다." : "프로필을 불러올 수 없습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");
    const form = e.target;
    const userPhone = form.userPhone?.value?.trim() || null;
    const birthDateRaw = form.birthDate?.value?.trim();
    const birthDate = birthDateRaw || null;
    const payload = {
      userPhone,
      birthDate,
      envBothHands: form.envBothHands?.value ?? "BOTH_HANDS",
      envEyeSight: form.envEyeSight?.value ?? "DAILY_ACTIVITY",
      envHandWork: form.envHandWork?.value ?? "SMALL_ASSEMBLY",
      envLiftPower: form.envLiftPower?.value ?? "UNDER_5KG",
      envLstnTalk: form.envLstnTalk?.value ?? "FLUENT",
      envStndWalk: form.envStndWalk?.value ?? "PROLONGED",
    };
    setSaving(true);
    try {
      await updateProfile(payload);
      navigate("/user/mypage");
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data?.error;
      setSaveError(typeof msg === "string" ? msg : "저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
    setPasswordError("");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };
  const closePasswordModal = () => {
    setPasswordModalOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword.trim()) {
      setPasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setPasswordError("새 비밀번호는 8자 이상으로 설정해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    setPasswordSubmitting(true);
    try {
      await changePassword({ currentPassword, newPassword });
      closePasswordModal();
      setPasswordModalOpen(false);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message ?? err.response?.data?.error;
      if (status === 400) {
        setPasswordError(typeof msg === "string" ? msg : "현재 비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setPasswordSubmitting(false);
    }
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

  if (profileError) {
    return (
      <Container>
        <Header />
        <Content>
          <BackBtn type="button" onClick={() => navigate("/user/mypage")}>
            <ArrowLeft size={18} /> 마이페이지
          </BackBtn>
          <Card>
            <FormInner>
              <ErrorMsg>{profileError}</ErrorMsg>
              <SaveBtn type="button" onClick={() => navigate("/login")}>
                로그인
              </SaveBtn>
            </FormInner>
          </Card>
        </Content>
      </Container>
    );
  }

  const user = profile ?? {};

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
                <ReadOnlyField>
                  <label>성</label>
                  <p>{user.lastName ?? "—"}</p>
                </ReadOnlyField>
                <ReadOnlyField>
                  <label>이름</label>
                  <p>{user.firstName ?? "—"}</p>
                </ReadOnlyField>
              </Row>
              <ReadOnlyField>
                <label>이메일</label>
                <p>{user.email ?? "—"}</p>
              </ReadOnlyField>
              <Field>
                <label>전화번호</label>
                <input
                  name="userPhone"
                  type="tel"
                  defaultValue={user.userPhone ?? ""}
                  placeholder="010-0000-0000"
                />
              </Field>
              <Field>
                <label>생년월일</label>
                <input
                  name="birthDate"
                  type="date"
                  defaultValue={toDateValue(user.birthDate)}
                />
              </Field>

              <SectionTitle style={{ marginTop: "24px" }}>
                <Activity size={20} color="#1b3a6b" /> 나의 업무 환경 및 신체 역량
              </SectionTitle>
              <CapabilityGrid>
                <CapabilityItem>
                  <label>✋ 양손 작업</label>
                  <select name="envBothHands" defaultValue={user.envBothHands ?? "BOTH_HANDS"}>
                    {ENV_BOTH_HANDS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
                <CapabilityItem>
                  <label>👁 시력 활동</label>
                  <select name="envEyeSight" defaultValue={user.envEyeSight ?? "DAILY_ACTIVITY"}>
                    {ENV_EYE_SIGHT.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
                <CapabilityItem>
                  <label>{"🔧 정밀 작업(손)"}</label>
                  <select name="envHandWork" defaultValue={user.envHandWork ?? "SMALL_ASSEMBLY"}>
                    {ENV_HAND_WORK.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
                <CapabilityItem>
                  <label>💪 들어올리기</label>
                  <select name="envLiftPower" defaultValue={user.envLiftPower ?? "UNDER_5KG"}>
                    {ENV_LIFT_POWER.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
                <CapabilityItem>
                  <label>🗣 듣고 말하기</label>
                  <select name="envLstnTalk" defaultValue={user.envLstnTalk ?? "FLUENT"}>
                    {ENV_LSTN_TALK.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
                <CapabilityItem>
                  <label>🚶 서있기/보행</label>
                  <select name="envStndWalk" defaultValue={user.envStndWalk ?? "PROLONGED"}>
                    {ENV_STND_WALK.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </CapabilityItem>
              </CapabilityGrid>

              {saveError && <ErrorMsg>{saveError}</ErrorMsg>}
              <SaveBtn type="submit" style={{ marginTop: "24px" }} disabled={saving}>
                {saving ? "저장 중..." : "저장하기"}
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
              {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}
              <ModalActions>
                <ModalBtn type="button" onClick={closePasswordModal} disabled={passwordSubmitting}>
                  취소
                </ModalBtn>
                <ModalBtn type="submit" $primary disabled={passwordSubmitting}>
                  {passwordSubmitting ? "변경 중..." : "변경하기"}
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
