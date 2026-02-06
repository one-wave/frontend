import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Http";
import Header from "../../shared/Header";
import HeroSection from "../../features/UserMainPage/HeroSection";
import JobCard from "../../features/UserMainPage/JobCard";

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

// Main Layout
const MainLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

// Content Area
const ContentArea = styled.main`
  flex: 1;
`;

const CountHeader = styled.div`
  margin-bottom: 16px;
  font-size: 1rem;
  color: #555;
  display: flex;
  justify-content: space-between;
  align-items: center;
  strong {
    color: #0b4da2;
  }
`;

const SortDropdown = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #555;
  background: white;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #0b4da2;
  }
  &:focus {
    border-color: #0b4da2;
  }
`;

// Grid & Card
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2 columns like the image
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// --- Main Component ---

function UserMainPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(""); // 입력 중인 검색어
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색에 사용할 키워드
  const [sortBy, setSortBy] = useState("RECENT");
  
  const handleSearch = () => {
    setSearchKeyword(searchInput);
  };
  
  // 로그인 여부 확인 (최상단으로 이동)
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  // 백엔드 GET /api/job-posts — userId는 UUID일 때만 전달 (아니면 400), sortBy는 RECENT|SALARY_HIGH|MATCH_SCORE만
  const { data: jobPostsData, isLoading, isError } = useQuery({
    queryKey: ["jobPosts", { searchKeyword, sortBy, isLoggedIn }], // 로그인 상태 포함
    queryFn: async () => {
      // 로그인 상태에 따라 엔드포인트 분기
      const endpoint = isLoggedIn ? "/job-posts/matched" : "/job-posts";
      
      const rawUserId = localStorage.getItem("userId");
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const userId = rawUserId && uuidRegex.test(rawUserId) ? rawUserId : undefined;

      const params = {
        ...(isLoggedIn && userId && { userId }),
        ...(searchKeyword?.trim() && { keyword: searchKeyword.trim() }),
        sortBy: sortBy === "SALARY_LOW" ? "RECENT" : sortBy,
      };

      const response = await api.get(endpoint, { params });
      const body = response.data;
      return Array.isArray(body) ? body : body?.content ?? [];
    },
    staleTime: 1000 * 60 * 5, // 5분
  });

  // API 응답은 직접 배열로 옴
  const jobs = jobPostsData || [];

  const handleJobClick = (jobData, matchScore) => {
    navigate(`/user/job/${jobData.jobPostId}`, { 
      state: { 
        jobData,
        matchScore,
        isLoggedIn 
      } 
    });
  };

  return (
    <Container>
      <Header />
      <HeroSection 
        searchInput={searchInput} 
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />
      
      <MainLayout>
        <ContentArea>
          <CountHeader>
            <div>
              총 <strong>{jobs.length}</strong>건의 채용공고
            </div>
            <SortDropdown value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="RECENT">최신순</option>
              <option value="SALARY_HIGH">급여높은순</option>
              <option value="MATCH_SCORE">매칭점수순</option>
            </SortDropdown>
          </CountHeader>

          {isLoading && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>로딩 중...</div>
              <div style={{ fontSize: "0.9rem" }}>채용 공고를 불러오고 있습니다</div>
            </div>
          )}

          {isError && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#e03e3e" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>오류가 발생했습니다</div>
              <div style={{ fontSize: "0.9rem" }}>데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.</div>
            </div>
          )}

          {!isLoading && !isError && (
            <Grid>
              {jobs.map((item) => {
                // 로그인 상태에 따른 데이터 구조 처리
                const jobData = isLoggedIn ? item.post : item;
                const matchScore = isLoggedIn ? item.score : null;
                
                return (
                  <JobCard
                    key={jobData.jobPostId}
                    item={jobData}
                    matchScore={matchScore}
                    onClick={() => handleJobClick(jobData, matchScore)}
                  />
                );
              })}
            </Grid>
          )}
        </ContentArea>
      </MainLayout>
    </Container>
  );
}

export default UserMainPage;