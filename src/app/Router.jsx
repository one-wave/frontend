import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import UserMainPage from "../pages/user/UserMainPage";
import JobDetailPage from "../pages/user/JobDetailPage";
import MyPage from "../pages/user/MyPage";
import CompanyDashboardPage from "../pages/company/CompanyDashboardPage";
import JobPostPage from "../pages/company/JobPostPage";
import InterviewAssistantPage from "../pages/user/InterviewAssistantPage";

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
        <Route path="/user/interview" element={<InterviewAssistantPage />} />

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
