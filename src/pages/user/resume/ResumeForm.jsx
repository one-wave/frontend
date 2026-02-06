/**
 * 이력서 추가/수정 공통 폼. Request body 구조(resumeTitle, educations, careers, ...)에 맞춤.
 * initialValues: EMPTY_RESUME_FORM 또는 responseToUpdateShape(상세) 결과
 * onSubmit: (formData) => void — 연동 시 POST 또는 PUT body로 전달
 */
import styled from "@emotion/styled";
import { useState, useCallback } from "react";
import { Save, Plus, Trash2, GraduationCap, Briefcase, Award, BookOpen, Languages, Crown } from "lucide-react";
import {
  EMPTY_EDUCATION,
  EMPTY_CAREER,
  EMPTY_CERTIFICATE,
  EMPTY_AWARD,
  EMPTY_LANGUAGE,
  DEGREE_OPTIONS,
  GRADUATION_STATUS_OPTIONS,
} from "./resumeApiShape";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Field = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 6px;
  }
  input[type="text"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: #1b3a6b;
    }
  }
  textarea {
    min-height: 80px;
    resize: vertical;
  }
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #1b3a6b;
    vertical-align: middle;
    margin-right: 8px;
  }
`;

const Section = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #1b3a6b;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Row = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 12px;
  position: relative;

  &:last-of-type {
    margin-bottom: 12px;
  }
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  background: #fff5f5;
  color: #c53030;
  border: 1px solid #feb2b2;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: #fed7d7;
  }
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  color: #1b3a6b;
  border: 1px solid #1b3a6b;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    background: #e8eef5;
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: #1b3a6b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #162f56;
  }
`;

const RepresentativeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

