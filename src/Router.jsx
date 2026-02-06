import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserMainPage from './pages/UserMainPage';
import JobDetailPage from './pages/JobDetailPage';
import MyPage from './pages/MyPage';
import InterviewAssistPage from './pages/InterviewAssistPage';
import CompanyDashboardPage from './pages/CompanyDashboardPage';
import JobPostPage from './pages/JobPostPage';
import ContestsPage from './pages/user/ContestsPage';
import EducationPage from './pages/user/EducationPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* 구직자 */}
        <Route path="/user/main" element={<UserMainPage />} />
        <Route path="/user/job/:jobId" element={<JobDetailPage />} />
        <Route path="/user/mypage" element={<MyPage />} />
        <Route path="/user/interview" element={<InterviewAssistPage />} />
        
        {/* 기업 */}
        <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
        <Route path="/company/job-post" element={<JobPostPage />} />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
