import React from 'react';
import styled from '@emotion/styled';
import { User, LogOut, Accessibility } from 'lucide-react';

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        {/* 왼쪽: 로고 및 서비스명 */}
        <LogoSection href="/">
          <LogoBox>
            <Accessibility size={20} color="white" strokeWidth={2.5} />
          </LogoBox>
          <ServiceTitle>배리어 프리</ServiceTitle>
        </LogoSection>

        {/* 오른쪽: 버튼 그룹 */}
        <ButtonGroup>
          <NavButton>
            <User size={18} />
            <span>마이페이지</span>
          </NavButton>
          <NavButton>
            <LogOut size={18} />
            <span>로그아웃</span>
          </NavButton>
        </ButtonGroup>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

// --- Emotion Styled Components ---

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 2px solid #1e3a8a; /* 이미지 하단의 파란색 라인 반영 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1200px; /* 전체 페이지 너비에 맞춰 조정 가능 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

const LogoSection = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const LogoBox = styled.div`
  background-color: #1e3a8a;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ServiceTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.03em;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  span {
    margin-top: 1px; /* 텍스트 정렬 미세 조정 */
  }
`;