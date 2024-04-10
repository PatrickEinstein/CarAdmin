import React from "react";
import { Box, Heading, Text, Divider, Image, Flex } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <Box bg="white" p={4} boxShadow="md" borderRadius="md">
      <Heading size="md">{product.name}</Heading>
      <Divider my={2} />
      <Flex alignItems="center">
        {/* Image takes 50% width */}
        <Image
          src={product.productImages[0]?.url}
          alt={product.name}
          boxSize="50%"
          objectFit="cover"
          mr={2} // Add margin to separate from the content
        />
        <Box flex="1">
          {" "}
          {/* Takes remaining 50% width */}
          <Text fontWeight="bold">Price: ${product.price.toFixed(2)}</Text>
          <Text>Model: {product.model}</Text>
          <Text>Location: {product.location}</Text>
          <Text>Description:</Text>
          <Box ml={4}>
            {product.description.map((desc, index) => (
              <Text key={index}>- {desc}</Text>
            ))}
          </Box>
          <Text>Category: {product.category}</Text>
          <Text>Featured: {product.isFeatured ? "Yes" : "No"}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductCard;
