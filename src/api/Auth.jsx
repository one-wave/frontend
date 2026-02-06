import { api } from './Http';

export const userlogin = (user) => {
  return api.post('/auth/login', user);
};

export const userSignup = (payload) => {
  return api.post('/auth/signup', payload);
};

/** 내 프로필 조회 — GET /api/profile */
export const getProfile = () => {
  return api.get('/profile');
};

/** 이력서 목록 조회 — GET /api/resumes */
export const getResumes = () => {
  return api.get('/resumes');
};

/** 프로필 수정 — PUT /api/profile (ProfileRequest) */
export const updateProfile = (payload) => {
  return api.put('/profile', payload);
};

/** 비밀번호 변경 — PATCH /api/profile/password (ChangePasswordRequest) */
export const changePassword = (payload) => {
  return api.patch('/profile/password', payload);
};
