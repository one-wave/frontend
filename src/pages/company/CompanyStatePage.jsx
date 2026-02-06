import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, Award, Building2, Handshake, Shield, MapPin, Users, X, Briefcase } from "lucide-react";
import CompanyLayout from "../../shared/CompanyHeader";
import { getCompanyApiBaseUrl } from "../../api/Http";
import { SkeletonBox } from "../../components/Skeleton";

const StateBody = styled.div`
  padding: 40px;
  overflow-y: auto;
  max-width: 1600px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const BenefitCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 28px;
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;

  &:nth-of-type(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    box-shadow: 0 8px 24px rgba(245, 87, 108, 0.3);
  }

  &:nth-of-type(3) {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    box-shadow: 0 8px 24px rgba(79, 172, 254, 0.3);
  }

  &:nth-of-type(4) {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    box-shadow: 0 8px 24px rgba(67, 233, 123, 0.3);
  }

  &:nth-of-type(5) {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    box-shadow: 0 8px 24px rgba(250, 112, 154, 0.3);
  }

  &:nth-of-type(6) {
    background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
    box-shadow: 0 8px 24px rgba(48, 207, 208, 0.3);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }
`;

const BenefitIcon = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
`;

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const BenefitDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.95;
  margin-bottom: 16px;
`;

const BenefitAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  backdrop-filter: blur(10px);
`;

const MapContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const MapSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const KoreaMapSVG = styled.svg`
  width: 100%;
  max-width: 900px;
  height: 750px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  background: #e6f2f7;
  border-radius: 12px;
  padding: 20px;
  
  @media (max-width: 768px) {
    height: 600px;
  }
`;

const RegionPath = styled.path`
  fill: ${props => {
    const count = props.count || 0;
    if (count === 0) return '#ffffff';
    if (count < 5) return '#e3f2fd';
    if (count < 10) return '#bbdefb';
    if (count < 20) return '#90caf9';
    if (count < 30) return '#64b5f6';
    return '#42a5f5';
  }};
  stroke: #1a1a1a;
  stroke-width: 1.5;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.isSelected ? 1 : 0.9};

  &:hover {
    fill: ${props => {
      const count = props.count || 0;
      if (count === 0) return '#f5f5f5';
      if (count < 5) return '#d1e9ff';
      if (count < 10) return '#a8d5ff';
      if (count < 20) return '#7fc1ff';
      if (count < 30) return '#56adff';
      return '#2d9aff';
    }};
    stroke-width: 2.5;
    stroke: #1976d2;
    opacity: 1;
    filter: drop-shadow(0 2px 8px rgba(25, 118, 210, 0.3));
  }
`;

const RegionText = styled.text`
  font-size: 14px;
  font-weight: 700;
  fill: #1a1a1a;
  pointer-events: none;
  text-anchor: middle;
  opacity: ${props => props.isSelected ? 1 : 0.8};
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const InfoPanel = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-height: 500px;
  min-width: 0;
  
  @media (max-width: 1200px) {
    width: 100%;
    min-height: 400px;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    min-height: 300px;
  }
`;

const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: #f7fafc;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #edf2f7;
    transform: rotate(90deg);
  }
`;

const RegionStats = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  flex: 1;
  min-width: 150px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const DistrictList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f7fafc;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
    
    &:hover {
      background: #a0aec0;
    }
  }
`;

const DistrictItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
  }
`;

const DistrictName = styled.span`
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
`;

const CountBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const JobList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f7fafc;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
    
    &:hover {
      background: #a0aec0;
    }
  }
`;

const JobItem = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
`;

const JobLocationText = styled.span`
  color: #4a5568;
  line-height: 1.5;
`;

const JobType = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  flex-wrap: wrap;
`;

const LegendTitle = styled.span`
  font-weight: 700;
  color: #2d3748;
  font-size: 0.9rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => props.color};
  border: 1px solid #e2e8f0;
