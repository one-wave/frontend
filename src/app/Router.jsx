import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UserMainPage from '../pages/UserMainPage';
import JobDetailPage from '../pages/JobDetailPage';
import MyPage from '../pages/MyPage';
import CompanyDashboardPage from '../pages/CompanyDashboardPage';
import JobPostPage from '../pages/JobPostPage';

function Router() {
  // 임시로 localStorage 사용 (추후 전역 상태관리로 변경)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType'); // 'jobseeker' or 'company'

  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 */}
        <Route path="/" element={<UserMainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* 구직자 - 로그인 필요 */}
        <Route 
          path="/user/job/:jobId" 
          element={isLoggedIn ? <JobDetailPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/user/mypage" 
          element={isLoggedIn ? <MyPage /> : <Navigate to="/login" replace />} 
        />
        
        {/* 기업 - 로그인 필요 */}
        <Route 
          path="/company/dashboard" 
          element={isLoggedIn && userType === 'company' ? <CompanyDashboardPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/company/job-post" 
          element={isLoggedIn && userType === 'company' ? <JobPostPage /> : <Navigate to="/login" replace />} 
        />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
