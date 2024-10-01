// src/charge/components/ReviewList.jsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import StarRating from './StarRating'; // 같은 폴더에 있으므로 './StarRating' 사용

const ReviewList = ({ reviews }) => {
  return (
      <Box>
        {reviews.map((review) => (
            <Box key={review.reviewId} borderWidth={1} borderRadius="md" p={4} mb={4}>
              <Text fontWeight="bold">
                {review.username ? review.username : '익명'}
              </Text>
              {/* 평점 표시 */}
              <StarRating rating={review.rating} setRating={() => {}} />
              <Text>{review.comment}</Text>
            </Box>
        ))}
      </Box>
  );
};

export default ReviewList;
