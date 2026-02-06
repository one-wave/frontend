import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background-color: #1a1a2e;
  color: white;
`;

const Header = styled.header`
  background-color: #16213e;
  padding: 20px 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  color: #00d4ff;
  font-size: 24px;
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.danger ? '#ff6b6b' : '#2a2a3e'};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background-color: #16213e;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  height: ${props => props.tall ? '600px' : 'auto'};
  display: flex;
  flex-direction: column;
`;

const PanelTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #00d4ff;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubtitleArea = styled.div`
  flex: 1;
  background-color: #0a0e1a;
  border-radius: 12px;
  padding: 24px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 2px solid #2a2a3e;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #16213e;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 4px;
  }
`;

const SubtitleLine = styled.p`
  margin: 0 0 12px 0;
  padding: 12px;
  background-color: ${props => props.highlight ? '#1a2942' : 'transparent'};
  border-left: ${props => props.highlight ? '4px solid #00d4ff' : 'none'};
  color: ${props => props.highlight ? '#fff' : '#a0a0a0'};
  font-size: 16px;
  line-height: 1.6;
  transition: all 0.3s;
`;

const ControlButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.active ? 
    'linear-gradient(135deg, #00d4ff 0%, #0091ff 100%)' : 
    'linear-gradient(135deg, #2a2a3e 0%, #16213e 100%)'
  };
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  background-color: #0a0e1a;
  border-radius: 12px;
  padding: 24px;
  overflow-y: auto;
  margin-bottom: 20px;
  border: 2px solid #2a2a3e;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #16213e;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 4px;
  }
`;

const MessageBubble = styled.div`
  padding: 14px 18px;
  background: ${props => props.sent ? 
    'linear-gradient(135deg, #00d4ff 0%, #0091ff 100%)' : 
    '#2a2a3e'
  };
  color: white;
  border-radius: 16px;
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const InputArea = styled.div`
  display: flex;
  gap: 12px;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  background-color: #0a0e1a;
  border: 2px solid #2a2a3e;
  border-radius: 12px;
  color: white;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #00d4ff;
  }

  &::placeholder {
    color: #666;
  }
`;

const SendButton = styled.button`
  padding: 14px 24px;
  background: linear-gradient(135deg, #00d4ff 0%, #0091ff 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
  }
`;

const StatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.active ? '#00ff8840' : '#ff6b6b40'};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.active ? '#00ff88' : '#ff6b6b'};
  border-radius: 50%;
  animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

function InterviewAssistPage() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [subtitles, setSubtitles] = useState([
    { id: 1, text: "면접관: 안녕하세요, 자기소개 부탁드립니다.", time: "00:00" },
  ]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // STT 시작 시뮬레이션
      setTimeout(() => {
        const newSubtitle = {
          id: subtitles.length + 1,
          text: "지원자: 안녕하세요, 저는 웹 개발에 열정이 있는...",
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };
        setSubtitles([...subtitles, newSubtitle]);
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sent: true,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // TTS 시뮬레이션
      alert(`TTS로 출력: "${inputText}"`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <Header>
        <Logo onClick={() => navigate('/user/main')}>잡케어 면접 도우미</Logo>
        <HeaderButtons>
          <StatusIndicator active={isListening}>
            <StatusDot active={isListening} />
            {isListening ? '녹음 중' : '대기 중'}
          </StatusIndicator>
          <Button danger onClick={() => navigate('/user/main')}>종료</Button>
        </HeaderButtons>
      </Header>

      <Content>
        {/* 왼쪽: 실시간 자막 */}
        <Panel tall>
          <PanelTitle>
            🎤 실시간 자막 (STT)
          </PanelTitle>
          
          <SubtitleArea>
            {subtitles.map((subtitle, index) => (
              <SubtitleLine 
                key={subtitle.id} 
                highlight={index === subtitles.length - 1}
              >
                <strong>[{subtitle.time}]</strong> {subtitle.text}
              </SubtitleLine>
            ))}
          </SubtitleArea>

          <ControlButton 
            active={isListening}
            onClick={handleStartListening}
          >
            {isListening ? '⏸️ 일시정지' : '🎤 녹음 시작'}
          </ControlButton>
        </Panel>

        {/* 오른쪽: 텍스트→음성 */}
        <Panel tall>
          <PanelTitle>
            💬 텍스트 입력 (TTS)
          </PanelTitle>
          
          <ChatArea>
            {messages.length === 0 ? (
              <MessageBubble>
                💡 타이핑하여 음성으로 답변하세요
              </MessageBubble>
            ) : (
              messages.map(msg => (
                <MessageBubble key={msg.id} sent={msg.sent}>
                  {msg.text}
                </MessageBubble>
              ))
            )}
            <div ref={chatEndRef} />
          </ChatArea>

          <InputArea>
            <TextInput 
              placeholder="음성으로 전달할 내용을 입력하세요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSendMessage}>
              🔊 전송
            </SendButton>
          </InputArea>
        </Panel>
      </Content>
    </Container>
  );
}

export default InterviewAssistPage;
