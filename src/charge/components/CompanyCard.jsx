import { useState } from 'react';
import { Box, Button, SimpleGrid, Tag, IconButton, Divider, Heading } from '@chakra-ui/react';
import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';

const CompanyCard = ({ onClose }) => {
  const tags = ['건물자체관리', '골드에너지', '광주시', '광주테크노파크', '군포시', '그리드엠', '기아자동차', '김해시', '나이스차저', '나주시', '남부솔루션', '넥씽', '농협경제지주', '뉴텍솔루션', '대구에너지공사', '대구환경공단', '대선', '대유플러스', '동양이엔피', '두루스코이브이', '딜라이브', '레드이엔지', '롯데건설', '롯데정보통신', '매니지온', '매니지온 이볼트', '모던텍', '미래SD', '보스시큐리티', '보타리에너지', '볼타', '부안군', '브라이트에너지파트너스', '블루네트웍스', '비케이에너지', '삼척시', '서울시', '서울에너지공사', '서울이브이', '선광시스템', '성민기업', '세종시', '소프트베리', '수원시', '순천시', '순천시 체육시설관리소', '스칼라데이터', '스타코프', '스파로스EV', '스포컴', '시그넷', '씨어스', '씨에스테크놀로지', '아마노코리아', '아우토크립트', '아이마켓코리아', '아이온커뮤니케이션즈', '아이파킹EV', '아하', '에너넷', '에바', '에버온', '에스이피', '엔라이튼', '울릉군청', '울산시', '유니이브이', '이노케이텍', '이마트', '이브이네스트', '이브이런', '이브이루씨', '이브이시스', '이브이씨원', '이브이파킹서비스', '이브이파트너스', '이씨티', '이앤에이치에너지', '이엔', '이엘일렉트릭', '이지차저', '이카플러그', '익산시', '인천공항공사', '인천국제공항', '인큐버스', '전주시', '정읍시', '제네시스', '제주도청', '제주에너지공사', '제주테크노파크', '차밥스', '차지비', '차지인', '채비', '채움모빌리티', '카카오모빌리티', '캐스트프로', '코콤', '쿨사인', '크로커스', '클린일렉스', '타디스테크놀로지', '태성콘텍', '테슬라', '투루차저', '투이스이브이씨', '티비유', '파워큐브', '펌프킨', '푸른에너지', '플러그링크', '피라인모터스', '피엔이시스템즈', '하이차저', '한국EV충전서비스센터', '한국전기차솔루션', '한국전력', '한국컴퓨터', '한국홈충전기렌탈', '한국환경공단', '한마음장애인복지회', '한진', '한화모티브', '해피차저', '해피차지', '현대엔지니어링', '현대오일뱅크', '현대자동차', '환경부', 'BMW', 'CJ대한통운', 'E1', 'evmost', 'GS칼텍스', 'KEVIT', 'KH에너지', 'KT', 'L3일렉트릭파워', 'LG유플러스 볼트업', 'LG유플러스 헬로플러그인', 'LS e-link', 'SG생활안전', 'SH에너지', 'SK에너지', 'SK일렉링크'];
  const [selectedTags, setSelectedTags] = useState([]);

  // 태그 클릭 시 선택/해제 처리 함수
  const handleTagClick = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedTags([]);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      width="400px"
      margin="auto"
      bg="white"
    >
      {/* Header with title and close icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Heading as="h3" size="md">
          사업자
        </Heading>
        <IconButton
          icon={<CloseIcon />}
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={onClose}
        />
      </Box>
      <Divider />

      {/* Tags Grid with scrollable container */}
      <Box maxHeight="200px" overflowY="auto">
        <SimpleGrid columns={3} spacing={2} mb={4} mt={4}>
          {tags.map((tag) => (
            <Tag
              key={tag}
              size="lg"
              variant="solid"
              bg={selectedTags.includes(tag) ? 'teal.500' : 'gray.100'}
              color={selectedTags.includes(tag) ? 'white' : 'black'}
              textAlign="center"
              justifyContent="center"
              p={2}
              cursor="pointer"
              onClick={() => handleTagClick(tag)} // 클릭 시 태그 선택/해제
            >
              {tag}
            </Tag>
          ))}
        </SimpleGrid>
      </Box>
      <Divider />

      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={handleReset} // 초기화 버튼 클릭 시 초기화 처리
          leftIcon={<RepeatIcon />}
          mr={2}
        >
        </Button>
        <Button colorScheme="blue">
          적용
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyCard;
