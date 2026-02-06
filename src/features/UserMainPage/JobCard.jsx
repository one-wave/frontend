import styled from "@emotion/styled";
import { Building2, Clock, MapPin } from "lucide-react";

const Card = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CompanyInfo = styled.div`
  display: flex;
  gap: 12px;
`;

const CompanyIcon = styled.div`
  width: 44px;
  height: 44px;
  background: #f0f7ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0b4da2;
`;

const CompanyNameText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
`;

const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #222;
  line-height: 1.4;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const TagSpan = styled.span`
  background-color: ${(props) => props.bg || "#f1f8ff"};
  color: ${(props) => props.color || "#0b4da2"};
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
`;

const Deadline = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.urgent ? "#e03e3e" : "#666")};
  background: ${(props) => (props.urgent ? "#fff0f0" : "transparent")};
  padding: ${(props) => (props.urgent ? "4px 8px" : "0")};
  border-radius: 4px;
`;

const ApplyButton = styled.button`
  background-color: #00796b;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: #006054;
  }
  &::after {
    content: "›";
    font-size: 1.2rem;
    line-height: 0.8;
  }
`;

const getTagStyle = (tag) => {
  if (tag.includes("재택") || tag.includes("신입"))
    return { bg: "#e6f9ed", color: "#00a84e" };
  if (tag.includes("탄력") || tag.includes("경력"))
    return { bg: "#f3eafa", color: "#7a3db8" };
  return { bg: "#eef6ff", color: "#0b4da2" };
};

function JobCard({ item, onClick }) {
  // 급여 표시
  const salaryDisplay = `${item.salaryType} ${(item.salary / 10000).toLocaleString()}만원`;

  // 마감일 계산
  let deadline = "마감";
  let urgent = false;
  if (item.offerEndDt) {
    const dateStr = String(item.offerEndDt);
    const endDate = new Date(
      dateStr.substring(0, 4),
      parseInt(dateStr.substring(4, 6)) - 1,
      dateStr.substring(6, 8)
    );
    const today = new Date();
    const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    deadline = diffDays > 0 ? `D-${diffDays}` : "마감";
    urgent = diffDays <= 3 && diffDays > 0;
  }

  // 태그 생성 - 원본 필드명과 함께 저장
  const tagData = [
    { label: item.empType, field: 'empType' },
    { label: item.reqEduc, field: 'reqEduc' },
    { label: item.reqCareer, field: 'reqCareer' }
  ].filter(t => t.label);

  return (
    <Card onClick={onClick}>
      <div>
        <CardHeader>
          <CompanyInfo>
            <CompanyIcon>
              <Building2 size={24} />
            </CompanyIcon>
            <div>
              <CompanyNameText>{item.companyName}</CompanyNameText>
              <CardTitle>{item.jobNm}</CardTitle>
            </div>
          </CompanyInfo>
        </CardHeader>

        {item.jobLocation && (
          <div
            style={{
              fontSize: "0.85rem",
              color: "#888",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <MapPin size={14} /> {item.jobLocation}
          </div>
        )}

        <div
          style={{
            fontSize: "0.9rem",
            color: "#00796b",
            fontWeight: "600",
            marginBottom: "12px",
          }}
        >
          {salaryDisplay}
        </div>

        <TagsWrapper>
          {tagData.map((tag) => {
            const style = getTagStyle(tag.label);
            return (
              <TagSpan key={`${tag.field}-${tag.label}`} bg={style.bg} color={style.color}>
                #{tag.label}
              </TagSpan>
            );
          })}
        </TagsWrapper>
      </div>

      <CardFooter>
        <Deadline urgent={urgent}>
          <Clock size={16} /> {deadline}
        </Deadline>
        <ApplyButton>지원하기</ApplyButton>
      </CardFooter>
    </Card>
  );
}

export default JobCard;
