import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Handshake } from "lucide-react";

const Banner = styled.div`
  background: linear-gradient(135deg, #0b4da2 0%, #1565c0 50%, #1a73e8 100%);
  border-radius: 14px;
  padding: 24px 28px;
  margin-bottom: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(11, 77, 162, 0.25);
  }
`;

const TextGroup = styled.div`
  color: white;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Desc = styled.div`
  font-size: 13px;
  opacity: 0.85;
  line-height: 1.5;
`;

const Arrow = styled.div`
  color: white;
  opacity: 0.8;
  flex-shrink: 0;
`;

function WorkAssistantBanner() {
  const navigate = useNavigate();

  return (
    <Banner onClick={() => navigate("/user/work-assistants")}>
      <TextGroup>
        <Title>
          <Handshake size={20} />
          근로지원인 서비스를 알고 계신가요?
        </Title>
        <Desc>
          중증장애인 근로자를 위한 근로지원인 수행기관을 찾아보세요
        </Desc>
      </TextGroup>
      <Arrow>
        <ArrowRight size={22} />
      </Arrow>
    </Banner>
  );
}

export default WorkAssistantBanner;
