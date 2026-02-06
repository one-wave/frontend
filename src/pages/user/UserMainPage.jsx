import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Http";
import Header from "../../shared/Header";
import HeroSection from "../../features/UserMainPage/HeroSection";
import JobCard from "../../features/UserMainPage/JobCard";
import WorkAssistantBanner from "../../features/UserMainPage/WorkAssistantBanner";
import { GridSkeleton, JobCardSkeleton, SkeletonBox } from "../../components/Skeleton";

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

// Pagination
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${props => props.active ? '#0b4da2' : '#ddd'};
  background: ${props => props.active ? '#0b4da2' : 'white'};
  color: ${props => props.active ? 'white' : '#555'};
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#0b4da2' : '#f5f5f5'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin: 0 12px;
`;

// --- Main Component ---

function UserMainPage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(""); // 입력 중인 검색어
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색에 사용할 키워드
  const [sortBy, setSortBy] = useState("RECENT");
  const [page, setPage] = useState(0); // 페이지 번호 (0부터 시작)
  
  const handleSearch = () => {
    setSearchKeyword(searchInput);
    setPage(0); // 검색 시 첫 페이지로
  };
  
  // 로그인 여부 확인 (최상단으로 이동)
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  // 백엔드 GET /api/job-posts — userId는 UUID일 때만 전달 (아니면 400), sortBy는 RECENT|SALARY_HIGH|MATCH_SCORE만
  const { data: jobPostsData, isLoading, isError } = useQuery({
    queryKey: ["jobPosts", { searchKeyword, sortBy, isLoggedIn, page }], // 페이지 포함
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
        page: page,
        size: 20,
      };

      const response = await api.get(endpoint, { params });
      const body = response.data;
      
      // 페이지네이션 응답 처리
      if (body?.content) {
        return {
          jobs: body.content,
          totalPages: body.totalPages || 0,
          totalElements: body.totalElements || 0,
          currentPage: body.number || 0,
        };
      }
      
      // 배열로 직접 오는 경우 (페이지네이션 없음)
      return {
        jobs: Array.isArray(body) ? body : [],
        totalPages: 1,
        totalElements: Array.isArray(body) ? body.length : 0,
        currentPage: 0,
      };
    },
    staleTime: 1000 * 60 * 5, // 5분
  });

  // API 응답 처리
  const jobs = jobPostsData?.jobs || [];
  const totalPages = jobPostsData?.totalPages || 0;
  const totalElements = jobPostsData?.totalElements || 0;

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
          <WorkAssistantBanner />
          <CountHeader>
            <div>
              총 <strong>{totalElements}</strong>건의 채용공고
            </div>
            <SortDropdown value={sortBy} onChange={(e) => {
              setSortBy(e.target.value);
              setPage(0); // 정렬 변경 시 첫 페이지로
            }}>
              <option value="RECENT">최신순</option>
              <option value="SALARY_HIGH">급여높은순</option>
              <option value="MATCH_SCORE">매칭점수순</option>
            </SortDropdown>
          </CountHeader>

          {isLoading && (
            <GridSkeleton>
              {[...Array(6)].map((_, idx) => (
                <JobCardSkeleton key={idx}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <SkeletonBox width="44px" height="44px" style={{ borderRadius: "8px" }} />
                    <div style={{ flex: 1 }}>
                      <SkeletonBox width="60%" height="14px" marginBottom="8px" />
                      <SkeletonBox width="80%" height="20px" marginBottom="12px" />
                    </div>
                  </div>
                  <SkeletonBox width="100%" height="14px" marginBottom="8px" />
                  <SkeletonBox width="40%" height="16px" marginBottom="12px" />
                  <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
                    <SkeletonBox width="60px" height="24px" style={{ borderRadius: "4px" }} />
                    <SkeletonBox width="60px" height="24px" style={{ borderRadius: "4px" }} />
                    <SkeletonBox width="60px" height="24px" style={{ borderRadius: "4px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                    <SkeletonBox width="80px" height="20px" />
                    <SkeletonBox width="100px" height="36px" style={{ borderRadius: "6px" }} />
                  </div>
                </JobCardSkeleton>
              ))}
            </GridSkeleton>
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
          {!isLoading && !isError && totalPages > 1 && (
            <PaginationWrapper>
              <PageButton
                onClick={() => setPage(prev => Math.max(0, prev - 1))}
                disabled={page === 0}
              >
                이전
              </PageButton>
              
              {[...Array(totalPages)].map((_, idx) => {
                // 현재 페이지 주변 5개만 표시
                if (idx < page - 2 && idx !== 0) return null;
                if (idx > page + 2 && idx !== totalPages - 1) return null;
                if (idx === page - 3 || idx === page + 3) {
                  return <PageInfo key={idx}>...</PageInfo>;
                }
                
                return (
                  <PageButton
                    key={idx}
                    active={page === idx}
                    onClick={() => setPage(idx)}
                  >
                    {idx + 1}
                  </PageButton>
                );
              })}
              
              <PageButton
                onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={page >= totalPages - 1}
              >
                다음
              </PageButton>
            </PaginationWrapper>
          )}        </ContentArea>
      </MainLayout>
    </Container>
  );
}

export default UserMainPage;