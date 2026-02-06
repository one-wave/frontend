import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 0px,
    #f8f8f8 40px,
    #f0f0f0 80px
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

// 직사각형 스켈레톤
export const SkeletonBox = styled(SkeletonBase)`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  margin-bottom: ${(props) => props.marginBottom || "8px"};
`;

// 원형 스켈레톤
export const SkeletonCircle = styled(SkeletonBase)`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  border-radius: 50%;
  flex-shrink: 0;
`;

// 채용공고 카드 스켈레톤
export const JobCardSkeleton = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* 내부 요소들에 스켈레톤 애니메이션 적용 */
  & > * {
    background: linear-gradient(
      90deg,
      #f0f0f0 0px,
      #f8f8f8 40px,
      #f0f0f0 80px
    );
    background-size: 1000px 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;

// 프로필 카드 스켈레톤
export const ProfileCardSkeleton = styled.div`
  background: white;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 리스트 아이템 스켈레톤
export const ListItemSkeleton = styled.div`
  padding: 20px 32px;
  border-bottom: 1px solid #edf2f7;
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1.5fr;
  gap: 16px;
  align-items: center;
`;

// 그리드 스켈레톤
export const GridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
