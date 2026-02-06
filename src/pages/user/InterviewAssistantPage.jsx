import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accessibility,
  UserRound,
  LogOut,
  Mic,
  AudioLines,
  Volume2,
  Send,
  MessageSquare,
} from "lucide-react";

// --- Global Styles ---
const GlobalStyle = css`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Pretendard", sans-serif;
  }
  body {
    background-color: #f8f9fa;
    color: #333;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }
`;

// --- Styled Components ---

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 1. Header (MyPage Style)
const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  flex-shrink: 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: #0b4da2;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HeaderButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const HeaderBtn = styled.button`
  background: ${(props) => (props.primary ? "#0b4da2" : "white")};
  border: 1px solid ${(props) => (props.primary ? "#0b4da2" : "#ddd")};
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${(props) => (props.primary ? "white" : "#555")};
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    background: ${(props) => (props.primary ? "#093c80" : "#f1f1f1")};
  }
`;

// 2. Hero Section (MyPage Style)
const HeroSection = styled.div`
  background-color: #0b4da2;
  padding: 40px 0 80px; /* Bottom padding for overlap */
  text-align: center;
  color: white;
  flex-shrink: 0;
`;

const HeroTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

// 3. Main Content Wrapper
const Content = styled.main`
  max-width: 1000px;
  width: 100%;
  margin: 0px auto 40px;
  padding: 40px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 4. Chat Card (Main Interface)
const ChatCard = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 700px; /* Fixed height for chat window */
  max-height: 80vh;
  overflow: hidden;
`;

// Status Bar inside Card
const StatusBar = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #fafafa;
`;

const StatusBadge = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #c8e6c9;
`;

const WaveIcon = styled(AudioLines)`
  color: #0b4da2;
`;

// Chat Area
const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: #555;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Bubble = styled.div`
  max-width: 80%;
  padding: 14px 20px;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  ${(props) =>
    props.isUser
      ? `
    background-color: #0b4da2; /* Primary Blue */
    color: white;
    border-radius: 16px 16px 4px 16px;
  `
      : `
    background-color: #f1f3f5;
    color: #333;
    border-radius: 16px 16px 16px 4px;
  `}
`;

const TimeStamp = styled.span`
  font-size: 0.75rem;
  color: #999;
  margin-top: 6px;
  margin-left: 4px;
  margin-right: 4px;
`;

// Input Area
const InputArea = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #eee;
  background-color: #fff;
`;

const QuickReplies = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 4px;
  }
`;

const Chip = styled.button`
  background: white;
  border: 1px solid #0b4da2;
  color: #0b4da2;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #eef6ff;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0b4da2;
  }
`;

const ActionBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${(props) =>
    props.mode === "speak"
      ? `
    background-color: #f1f3f5;
    color: #444;
    &:hover { background-color: #e9ecef; }
  `
      : `
    background-color: #0b4da2;
    color: white;
    &:hover { background-color: #093c80; }
  `}
`;

function InterviewAssistantPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  const messages = [
    {
      id: 1,
      type: "caption",
      sender: "실시간 자막",
      text: "좋습니다. 그러면 이전 프로젝트에서 웹 접근성을 어떻게 개선했는지 구체적인 예시를 들어 설명해주시겠어요?",
      time: "14:02",
    },
    {
      id: 2,
      type: "user",
      sender: "나",
      text: "네, 저는 스크린 리더 사용자를 위해 이미지에 대체 텍스트(alt)를 꼼꼼히 작성하고, 키보드만으로도 모든 메뉴를 탐색할 수 있도록 탭 순서를 최적화했습니다.",
      time: "14:03",
    },
    {
      id: 3,
      type: "interviewer",
      sender: "면접관",
      text: "네, 잘 알겠습니다. 구체적인 사례가 인상 깊네요. 다음 질문으로 넘어가겠습니다.",
      time: "14:04",
    },
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <Global styles={GlobalStyle} />

      {/* Header */}
      <HeaderWrapper>
        <HeaderContent>
          <Logo onClick={() => navigate("/")}>
            <Accessibility size={28} />
            배리어 프리
          </Logo>
          <HeaderButtonGroup>
            <HeaderBtn primary onClick={() => navigate("/user/mypage")}>
              <UserRound size={16} /> 마이페이지
            </HeaderBtn>
            <HeaderBtn onClick={() => navigate("/")}>
              <LogOut size={16} /> 로그아웃
            </HeaderBtn>
          </HeaderButtonGroup>
        </HeaderContent>
      </HeaderWrapper>

      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>면접 도우미</HeroTitle>
        <HeroSubtitle>
          실시간 음성 인식과 TTS로 면접을 도와드립니다
        </HeroSubtitle>
      </HeroSection>

      {/* Main Content Area */}
      <Content>
        <ChatCard>
          {/* Status Bar */}
          <StatusBar>
            <StatusBadge>
              <Mic size={16} fill="currentColor" /> 듣고 있음...
            </StatusBadge>
            <WaveIcon size={24} />
            <WaveIcon size={24} style={{ opacity: 0.6 }} />
            <WaveIcon size={24} style={{ opacity: 0.3 }} />
          </StatusBar>

          {/* Chat Messages */}
          <ChatArea>
            {messages.map((msg) => (
              <MessageGroup key={msg.id} isUser={msg.type === "user"}>
                {msg.type !== "user" && (
                  <Label>
                    {msg.type === "caption" ? (
                      <MessageSquare size={14} />
                    ) : (
                      <UserRound size={14} />
                    )}
                    {msg.sender}
                  </Label>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.type === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Bubble isUser={msg.type === "user"}>{msg.text}</Bubble>
                  <TimeStamp>{msg.time}</TimeStamp>
                </div>
              </MessageGroup>
            ))}
            <div ref={chatEndRef} />
          </ChatArea>

          {/* Input Area */}
          <InputArea>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <span
                style={{ fontSize: "0.8rem", color: "#888", fontWeight: 600 }}
              >
                빠른 답변
              </span>
              <QuickReplies>
                {[
                  "네",
                  "아니요",
                  "감사합니다",
                  "잠시만 기다려주세요",
                  "다시 말씀해 주세요",
                ].map((text) => (
                  <Chip key={text} onClick={() => setInputValue(text)}>
                    {text}
                  </Chip>
                ))}
              </QuickReplies>
            </div>

            <InputWrapper>
              <ActionBtn mode="speak" title="음성 입력">
                <Volume2 size={20} />
              </ActionBtn>
              <TextInput
                placeholder="답변을 입력하세요..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <ActionBtn mode="send" title="전송">
                <Send size={20} />
              </ActionBtn>
            </InputWrapper>
          </InputArea>
        </ChatCard>
      </Content>
    </Container>
  );
}

export default InterviewAssistantPage;
