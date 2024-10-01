// src/charge/components/ReviewSection.jsx

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/axiosInstance.js';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const ReviewSection = ({ statId }) => {
  console.log('ReviewSection - Received statId:', statId);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // 리뷰 목록 가져오기
  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get(`/api/reviews/charger/${statId}`, {
        params: { page: 0, size: 3 },
      });
      setReviews(response.data.content);
    } catch (error) {
      console.error('리뷰 목록 불러오기 실패:', error);
    }
  };

  // 평균 평점 가져오기
  const fetchAverageRating = async () => {
    try {
      const response = await axiosInstance.get(`/api/reviews/charger/${statId}/average-rating`);
      setAverageRating(response.data);
    } catch (error) {
      console.error('평균 별점 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchAverageRating();
  }, [statId]);

  // 리뷰 제출 후 콜백 함수
  const handleReviewSubmit = (newReview) => {
    // 새로운 리뷰를 리스트에 추가
    setReviews((prevReviews) => [newReview, ...prevReviews]);
    // 평균 평점 갱신
    fetchAverageRating();
  };

  return (
      <div>
        <h2>평균 평점: {averageRating}</h2>
        {/* 리뷰 작성 폼 */}
        <ReviewForm statId={statId} onReviewSubmit={handleReviewSubmit} />
        {/* 리뷰 리스트 */}
        <ReviewList reviews={reviews} />
      </div>
  );
};

export default ReviewSection;
