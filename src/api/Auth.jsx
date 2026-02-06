import { api } from "./Http";

export const userlogin = (user) => {
  return api.post("/auth/login", user);
};

/** 로그아웃 — POST /api/auth/logout (해당 사용자 Refresh Token 전부 폐기) */
export const logout = () => {
  return api.post("/auth/logout");
};

export const userSignup = (payload) => {
  return api.post("/auth/signup", payload);
};

/** 내 프로필 조회 — GET /api/profile */
export const getProfile = () => {
  return api.get("/profile");
};

/** 이력서 목록 조회 — GET /api/resumes */
export const getResumes = () => {
  return api.get("/resumes");
};

/** 이력서 상세 조회 — GET /api/resumes/{resumeId} */
export const getResume = (resumeId) => {
  return api.get(`/resumes/${resumeId}`);
};

/** 이력서 생성 — POST /api/resumes (ResumeRequest) */
export const createResume = (payload) => {
  return api.post("/resumes", payload);
};

/** 이력서 수정 — PUT /api/resumes/{resumeId} (ResumeRequest) */
export const updateResume = (resumeId, payload) => {
  return api.put(`/resumes/${resumeId}`, payload);
};

/** 이력서 삭제 — DELETE /api/resumes/{resumeId} */
export const deleteResume = (resumeId) => {
  return api.delete(`/resumes/${resumeId}`);
};

/** 대표 이력서로 설정 — PATCH /api/resumes/{resumeId}/representative (기존 대표는 자동 해제) */
export const setRepresentative = (resumeId) => {
  return api.patch(`/resumes/${resumeId}/representative`);
};

/** 음성 이력서 업로드 — POST /api/resumes/voice (multipart "audio", 최대 10MB) */
export const uploadVoiceResume = (audioBlob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  return api.post("/resumes/voice", formData, {
    headers: { "Content-Type": undefined },
  });
};

/** 프로필 수정 — PUT /api/profile (ProfileRequest) */
export const updateProfile = (payload) => {
  return api.put("/profile", payload);
};

/** 비밀번호 변경 — PATCH /api/profile/password (ChangePasswordRequest) */
export const changePassword = (payload) => {
  return api.patch("/profile/password", payload);
};
