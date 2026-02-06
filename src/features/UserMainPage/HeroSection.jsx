import styled from "@emotion/styled";
import { Search } from "lucide-react";

const HeroSectionWrapper = styled.div`
  background-color: #0b4da2;
  padding: 60px 0;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const SearchBarWrapper = styled.div`
  background: white;
  width: 600px;
  max-width: 90%;
  margin: 0 auto;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px;
  font-size: 1rem;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const SearchSubmitBtn = styled.button`
  background-color: #0b4da2;
  color: white;
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background-color: #093c80;
  }
`;

function HeroSection({ searchInput, setSearchInput, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <HeroSectionWrapper>
      <HeroTitle>나에게 맞는 일자리를 찾아보세요</HeroTitle>
      <HeroSubtitle>접근성을 고려한 채용 공고만 모았습니다</HeroSubtitle>
      <form onSubmit={handleSubmit}>
        <SearchBarWrapper>
          <SearchInput
            placeholder="직무, 회사명, 또는 키워드를 검색해보세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <SearchSubmitBtn type="submit">
            <Search size={18} /> 검색
          </SearchSubmitBtn>
        </SearchBarWrapper>
      </form>
    </HeroSectionWrapper>
  );
}

export default HeroSection;