function ResumeForm({ initialValues, onSubmit, submitLabel = "저장" }) {
  const [formData, setFormData] = useState(() => ({
    resumeTitle: initialValues.resumeTitle ?? "",
    educations: [...(initialValues.educations ?? [])].map((e) => ({ ...EMPTY_EDUCATION, ...e })),
    careers: [...(initialValues.careers ?? [])].map((c) => ({ ...EMPTY_CAREER, ...c })),
    certificates: [...(initialValues.certificates ?? [])].map((c) => ({ ...EMPTY_CERTIFICATE, ...c })),
    awards: [...(initialValues.awards ?? [])].map((a) => ({ ...EMPTY_AWARD, ...a })),
    languages: [...(initialValues.languages ?? [])].map((l) => ({ ...EMPTY_LANGUAGE, ...l })),
    representative: !!initialValues.representative,
  }));

  const update = useCallback((path, value) => {
    setFormData((prev) => ({ ...prev, [path]: value }));
  }, []);

  const updateArray = useCallback((key, index, field, value) => {
    setFormData((prev) => {
      const arr = [...(prev[key] ?? [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  }, []);

  const addRow = useCallback((key, emptyShape) => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), { ...emptyShape }],
    }));
  }, []);

  const removeRow = useCallback((key, index) => {
    setFormData((prev) => {
      const arr = [...(prev[key] ?? [])];
      arr.splice(index, 1);
      return { ...prev, [key]: arr };
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <Field>
          <label>이력서 제목</label>
          <input
            type="text"
            value={formData.resumeTitle}
            onChange={(e) => update("resumeTitle", e.target.value)}
            placeholder="예: 2026년 상반기 이력서"
          />
        </Field>
        <RepresentativeWrap>
          <label>
            <input
              type="checkbox"
              checked={formData.representative}
              onChange={(e) => update("representative", e.target.checked)}
            />
            <Crown size={18} /> 대표 이력서로 지정
          </label>
        </RepresentativeWrap>
      </Section>

      {/* 학력 */}
      <Section>
        <SectionTitle><GraduationCap size={20} /> 학력</SectionTitle>
        {formData.educations.map((item, i) => (
          <Row key={i}>
            <DeleteBtn type="button" onClick={() => removeRow("educations", i)}>
              <Trash2 size={14} /> 삭제
            </DeleteBtn>
            <RowGrid>
              <Field>
                <label>학교명</label>
                <input
                  type="text"
                  value={item.schoolName}
                  onChange={(e) => updateArray("educations", i, "schoolName", e.target.value)}
                  placeholder="서울대학교"
                />
              </Field>
              <Field>
                <label>전공</label>
                <input
                  type="text"
                  value={item.major}
                  onChange={(e) => updateArray("educations", i, "major", e.target.value)}
                  placeholder="컴퓨터공학"
                />
              </Field>
            </RowGrid>
            <RowGrid>
              <Field>
                <label>학위</label>
                <select
                  value={item.degree}
                  onChange={(e) => updateArray("educations", i, "degree", e.target.value)}
                >
                  {DEGREE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field>
                <label>졸업 상태</label>
                <select
                  value={item.graduationStatus}
                  onChange={(e) => updateArray("educations", i, "graduationStatus", e.target.value)}
                >
                  {GRADUATION_STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
            </RowGrid>
            <RowGrid>
              <Field>
                <label>입학일</label>
                <input
                  type="date"
                  value={item.enrollmentDate || ""}
                  onChange={(e) => updateArray("educations", i, "enrollmentDate", e.target.value)}
                />
              </Field>
              <Field>
                <label>졸업일</label>
                <input
                  type="date"
                  value={item.graduationDate || ""}
                  onChange={(e) => updateArray("educations", i, "graduationDate", e.target.value)}
                />
              </Field>
            </RowGrid>
          </Row>
        ))}
        <AddBtn type="button" onClick={() => addRow("educations", EMPTY_EDUCATION)}>
          <Plus size={18} /> 학력 추가
        </AddBtn>
      </Section>

      {/* 경력 */}
      <Section>
        <SectionTitle><Briefcase size={20} /> 경력</SectionTitle>
        {formData.careers.map((item, i) => (
          <Row key={i}>
            <DeleteBtn type="button" onClick={() => removeRow("careers", i)}>
              <Trash2 size={14} /> 삭제
            </DeleteBtn>
            <RowGrid>
              <Field>
                <label>회사명</label>
                <input
                  type="text"
                  value={item.companyName}
                  onChange={(e) => updateArray("careers", i, "companyName", e.target.value)}
                  placeholder="(주)회사명"
                />
              </Field>
              <Field>
                <label>부서</label>
                <input
                  type="text"
                  value={item.department}
                  onChange={(e) => updateArray("careers", i, "department", e.target.value)}
                  placeholder="개발팀"
                />
              </Field>
            </RowGrid>
            <Field>
              <label>직위</label>
              <input
                type="text"
                value={item.position}
                onChange={(e) => updateArray("careers", i, "position", e.target.value)}
                placeholder="프론트엔드 개발자"
              />
            </Field>
            <RowGrid>
              <Field>
                <label>시작일</label>
                <input
                  type="date"
                  value={item.startDate || ""}
                  onChange={(e) => updateArray("careers", i, "startDate", e.target.value)}
                />
              </Field>
              <Field>
                <label>종료일</label>
                <input
                  type="date"
                  value={item.endDate || ""}
                  onChange={(e) => updateArray("careers", i, "endDate", e.target.value)}
                  disabled={!!item.currentJob}
                />
              </Field>
            </RowGrid>
            <Field>
              <label>
                <input
                  type="checkbox"
                  checked={!!item.currentJob}
                  onChange={(e) => updateArray("careers", i, "currentJob", e.target.checked)}
                />
                재직 중
              </label>
            </Field>
            <Field>
              <label>설명</label>
              <textarea
                value={item.description || ""}
                onChange={(e) => updateArray("careers", i, "description", e.target.value)}
                placeholder="담당 업무, 성과 등"
              />
            </Field>
          </Row>
        ))}
        <AddBtn type="button" onClick={() => addRow("careers", EMPTY_CAREER)}>
          <Plus size={18} /> 경력 추가
        </AddBtn>
      </Section>

      {/* 자격증 */}
      <Section>
        <SectionTitle><BookOpen size={20} /> 자격증</SectionTitle>
        {formData.certificates.map((item, i) => (
          <Row key={i}>
            <DeleteBtn type="button" onClick={() => removeRow("certificates", i)}>
              <Trash2 size={14} /> 삭제
            </DeleteBtn>
            <Field>
              <label>자격증명</label>
              <input
                type="text"
                value={item.certificateName}
                onChange={(e) => updateArray("certificates", i, "certificateName", e.target.value)}
                placeholder="정보처리기사"
              />
            </Field>
            <Field>
              <label>발급기관</label>
              <input
                type="text"
                value={item.issuingOrganization}
                onChange={(e) => updateArray("certificates", i, "issuingOrganization", e.target.value)}
                placeholder="한국산업인력공단"
              />
            </Field>
            <Field>
              <label>취득일</label>
              <input
                type="date"
                value={item.acquiredDate || ""}
                onChange={(e) => updateArray("certificates", i, "acquiredDate", e.target.value)}
              />
            </Field>
          </Row>
        ))}
        <AddBtn type="button" onClick={() => addRow("certificates", EMPTY_CERTIFICATE)}>
          <Plus size={18} /> 자격증 추가
        </AddBtn>
      </Section>

      {/* 수상 */}
      <Section>
        <SectionTitle><Award size={20} /> 수상</SectionTitle>
        {formData.awards.map((item, i) => (
          <Row key={i}>
            <DeleteBtn type="button" onClick={() => removeRow("awards", i)}>
              <Trash2 size={14} /> 삭제
            </DeleteBtn>
            <Field>
              <label>수상명</label>
              <input
                type="text"
                value={item.awardName}
                onChange={(e) => updateArray("awards", i, "awardName", e.target.value)}
                placeholder="우수 사내 해커톤 대상"
              />
            </Field>
            <Field>
              <label>발급기관</label>
              <input
                type="text"
                value={item.issuingOrganization}
                onChange={(e) => updateArray("awards", i, "issuingOrganization", e.target.value)}
              />
            </Field>
            <Field>
              <label>수상일</label>
              <input
                type="date"
                value={item.awardDate || ""}
                onChange={(e) => updateArray("awards", i, "awardDate", e.target.value)}
              />
            </Field>
            <Field>
              <label>설명</label>
              <textarea
                value={item.description || ""}
                onChange={(e) => updateArray("awards", i, "description", e.target.value)}
              />
            </Field>
          </Row>
        ))}
        <AddBtn type="button" onClick={() => addRow("awards", EMPTY_AWARD)}>
          <Plus size={18} /> 수상 추가
        </AddBtn>
      </Section>

      {/* 어학 */}
      <Section>
        <SectionTitle><Languages size={20} /> 어학</SectionTitle>
        {formData.languages.map((item, i) => (
          <Row key={i}>
            <DeleteBtn type="button" onClick={() => removeRow("languages", i)}>
              <Trash2 size={14} /> 삭제
            </DeleteBtn>
            <RowGrid>
              <Field>
                <label>언어</label>
                <input
                  type="text"
                  value={item.languageName}
                  onChange={(e) => updateArray("languages", i, "languageName", e.target.value)}
                  placeholder="영어"
                />
              </Field>
              <Field>
                <label>시험명</label>
                <input
                  type="text"
                  value={item.testName}
                  onChange={(e) => updateArray("languages", i, "testName", e.target.value)}
                  placeholder="TOEIC"
                />
              </Field>
            </RowGrid>
            <RowGrid>
              <Field>
                <label>점수</label>
                <input
                  type="text"
                  value={item.score || ""}
                  onChange={(e) => updateArray("languages", i, "score", e.target.value)}
                  placeholder="850"
                />
              </Field>
              <Field>
                <label>등급</label>
                <input
                  type="text"
                  value={item.grade || ""}
                  onChange={(e) => updateArray("languages", i, "grade", e.target.value)}
                  placeholder="선택"
                />
              </Field>
            </RowGrid>
            <Field>
              <label>취득일</label>
              <input
                type="date"
                value={item.acquiredDate || ""}
                onChange={(e) => updateArray("languages", i, "acquiredDate", e.target.value)}
              />
            </Field>
          </Row>
        ))}
        <AddBtn type="button" onClick={() => addRow("languages", EMPTY_LANGUAGE)}>
          <Plus size={18} /> 어학 추가
        </AddBtn>
      </Section>

      <SubmitBtn type="submit">
        <Save size={18} /> {submitLabel}
      </SubmitBtn>
    </Form>
  );
}

export default ResumeForm;