`;

const LegendText = styled.span`
  font-size: 0.85rem;
  color: #4a5568;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #718096;
  font-size: 1rem;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  color: #e53e3e;
  font-size: 1rem;
`;

// 대한민국 지도 SVG 경로 데이터
const koreaMapPaths = {
  '서울특별시': 'M 420 280 L 440 275 L 455 285 L 460 305 L 455 325 L 440 335 L 420 330 L 410 310 Z',
  '인천광역시': 'M 380 270 L 400 265 L 410 275 L 412 290 L 405 300 L 390 298 L 380 285 Z',
  '경기도': 'M 320 240 L 500 230 L 540 250 L 530 420 L 490 480 L 420 470 L 300 460 L 260 400 L 280 320 Z',
  '강원도': 'M 540 180 L 680 175 L 720 220 L 710 420 L 650 480 L 540 470 L 480 380 L 520 280 Z',
  '충청북도': 'M 440 460 L 540 450 L 580 470 L 570 580 L 540 610 L 440 600 L 400 570 Z',
  '충청남도': 'M 320 580 L 480 570 L 520 590 L 510 690 L 480 730 L 360 720 L 300 680 Z',
  '대전광역시': 'M 480 550 L 500 545 L 515 560 L 510 575 L 495 580 L 480 565 Z',
  '세종특별자치시': 'M 460 570 L 480 565 L 490 580 L 485 595 L 470 600 L 460 585 Z',
  '전라북도': 'M 400 720 L 540 710 L 580 730 L 570 840 L 540 860 L 420 850 L 380 810 Z',
  '전라남도': 'M 300 840 L 480 830 L 520 850 L 510 1020 L 480 1050 L 340 1040 L 280 980 Z',
  '광주광역시': 'M 400 860 L 420 855 L 430 870 L 425 885 L 410 890 L 400 875 Z',
  '경상북도': 'M 580 600 L 720 590 L 760 610 L 750 840 L 720 860 L 600 850 L 560 780 Z',
  '경상남도': 'M 580 860 L 720 850 L 760 870 L 750 1020 L 720 1050 L 600 1040 L 560 960 Z',
  '부산광역시': 'M 720 1020 L 740 1015 L 750 1030 L 745 1045 L 730 1050 L 720 1035 Z',
  '대구광역시': 'M 640 780 L 660 775 L 670 790 L 665 805 L 650 810 L 640 795 Z',
  '울산광역시': 'M 740 960 L 760 955 L 770 970 L 765 985 L 750 990 L 740 975 Z',
  '제주특별자치도': 'M 480 1080 L 520 1075 L 530 1090 L 525 1105 L 510 1110 L 480 1100 Z',
};

// 각 지역의 텍스트 위치
const regionTextPositions = {
  '서울특별시': { x: 435, y: 305 },
  '인천광역시': { x: 395, y: 285 },
  '경기도': { x: 410, y: 350 },
  '강원도': { x: 620, y: 330 },
  '충청북도': { x: 510, y: 525 },
  '충청남도': { x: 400, y: 635 },
  '대전광역시': { x: 497, y: 565 },
  '세종특별자치시': { x: 475, y: 585 },
  '전라북도': { x: 490, y: 780 },
  '전라남도': { x: 390, y: 930 },
  '광주광역시': { x: 415, y: 870 },
  '경상북도': { x: 670, y: 720 },
  '경상남도': { x: 670, y: 940 },
  '부산광역시': { x: 735, y: 1030 },
  '대구광역시': { x: 655, y: 795 },
  '울산광역시': { x: 755, y: 970 },
  '제주특별자치도': { x: 505, y: 1095 },
};

function CompanyStatePage() {
  const [regionData, setRegionData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const token = localStorage.getItem("companyToken");
        const apiBaseUrl = getCompanyApiBaseUrl();
        const res = await fetch(`${apiBaseUrl}/api/enterprise/company/region`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        if (!res.ok) {
          throw new Error("지역 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        setRegionData(data.data || []);
      } catch (err) {
        console.error(err);
        setError("지역 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, []);

  // 공고 데이터 가져오기
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setJobsLoading(true);
        const token = localStorage.getItem("companyToken");
        const apiBaseUrl = getCompanyApiBaseUrl();
        const res = await fetch(`${apiBaseUrl}/api/enterprise/company/job`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

        if (!res.ok) {
          throw new Error("공고 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        setJobData(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobData();
  }, []);

  // 지역별로 그룹화
  const groupedByCity = regionData.reduce((acc, item) => {
    const city = item.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push({
      district: item.district,
      count: parseInt(item.count) || 0,
    });
    return acc;
  }, {});

  // 지역별 총 공고 수 계산
  const getCityTotal = (city) => {
    return groupedByCity[city]?.reduce((sum, item) => sum + item.count, 0) || 0;
  };

  // 선택된 지역의 구/군 목록
  const selectedDistricts = selectedRegion ? groupedByCity[selectedRegion] || [] : [];

  // 선택된 지역의 공고 필터링
  const getFilteredJobs = (city) => {
    if (!city || !jobData.length) return [];
    
    // 도시명 매핑 (API 데이터의 job_location 형식에 맞춤)
    const cityMapping = {
      '서울특별시': ['서울특별시', '서울'],
      '인천광역시': ['인천광역시', '인천'],
      '경기도': ['경기도', '경기'],
      '강원도': ['강원도', '강원특별자치도', '강원'],
      '충청북도': ['충청북도', '충북'],
      '충청남도': ['충청남도', '충남'],
      '대전광역시': ['대전광역시', '대전'],
      '세종특별자치시': ['세종특별자치시', '세종'],
      '전라북도': ['전라북도', '전북특별자치도', '전북'],
      '전라남도': ['전라남도', '전남'],
      '광주광역시': ['광주광역시', '광주'],
      '경상북도': ['경상북도', '경북'],
      '경상남도': ['경상남도', '경남'],
      '부산광역시': ['부산광역시', '부산'],
      '대구광역시': ['대구광역시', '대구'],
      '울산광역시': ['울산광역시', '울산'],
      '제주특별자치도': ['제주특별자치도', '제주도', '제주'],
    };

    const searchKeywords = cityMapping[city] || [city.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('특별자치도', '').replace('도', '')];
    
    return jobData.filter(job => {
      if (!job.job_location) return false;
      return searchKeywords.some(keyword => job.job_location.includes(keyword));
    });
  };

  const filteredJobs = selectedRegion ? getFilteredJobs(selectedRegion) : [];

  const handleRegionClick = (city) => {
    setSelectedRegion(selectedRegion === city ? null : city);
  };

  return (
    <CompanyLayout
      headerTitle="장애인 고용 혜택"
      headerSubtitle="장애인 고용 시 기업이 받을 수 있는 다양한 혜택과 지원 정보를 확인하세요."
    >
      <StateBody>
        {/* 장애인 고용 혜택 섹션 */}
        <Section>
          <SectionTitle>
            <TrendingUp size={32} color="#667eea" />
            장애인 고용 시 기업 혜택
          </SectionTitle>
          <BenefitsGrid>
            <BenefitCard>
              <BenefitIcon>
                <DollarSign size={32} />
              </BenefitIcon>
              <BenefitTitle>장애인 고용 장려금</BenefitTitle>
              <BenefitDescription>
                장애인을 고용한 기업에 지급되는 고용 장려금으로, 중증장애인 고용 시 더 높은 금액을 지원받을 수 있습니다.
              </BenefitDescription>
              <BenefitAmount>월 최대 150만원</BenefitAmount>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>
                <Shield size={32} />
              </BenefitIcon>
              <BenefitTitle>장애인 고용 부담금 감면</BenefitTitle>
              <BenefitDescription>
                의무고용률을 초과하여 장애인을 고용한 경우, 부담금이 감면되거나 면제됩니다.
              </BenefitDescription>
              <BenefitAmount>최대 100% 감면</BenefitAmount>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>
                <Building2 size={32} />
              </BenefitIcon>
              <BenefitTitle>시설 개선 지원</BenefitTitle>
              <BenefitDescription>
                장애인 근로자를 위한 작업장 시설 개선 비용을 지원받을 수 있습니다. 화장실, 출입구, 작업대 등 다양한 시설 개선이 가능합니다.
              </BenefitDescription>
              <BenefitAmount>최대 5,000만원</BenefitAmount>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>
                <Award size={32} />
              </BenefitIcon>
              <BenefitTitle>세제 혜택</BenefitTitle>
              <BenefitDescription>
                장애인 고용 기업에 대한 소득세 및 법인세 감면 혜택을 받을 수 있습니다. 고용 인원에 따라 차등 적용됩니다.
              </BenefitDescription>
              <BenefitAmount>법인세 최대 50% 감면</BenefitAmount>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>
                <Handshake size={32} />
              </BenefitIcon>
              <BenefitTitle>정부 계약 우대</BenefitTitle>
              <BenefitDescription>
                장애인 고용 실적이 우수한 기업은 정부 조달 계약 시 가점을 받거나 우선 낙찰 기회를 제공받습니다.
              </BenefitDescription>
              <BenefitAmount>가점 5% 추가</BenefitAmount>
            </BenefitCard>

            <BenefitCard>
              <BenefitIcon>
                <Users size={32} />
              </BenefitIcon>
              <BenefitTitle>사회적 기업 인증</BenefitTitle>
              <BenefitDescription>
                장애인 고용 비율이 높은 기업은 사회적 기업으로 인증받을 수 있으며, 각종 세제 혜택과 금융 지원을 받을 수 있습니다.
              </BenefitDescription>
              <BenefitAmount>다양한 지원 혜택</BenefitAmount>
            </BenefitCard>
          </BenefitsGrid>
        </Section>

        {/* 지역별 공고 현황 지도 */}
        <Section>
          <SectionTitle>
            <MapPin size={32} color="#667eea" />
            지역별 채용 공고 현황
          </SectionTitle>
          <MapContainer>
            {loading && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "750px" }}>
                <SkeletonBox width="900px" height="750px" style={{ borderRadius: "12px" }} />
              </div>
            )}
            {error && <ErrorText>{error}</ErrorText>}
            
            {!loading && !error && (
              <MapWrapper>
                <MapSection>
                  <KoreaMapSVG viewBox="150 100 700 900" preserveAspectRatio="xMidYMid meet">
                    {/* 다른 지역들을 먼저 렌더링 */}
                    {Object.keys(koreaMapPaths)
                      .filter(city => city !== '서울특별시' && city !== '인천광역시')
                      .map((city) => {
                        const count = getCityTotal(city);
                        const isSelected = selectedRegion === city;
                        const isHovered = hoveredRegion === city;
                        const textPos = regionTextPositions[city];
                        
                        return (
                          <g key={city}>
                            <RegionPath
                              d={koreaMapPaths[city]}
                              count={count}
                              isSelected={isSelected}
                              onClick={() => handleRegionClick(city)}
                              onMouseEnter={() => setHoveredRegion(city)}
                              onMouseLeave={() => setHoveredRegion(null)}
                            />
                            {textPos && (
                              <RegionText
                                x={textPos.x}
                                y={textPos.y}
                                isSelected={isSelected}
                              >
                                {city.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('특별자치도', '').replace('도', '')}
                              </RegionText>
                            )}
                          </g>
                        );
                      })}
                    {/* 서울과 인천을 마지막에 렌더링 (앞에 표시) */}
                    {['서울특별시', '인천광역시'].map((city) => {
                      const count = getCityTotal(city);
                      const isSelected = selectedRegion === city;
                      const isHovered = hoveredRegion === city;
                      const textPos = regionTextPositions[city];
                      
                      return (
                        <g key={city}>
                          <RegionPath
                            d={koreaMapPaths[city]}
                            count={count}
                            isSelected={isSelected}
                            onClick={() => handleRegionClick(city)}
                            onMouseEnter={() => setHoveredRegion(city)}
                            onMouseLeave={() => setHoveredRegion(null)}
                          />
                          {textPos && (
                            <RegionText
                              x={textPos.x}
                              y={textPos.y}
                              isSelected={isSelected}
                            >
                              {city.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('특별자치도', '').replace('도', '')}
                            </RegionText>
                          )}
                        </g>
                      );
                    })}
                  </KoreaMapSVG>
                  
                  <Legend>
                    <LegendTitle>공고 수 범례:</LegendTitle>
                    <LegendItem>
                      <LegendColor color="#ffffff" />
                      <LegendText>0개</LegendText>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="#e3f2fd" />
                      <LegendText>1-4개</LegendText>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="#bbdefb" />
                      <LegendText>5-9개</LegendText>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="#90caf9" />
                      <LegendText>10-19개</LegendText>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="#64b5f6" />
                      <LegendText>20-29개</LegendText>
                    </LegendItem>
                    <LegendItem>
                      <LegendColor color="#42a5f5" />
                      <LegendText>30개 이상</LegendText>
                    </LegendItem>
                  </Legend>
                </MapSection>

                <InfoPanel>
                  {selectedRegion ? (
                    <>
                      <InfoHeader>
                        <InfoTitle>
                          <MapPin size={24} />
                          {selectedRegion}
                        </InfoTitle>
                        <CloseButton onClick={() => setSelectedRegion(null)}>
                          <X size={20} />
                        </CloseButton>
                      </InfoHeader>
                      
                      <RegionStats>
                        <StatCard>
                          <StatLabel>총 공고 수</StatLabel>
                          <StatValue>{filteredJobs.length}</StatValue>
                        </StatCard>
                        <StatCard style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                          <StatLabel>구/군 수</StatLabel>
                          <StatValue>{selectedDistricts.length}</StatValue>
                        </StatCard>
                      </RegionStats>

                      {jobsLoading ? (
                        <div>
                          {[...Array(3)].map((_, idx) => (
                            <div key={idx} style={{ padding: "16px", border: "1px solid #edf2f7", borderRadius: "8px", marginBottom: "12px" }}>
                              <SkeletonBox width="80%" height="18px" marginBottom="8px" />
                              <SkeletonBox width="60%" height="16px" />
                            </div>
                          ))}
                        </div>
                      ) : filteredJobs.length > 0 ? (
                        <JobList>
                          {filteredJobs.map((job, idx) => (
                            <JobItem key={job.job_post_id || idx}>
                              <JobLocation>
                                <MapPin size={18} color="#667eea" />
                                <JobLocationText>{job.job_location || '위치 정보 없음'}</JobLocationText>
                              </JobLocation>
                              <JobType>
                                <Briefcase size={14} />
                                {job.job_nm || '고용 형태 정보 없음'}
                              </JobType>
                            </JobItem>
                          ))}
                        </JobList>
                      ) : (
                        <EmptyState>
                          <EmptyIcon>📍</EmptyIcon>
                          <EmptyText>해당 지역의 공고가 없습니다.</EmptyText>
                          <EmptySubtext>지도를 클릭하여 다른 지역을 선택해보세요.</EmptySubtext>
                        </EmptyState>
                      )}
                    </>
                  ) : (
                    <EmptyState>
                      <EmptyIcon>🗺️</EmptyIcon>
                      <EmptyText>지도를 클릭하여 지역을 선택하세요</EmptyText>
                      <EmptySubtext>각 지역의 구/군별 공고 현황을 확인할 수 있습니다.</EmptySubtext>
                    </EmptyState>
                  )}
                </InfoPanel>
              </MapWrapper>
            )}
          </MapContainer>
        </Section>
      </StateBody>
    </CompanyLayout>
  );
}

export default CompanyStatePage;
