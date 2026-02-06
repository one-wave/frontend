import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, ChevronRight, Crown, Plus, FileAudio, Mic, Loader2, CheckCircle, AlertCircle, Volume2, VolumeX } from "lucide-react";
import Header from "../../../shared/Header";
import { getResumes, uploadVoiceResume } from "../../../api/Auth";
import useTTS from "../../../hooks/useTTS";

const GUIDE_AUDIO_URL =
  (import.meta.env.VITE_API_BASE_URL) + "/tts/guides/voice-resume-guide";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Content = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 20px 80px;
`;

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #555;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;

  &:hover {
    color: #1b3a6b;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  margin: 0;
`;

const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #1b3a6b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #162f56;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-color: #1b3a6b;
  }
`;

const ItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #e8eef5;
  color: #1b3a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemText = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const ItemMeta = styled.div`
  font-size: 0.85rem;
  color: #8898aa;
`;

const RepresentativeBadge = styled.span`
  background: #1b3a6b;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Chevron = styled(ChevronRight)`
  color: #8898aa;
  flex-shrink: 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #8898aa;
  font-size: 1rem;
  padding: 48px 24px;
  margin: 0;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 48px 24px;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.95rem;
  padding: 16px 0;
  margin: 0;
`;

// 음성 이력서
const VoiceResumeCard = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin-bottom: 24px;
`;

const VoiceResumeTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1b3a6b;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VoiceResumeHint = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 16px 0;
`;

const VoiceBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GuideBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid #1b3a6b;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(p) => (p.active ? "#1b3a6b" : "white")};
  color: ${(p) => (p.active ? "white" : "#1b3a6b")};

  &:hover {
    background: ${(p) => (p.active ? "#162f56" : "#e8eef5")};
  }

  &:focus-visible {
    outline: 3px solid #4a90d9;
    outline-offset: 2px;
  }
`;

const RecordBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(p) => (p.recording ? "#dc2626" : "#1b3a6b")};
  color: white;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 3px solid #4a90d9;
    outline-offset: 2px;
  }
`;

const TranscriptBox = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #334155;
  white-space: pre-wrap;
`;

const ResumeLinkBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 20px;
  background: #1b3a6b;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #162f56;
  }
  &:focus-visible {
    outline: 3px solid #4a90d9;
    outline-offset: 2px;
  }
