// src/components/StarRating.js

import { Box, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
      <HStack>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
              <Box
                  as="label"
                  key={index}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              >
                <FaStar size={24} cursor="pointer" />
              </Box>
          );
        })}
      </HStack>
  );
};

export default StarRating;
