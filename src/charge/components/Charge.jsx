import { useState } from "react";
import { Box, VStack, Textarea, Button, Heading, FormControl, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import axios from "axios"; // axios 라이브러리 사용

export default function ReviewCreate({ userId, statId }) {
  const [rating, setRating] = useState(0); // 별점 상태
  const [hover, setHover] = useState(null); // 마우스 호버 상태
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태
  const toast = useToast(); // 알림 기능 사용

  // 리뷰 제출 핸들러
  const handleSubmit = async () => {
    // 별점이나 리뷰 텍스트가 입력되지 않은 경우 알림
    if (rating === 0 || reviewText.trim() === "") {
      toast({
        title: "작성 오류",
        description: "별점과 리뷰를 모두 작성해 주세요.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // axios로 POST 요청 보내기
      const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/reviews`, // 서버의 API 엔드포인트
          {
            userId,    // 사용자 ID
            chgerId: statId,   // 충전소 ID
            rating,     // 별점
            comment: reviewText, // 리뷰 텍스트
          },
          {
            headers: {
              "Content-Type": "application/json",  // JSON 형식으로 전송
            },
          }
      );

      // 응답이 성공적인 경우 알림 표시
      if (response.status === 200) {
        toast({
          title: "제출 성공",
          description: "리뷰가 성공적으로 제출되었습니다.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // 폼 초기화
        setRating(0);
        setReviewText("");
      } else {
        throw new Error("리뷰 제출 실패");
      }
    } catch (error) {
      // 오류 발생 시 알림 표시
      toast({
        title: "제출 실패.",
        description: "리뷰 제출 중 오류가 발생했습니다. 다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // UI 렌더링
  return (
      <Box p={5} maxW="500px" mx="auto">
        <Heading as="h3" size="lg" mb={4}>
          리뷰 작성
        </Heading>
        <VStack spacing={4} align="start">
          {/* 별점 입력 */}
          <FormControl id="rating">
            <HStack spacing={"2px"}>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <Box
                        as="label"
                        key={index}
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setRating(ratingValue)}
                    >
                      <FaStar cursor="pointer" size={24} />
                    </Box>
                );
              })}
            </HStack>
          </FormControl>

          {/* 리뷰 텍스트 입력 */}
          <FormControl id="review">
            <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="리뷰 내용을 입력하세요"
                size="sm"
            />
          </FormControl>

          {/* 제출 버튼 */}
          <Button colorScheme="teal" onClick={handleSubmit}>
            작성
          </Button>
        </VStack>
      </Box>
  );
}