`;

const VoiceError = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MAX_AUDIO_MB = 10;

const spin = keyframes` to { transform: rotate(360deg); } `;

const SpinnerWrap = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
`;

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ResumeListPage() {
  const navigate = useNavigate();
  const { toggle: toggleGuide, isSpeaking: isGuidePlaying } = useTTS();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getResumes();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.status === 401 ? "로그인이 필요합니다." : "이력서 목록을 불러올 수 없습니다.");
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  // 음성 이력서: idle | recording | uploading | success | error
  const [voiceStatus, setVoiceStatus] = useState("idle");
  const [voiceResult, setVoiceResult] = useState(null);
  const [voiceError, setVoiceError] = useState("");
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startVoiceRecording = async () => {
    setVoiceError("");
    setVoiceResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const sizeMB = blob.size / (1024 * 1024);
        if (sizeMB > MAX_AUDIO_MB) {
          setVoiceError(`파일 크기가 ${MAX_AUDIO_MB}MB를 초과합니다. (${sizeMB.toFixed(1)}MB)`);
          setVoiceStatus("error");
          return;
        }
        setVoiceStatus("uploading");
        try {
          const { data } = await uploadVoiceResume(blob);
          setVoiceResult({ transcript: data.transcript, resume: data.resume });
          setVoiceStatus("success");
          loadResumes();
        } catch (err) {
          const msg =
            err.response?.data?.message ?? err.response?.data?.error ?? "음성 이력서 변환에 실패했습니다.";
          setVoiceError(typeof msg === "string" ? msg : "음성 이력서 변환에 실패했습니다.");
          setVoiceStatus("error");
        }
      };

      recorder.start();
      setVoiceStatus("recording");
    } catch (err) {
      setVoiceError("마이크 접근이 거부되었거나 사용할 수 없습니다.");
      setVoiceStatus("error");
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <Container>
      <Header />
      <Content>
        <BackBtn type="button" onClick={() => navigate("/user/mypage")}>
          <ArrowLeft size={18} /> 마이페이지
        </BackBtn>
        <TitleRow>
          <PageTitle>이력서 목록</PageTitle>
          <AddBtn type="button" onClick={() => navigate("/user/resumes/new")}>
            <Plus size={18} /> 이력서 추가
          </AddBtn>
        </TitleRow>

        {/* 음성 이력서 */}
        <VoiceResumeCard>
          <VoiceResumeTitle>
            <FileAudio size={20} /> 음성으로 이력서 만들기
          </VoiceResumeTitle>
          <VoiceResumeHint>
            녹음한 음성을 텍스트로 변환한 뒤 이력서로 저장합니다. (최대 {MAX_AUDIO_MB}MB, 약 10~60초 소요)
          </VoiceResumeHint>
          <VoiceBtnGroup>
            <GuideBtn
              type="button"
              active={isGuidePlaying}
              onClick={() => toggleGuide(GUIDE_AUDIO_URL)}
            >
              {isGuidePlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
              {isGuidePlaying ? "안내 정지" : "녹음 전 안내 듣기"}
            </GuideBtn>
            {voiceStatus === "idle" && (
              <RecordBtn type="button" onClick={startVoiceRecording}>
                <Mic size={18} /> 녹음하기
              </RecordBtn>
            )}
            {voiceStatus === "recording" && (
              <RecordBtn type="button" recording onClick={stopVoiceRecording}>
                <Mic size={18} /> 녹음 중... (중지하려면 클릭)
              </RecordBtn>
            )}
            {voiceStatus === "uploading" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 0" }}>
                <SpinnerWrap><Loader2 size={20} /></SpinnerWrap>
                <span>변환 중입니다... (10~60초 소요)</span>
              </div>
            )}
          </VoiceBtnGroup>
          {voiceStatus === "success" && voiceResult && (
            <>
              <TranscriptBox>{voiceResult.transcript || "(변환된 텍스트 없음)"}</TranscriptBox>
              <VoiceBtnGroup style={{ marginTop: 12 }}>
                <ResumeLinkBtn type="button" onClick={() => navigate(`/user/resumes/${voiceResult.resume?.resumeId}`)}>
                  <CheckCircle size={16} /> 이력서 보기
                </ResumeLinkBtn>
                <RecordBtn
                  type="button"
                  style={{ background: "#6b7280" }}
                  onClick={() => { setVoiceStatus("idle"); setVoiceResult(null); }}
                >
                  다시 녹음
                </RecordBtn>
              </VoiceBtnGroup>
            </>
          )}
          {voiceStatus === "error" && (
            <VoiceBtnGroup style={{ marginTop: 12 }}>
              <VoiceError>
                <AlertCircle size={18} /> {voiceError}
              </VoiceError>
              <RecordBtn
                type="button"
                style={{ background: "#6b7280" }}
                onClick={() => { setVoiceStatus("idle"); setVoiceError(""); }}
              >
                다시 시도
              </RecordBtn>
            </VoiceBtnGroup>
          )}
        </VoiceResumeCard>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading ? (
          <LoadingMessage>이력서 목록을 불러오는 중입니다...</LoadingMessage>
        ) : resumes.length === 0 ? (
          <EmptyMessage>등록된 이력서가 없습니다. 이력서를 추가해보세요.</EmptyMessage>
        ) : (
          <List>
            {resumes.map((resume) => (
              <ListItem key={resume.resumeId}>
                <ItemButton
                  type="button"
                  onClick={() => navigate(`/user/resumes/${resume.resumeId}`)}
                >
                  <IconWrap>
                    <FileText size={24} />
                  </IconWrap>
                  <ItemText>
                    <ItemTitle>
                      {resume.resumeTitle || "제목 없음"}
                      {resume.isRepresentative && (
                        <RepresentativeBadge>
                          <Crown size={12} /> 대표
                        </RepresentativeBadge>
                      )}
                    </ItemTitle>
                    <ItemMeta>
                      최종 수정 {formatDate(resume.updatedAt)}
                    </ItemMeta>
                  </ItemText>
                  <Chevron size={20} />
                </ItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Content>
    </Container>
  );
}

export default ResumeListPage;
