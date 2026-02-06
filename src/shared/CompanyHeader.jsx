import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Accessibility,
} from "lucide-react";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
`;

const Sidebar = styled.aside`
  width: 260px;
  background-color: #243c5a;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const SidebarHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: 1.2rem;
  font-weight: 800;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Menu = styled.nav`
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background-color: ${(props) =>
    props.$active ? "rgba(255,255,255,0.1)" : "transparent"};
  color: ${(props) => (props.$active ? "white" : "#a0aec0")};
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
  }
`;

const SidebarFooter = styled.div`
  padding: 24px;
  font-size: 0.75rem;
  color: #718096;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 80px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const HeaderTitle = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 4px;
  }
  p {
    font-size: 0.9rem;
    color: #718096;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 600;
  &:hover {
    background: #f7fafc;
  }
`;

/**
 * 기업 관리자 공통 레이아웃 (사이드바 + 상단 헤더)
 * @param {React.ReactNode} children - 메인 콘텐츠 영역
 * @param {string} headerTitle - 헤더 제목
 * @param {string} headerSubtitle - 헤더 부제목
 */
function CompanyLayout({ children, headerTitle, headerSubtitle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/company/dashboard";
  const isJobPost = location.pathname === "/company/job-post";
  const isCompanyState = location.pathname === "/company/state";

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <SidebarHeader>
          <Accessibility size={28} />
          배리어 프리
        </SidebarHeader>
        <Menu>
          <MenuItem
            $active={isDashboard}
            onClick={() => navigate("/company/dashboard")}
          >
            <LayoutDashboard size={20} /> 대시보드
          </MenuItem>
          <MenuItem
            $active={isJobPost}
            onClick={() => navigate("/company/job-post")}
          >
            <FileText size={20} /> 공고 관리
          </MenuItem>
          <MenuItem
            $active={isCompanyState}
            onClick={() => navigate("/company/state")}
          >
            <Settings size={20} /> 기업 상태
          </MenuItem>
        </Menu>
        <SidebarFooter>기업 관리자 포털 v1.0</SidebarFooter>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>
            <h2>{headerTitle}</h2>
            <p>{headerSubtitle}</p>
          </HeaderTitle>
          <HeaderActions>
            <LogoutBtn onClick={handleLogout}>
              <LogOut size={16} /> 로그아웃
            </LogoutBtn>
          </HeaderActions>
        </Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}

export default CompanyLayout;
