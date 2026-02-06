import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import UserMainPage from '../pages/UserMainPage';
import JobDetailPage from '../pages/JobDetailPage';
import MyPage from '../pages/MyPage';
import CompanyDashboardPage from '../pages/CompanyDashboardPage';
import JobPostPage from '../pages/JobPostPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 */}
        <Route path="/" element={<UserMainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* 구직자 */}
        <Route path="/user/job/:jobId" element={<JobDetailPage />} />
        <Route path="/user/mypage" element={<MyPage />} />
        
        {/* 기업 */}
        <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/company/job-post" element={<JobPostPage />} />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
