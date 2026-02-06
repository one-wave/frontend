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

/** degree / graduationStatus 셀렉트 옵션 (API enum 참고) */
export const DEGREE_OPTIONS = [
  { value: "ASSOCIATE", label: "전문학사" },
  { value: "BACHELOR", label: "학사" },
  { value: "MASTER", label: "석사" },
  { value: "DOCTOR", label: "박사" },
];
export const GRADUATION_STATUS_OPTIONS = [
  { value: "IN_PROGRESS", label: "재학" },
  { value: "GRADUATED", label: "졸업" },
  { value: "LEAVE", label: "휴학" },
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
    representative: !!resume.representative,
  };
}
