export const RESUME_UPDATE_REQUEST_SHAPE = {
  resumeTitle: "",
  educations: [
    {
      schoolName: "",
      major: "",
      degree: "BACHELOR", // BACHELOR 등
      enrollmentDate: "",
      graduationDate: "",
      graduationStatus: "GRADUATED", // GRADUATED 등
    },
  ],
  careers: [
    {
      companyName: "",
      department: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      currentJob: false,
    },
  ],
  certificates: [
    {
      certificateName: "",
      issuingOrganization: "",
      acquiredDate: "",
    },
  ],
  awards: [
    {
      awardName: "",
      issuingOrganization: "",
      awardDate: "",
      description: "",
    },
  ],
  languages: [
    {
      languageName: "",
      testName: "",
      score: "",
      grade: "",
      acquiredDate: "",
    },
  ],
  representative: false,
};

/** 이력서 추가 페이지 초기값 (POST /api/resumes 요청 바디와 동일 구조, 빈 배열) */
export const EMPTY_RESUME_FORM = {
  resumeTitle: "",
  educations: [],
  careers: [],
  certificates: [],
  awards: [],
  languages: [],
  representative: false,
};

/** 폼에서 "항목 추가" 시 넣을 기본 객체 (request body 필드만) */
export const EMPTY_EDUCATION = {
  schoolName: "",
  major: "",
  degree: "BACHELOR",
  enrollmentDate: "",
  graduationDate: "",
  graduationStatus: "GRADUATED",
};
export const EMPTY_CAREER = {
  companyName: "",
  department: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
  currentJob: false,
};
export const EMPTY_CERTIFICATE = {
  certificateName: "",
  issuingOrganization: "",
  acquiredDate: "",
};
export const EMPTY_AWARD = {
  awardName: "",
  issuingOrganization: "",
  awardDate: "",
  description: "",
};
export const EMPTY_LANGUAGE = {
  languageName: "",
  testName: "",
  score: "",
  grade: "",
  acquiredDate: "",
};

/** 백엔드 EducLevel enum */
export const DEGREE_OPTIONS = [
  { value: "UNDER_HIGH_SCHOOL", label: "중졸이하" },
  { value: "HIGH_SCHOOL", label: "고졸" },
  { value: "ASSOCIATE", label: "초대졸" },
  { value: "BACHELOR", label: "대졸" },
  { value: "MASTER", label: "석사" },
  { value: "DOCTOR", label: "박사" },
];
/** 백엔드 GraduationStatus enum */
export const GRADUATION_STATUS_OPTIONS = [
  { value: "ENROLLED", label: "재학중" },
  { value: "GRADUATED", label: "졸업" },
  { value: "ON_LEAVE", label: "휴학" },
  { value: "DROPPED_OUT", label: "중퇴" },
  { value: "EXPECTED", label: "졸업예정" },
];

/**
 * 상세/목록 API 응답 → 수정 API 요청 바디로 변환 (id 제거)
 * 연동 시 GET /api/resumes/{resumeId} 응답에 사용
 */
export function responseToUpdateShape(resume) {
  if (!resume) return null;
  return {
    resumeTitle: resume.resumeTitle ?? "",
    educations: (resume.educations ?? []).map(
      ({ educationId, degreeLabel, graduationStatusLabel, ...rest }) => rest,
    ),
    careers: (resume.careers ?? []).map(({ careerId, ...rest }) => rest),
    certificates: (resume.certificates ?? []).map(
      ({ certificateId, ...rest }) => rest,
    ),
    awards: (resume.awards ?? []).map(({ awardId, ...rest }) => rest),
    languages: (resume.languages ?? []).map(({ languageId, ...rest }) => rest),
    representative: !!(resume.isRepresentative ?? resume.representative),
  };
}

/** 날짜 문자열 → YYYY-MM-DD 또는 null (API용) */
function toDate(val) {
  const s = val && String(val).trim();
  return s && s.length >= 10 ? s.slice(0, 10) : null;
}

/** 폼 데이터 → 백엔드 ResumeRequest (POST/PUT 공통) */
export function formToPayload(formData) {
  const educations = (formData.educations ?? [])
    .filter((e) => (e.schoolName ?? "").trim() !== "")
    .map((e) => ({
      schoolName: (e.schoolName ?? "").trim(),
      major: (e.major ?? "").trim() || null,
      degree: e.degree ?? "BACHELOR",
      enrollmentDate: toDate(e.enrollmentDate),
      graduationDate: toDate(e.graduationDate),
      graduationStatus: e.graduationStatus ?? "GRADUATED",
    }));

  const careers = (formData.careers ?? [])
    .filter((c) => {
      const company = (c.companyName ?? "").trim();
      const start = toDate(c.startDate);
      return company !== "" && start != null;
    })
    .map((c) => ({
      companyName: (c.companyName ?? "").trim(),
      department: (c.department ?? "").trim() || null,
      position: (c.position ?? "").trim() || null,
      startDate: toDate(c.startDate) || c.startDate?.slice(0, 10),
      endDate: toDate(c.endDate),
      description: (c.description ?? "").trim() || null,
      isCurrentJob: !!c.currentJob,
    }));

  const certificates = (formData.certificates ?? [])
    .filter((c) => (c.certificateName ?? "").trim() !== "")
    .map((c) => ({
      certificateName: (c.certificateName ?? "").trim(),
      issuingOrganization: (c.issuingOrganization ?? "").trim() || null,
      acquiredDate: toDate(c.acquiredDate),
    }));

  const awards = (formData.awards ?? [])
    .filter((a) => (a.awardName ?? "").trim() !== "")
    .map((a) => ({
      awardName: (a.awardName ?? "").trim(),
      issuingOrganization: (a.issuingOrganization ?? "").trim() || null,
      awardDate: toDate(a.awardDate),
      description: (a.description ?? "").trim() || null,
    }));

  const languages = (formData.languages ?? [])
    .filter((l) => (l.languageName ?? "").trim() !== "")
    .map((l) => ({
      languageName: (l.languageName ?? "").trim(),
      testName: (l.testName ?? "").trim() || null,
      score: (l.score ?? "").trim() || null,
      grade: (l.grade ?? "").trim() || null,
      acquiredDate: toDate(l.acquiredDate),
    }));

  return {
    resumeTitle: (formData.resumeTitle ?? "").trim() || "제목 없음",
    isRepresentative: !!formData.representative,
    educations,
    careers,
    certificates,
    awards,
    languages,
  };
}
