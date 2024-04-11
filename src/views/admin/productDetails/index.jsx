import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ProductCard from "views/admin/productDetails/components/ProductCard";

const Overview = () => {
  const products = useParams();
  const [product, setProduct] = useState(null);

  const productId = products.id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:4200/api/get/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.message);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {product && <ProductCard product={product} />}
    </Box>
  );
};

export default Overview;
