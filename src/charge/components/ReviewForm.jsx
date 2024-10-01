// src/charge/components/ReviewForm.jsx

import React, { useState } from 'react';
import { Box, Button, Textarea, useToast } from '@chakra-ui/react';
import axiosInstance from '@/api/axiosInstance.js';
import StarRating from './StarRating'; // 같은 폴더에 있으므로 './StarRating' 사용

const ReviewForm = ({ statId, onReviewSubmit }) => {
  // 상태 선언
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const toast = useToast();

  console.log('ReviewForm - Received statId:', statId);

  const handleSubmit = async () => {
    try {
      const reviewData = {
        rating,
        comment,
        statId,
      };

      console.log('Submitting review:', reviewData);

      const response = await axiosInstance.post('/api/reviews', reviewData);

      if (onReviewSubmit) {
        const newReview = response.data;
        onReviewSubmit(newReview);
      }

      // 입력 필드 초기화
      setRating(0);
      setComment('');
      toast({
        title: '리뷰 제출 성공',
        description: '리뷰가 성공적으로 제출되었습니다.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('리뷰 제출 중 오류 발생:', error);
      toast({
        title: '리뷰 제출 실패',
        description: '리뷰 제출 중 오류가 발생했습니다.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
      <Box>
        {/* 평점 입력 컴포넌트 */}
        <StarRating rating={rating} setRating={setRating} />

        {/* 댓글 입력 */}
        <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="리뷰를 작성하세요."
            mb={4}
        />

        <Button onClick={handleSubmit} colorScheme="blue">
          리뷰 제출
        </Button>
      </Box>
  );
};

export default ReviewForm;
