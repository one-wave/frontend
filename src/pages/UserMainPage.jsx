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
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#667eea' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#667eea'};
  border: ${props => props.primary ? 'none' : '2px solid #667eea'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const SearchSection = styled.div`
  background-color: white;
  padding: 40px;
  margin: 30px auto;
  max-width: 1200px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  padding: 14px 32px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5568d3;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  span {
    color: #333;
    font-size: 14px;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px 40px;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const JobCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const JobTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 18px;
`;

const CompanyName = styled.p`
  margin: 0 0 8px 0;
  color: #667eea;
  font-size: 15px;
  font-weight: 600;
`;

const JobInfo = styled.p`
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
`;

const JobTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 4px 12px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 12px;
  font-size: 12px;
`;

function UserMainPage() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState({
    wheelchair: false,
    remote: false,
    visual: false,
    hearing: false,
  });

  // 더미 데이터
  const jobs = [
    {
      id: 1,
      title: '웹 프론트엔드 개발자',
      company: '테크케어',
      location: '서울 강남구',
      salary: '연봉 3,500~4,500만원',
      tags: ['휠체어 가능', '재택 근무', '신입 가능'],
    },
    {
      id: 2,
      title: '데이터 분석가',
      company: '데이터헬스',
      location: '서울 판교',
      salary: '연봉 4,000~5,000만원',
      tags: ['재택 근무', '경력 2년↑'],
    },
    {
      id: 3,
      title: '고객 상담원',
      company: '케어콜센터',
      location: '서울 마포구',
      salary: '연봉 2,800~3,200만원',
      tags: ['휠체어 가능', '청각보조기기 지원'],
    },
    {
      id: 4,
      title: '콘텐츠 기획자',
      company: '소셜임팩트',
      location: '서울 성수동',
      salary: '연봉 3,000~4,000만원',
      tags: ['재택 근무', '유연근무', '신입 가능'],
    },
  ];

  const handleJobClick = (jobId) => {
    navigate(`/user/job/${jobId}`);
  };

  return (
    <Container>
      <Header>
        <Logo>잡케어</Logo>
        <HeaderButtons>
          <Button onClick={() => navigate('/user/interview')}>🎤 면접 도우미</Button>
          <Button onClick={() => navigate('/user/mypage')}>마이페이지</Button>
          <Button primary onClick={() => navigate('/login')}>로그아웃</Button>
        </HeaderButtons>
      </Header>

      <SearchSection>
        <SearchBar>
          <SearchInput 
            placeholder="직무, 회사명, 지역으로 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchButton>검색</SearchButton>
        </SearchBar>

        <FilterSection>
          <CheckboxLabel>
            <input 
              type="checkbox" 
              checked={filters.wheelchair}
              onChange={(e) => setFilters({...filters, wheelchair: e.target.checked})}
            />
            <span>♿️ 휠체어 가능</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input 
              type="checkbox" 
              checked={filters.remote}
              onChange={(e) => setFilters({...filters, remote: e.target.checked})}
            />
            <span>🏠 재택 근무</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input 
              type="checkbox" 
              checked={filters.visual}
              onChange={(e) => setFilters({...filters, visual: e.target.checked})}
            />
            <span>👁️ 시각장애 지원</span>
          </CheckboxLabel>
          <CheckboxLabel>
            <input 
              type="checkbox" 
              checked={filters.hearing}
              onChange={(e) => setFilters({...filters, hearing: e.target.checked})}
            />
            <span>👂 청각장애 지원</span>
          </CheckboxLabel>
        </FilterSection>
      </SearchSection>

      <Content>
        <JobGrid>
          {jobs.map(job => (
            <JobCard key={job.id} onClick={() => handleJobClick(job.id)}>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company}</CompanyName>
              <JobInfo>
                📍 {job.location}<br />
                💰 {job.salary}
              </JobInfo>
              <JobTags>
                {job.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </JobTags>
            </JobCard>
          ))}
        </JobGrid>
      </Content>
    </Container>
  );
}

export default UserMainPage;
