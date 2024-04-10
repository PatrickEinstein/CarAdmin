import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdVisibility, MdEdit } from "react-icons/md";

import {
  Box,
  Button,
  Grid,
  Avatar,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdPeople,
} from "react-icons/md";

import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";

import PieCard from "views/admin/default/components/PieCard";
import IconBox from "components/icons/IconBox";
import MiniStatistics from "components/card/MiniStatistics";
import Tasks from "views/admin/default/components/Tasks";
import MiniCalendar from "components/calendar/MiniCalendar";
import ComplexTable from "views/admin/users/components/ComplexTable";

import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function Overview() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const products = data.responseData.products;

        const tableData = products.map((product) => ({
          name: product.name,
          price: product.price,
          category: product.category,
          location: product.location,
          model: product.model,
          featured: product.isFeatured,
          actions: (
            <div>
              <button onClick={() => handleView(product)}>
                <MdVisibility />
                {/* View */}
              </button>
              <button onClick={() => handleEdit(product)}>
                <MdEdit />
                {/* Edit */}
              </button>
            </div>
          ),
        }));
        setProducts(tableData);
        setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const totalProductsCount = products.length;

  const productColumns = [
    // { header: "Product Image", key: "name" },
    { header: "Product Name", key: "name" },
    { header: "Price (USD)", key: "price" },
    { header: "Category", key: "category" },
    { header: "Location", key: "location" },
    { header: "Model", key: "model" },
    { header: "Featured", key: "featured" },
    { header: "Action", key: "actions" },
  ];

  const handleView = (product) => {
    setSelectedProduct(product);
    // setIsPopupOpen(true);

    history.push(`/admin/product/${product._id}`);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    // Handle edit action
    history.push(`/admin/edit-product/${product._id}`);
  };

  const handleAddProduct = () => {
    // Navigate to the add-product page when the button is clicked
    history.push("/admin/add-product");
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}

      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 1, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Products"
          value={totalProductsCount.toString()}
        />

        <Button
          mt={{ base: 4, md: 0 }}
          colorScheme="teal"
          size="md"
          onClick={handleAddProduct}
          leftIcon={<MdAddTask />}
        >
          Add Product
        </Button>
      </SimpleGrid>


      <ComplexTable
        tableHeading="Products"
        columnsData={productColumns}
        tableData={products}
      />
    </Box>
  );
}
