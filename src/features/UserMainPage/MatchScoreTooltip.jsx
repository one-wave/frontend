import styled from "@emotion/styled";
import { useState } from "react";
import { HelpCircle } from "lucide-react";

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
`;

const Trigger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  padding: 2px;
  transition: color 0.2s;

  &:hover {
    color: #0b4da2;
  }
`;

const Panel = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: -12px;
  width: 300px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.14);
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 14px;
    width: 10px;
    height: 10px;
    background: white;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    transform: rotate(45deg);
  }
`;

const Title = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px solid #f2f2f2;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 0.84rem;
  color: #555;
`;

const Sub = styled.span`
  font-size: 0.75rem;
  color: #999;
  margin-left: 4px;
`;

const Value = styled.span`
  font-size: 0.84rem;
  font-weight: 600;
  color: #0b4da2;
  white-space: nowrap;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  margin-top: 6px;
  border-top: 2px solid #0b4da2;
  font-weight: 700;
  font-size: 0.9rem;
  color: #0b4da2;
`;

const Note = styled.p`
  font-size: 0.73rem;
  color: #aaa;
  margin-top: 14px;
  line-height: 1.6;
`;

const CRITERIA = [
  { label: "신체환경 적합도", sub: "6항목 × 3점", max: 18 },
  { label: "급여 매력도", sub: "상대 순위", max: 25 },
  { label: "고용 안정성", sub: "상용·계약·시간제", max: 12 },
  { label: "학력·경력 적합도", sub: "초과 충족 가점", max: 15 },
  { label: "선호도 일치", sub: "지역·급여·고용", max: 15 },
  { label: "공고 신선도", sub: "최근 등록 가점", max: 15 },
];

function MatchScoreTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Trigger aria-label="scoring info">
        <HelpCircle size={18} />
      </Trigger>
      {open && (
        <Panel>
          <Title>매칭 점수 산정 기준</Title>
          {CRITERIA.map((c) => (
            <Row key={c.label}>
              <Label>
                {c.label}
                {c.sub && <Sub>{c.sub}</Sub>}
              </Label>
              <Value>최대 {c.max}점</Value>
            </Row>
          ))}
          <Total>
            <span>총점</span>
            <span>최대 100점</span>
          </Total>
          <Note>
            신체환경 미달 공고는 검색 결과에서 자동 제외됩니다.
            <br />
            대표이력서 미등록 시 학력·경력은 기본 중간값으로 산정됩니다.
          </Note>
        </Panel>
      )}
    </Wrapper>
  );
}

export default MatchScoreTooltip;
