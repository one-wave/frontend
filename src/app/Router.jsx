import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import UserMainPage from "../pages/user/UserMainPage";
import JobDetailPage from "../pages/user/JobDetailPage";
import MyPage from "../pages/user/MyPage";
import EditMyPage from "../pages/user/EditMyPage";
import CompanyDashboardPage from "../pages/company/CompanyDashboardPage";
import JobPostPage from "../pages/company/JobPostPage";
import InterviewAssistantPage from "../pages/user/InterviewAssistantPage";
import ResumeListPage from "../pages/user/resume/ResumeListPage";
import ResumeCreatePage from "../pages/user/resume/ResumeCreatePage";
import ResumeDetailPage from "../pages/user/resume/ResumeDetailPage";
import ResumeEditorPage from "../pages/user/resume/ResumeEditorPage";

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
        <Route path="/user/profile/edit" element={<EditMyPage />} />
        <Route path="/user/interview" element={<InterviewAssistantPage />} />
        <Route path="/user/resumes" element={<ResumeListPage />} />
        <Route path="/user/resumes/new" element={<ResumeCreatePage />} />
        <Route path="/user/resumes/:resumeId" element={<ResumeDetailPage />} />
        <Route path="/user/resumes/:resumeId/edit" element={<ResumeEditorPage />} />

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
