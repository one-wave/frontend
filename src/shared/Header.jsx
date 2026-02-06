import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Accessibility, UserRound, LogOut, LogIn } from "lucide-react";
import { logout } from "../api/Auth";
import { clearAuthStorage } from "../api/Http";

// --- Styled Components ---
const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: #0b4da2; /* Deep Blue */
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HeaderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const HeaderBtn = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  &:hover {
    background: #f1f1f1;
    border-color: #ccc;
  }
`;

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_) {
      // 401 등 실패해도 로컬만 정리 후 로그인으로
    } finally {
      clearAuthStorage();
      navigate("/login", { replace: true });
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo onClick={() => navigate("/")}>
          <Accessibility size={28} />
          배리어 프리
        </Logo>
        <HeaderButtonGroup>
          {isLoggedIn ? (
            <>
              <HeaderBtn onClick={() => navigate("/user/mypage")}>
                <UserRound size={16} /> 마이페이지
              </HeaderBtn>
              <HeaderBtn onClick={handleLogout}>
                <LogOut size={16} /> 로그아웃
              </HeaderBtn>
            </>
          ) : (
            <HeaderBtn onClick={() => navigate("/login")}>
              <LogIn size={16} /> 로그인
            </HeaderBtn>
          )}
        </HeaderButtonGroup>
      </HeaderContent>
    </HeaderWrapper>
  );
}

export default Header;
