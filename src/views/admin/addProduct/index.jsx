import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";

export default function Overview() {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionList, setDescriptionList] = useState([]);
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const history = useHistory();

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:4000/api/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          return response.json();
        })
        .then((data) => {
          const product = data.responseData;
          setName(product.name);
          setPrice(product.price);
          setModel(product.model);
          setLocation(product.location);
          setDescriptionList(product.description);
          setCategory(product.category);
          setIsFeatured(product.isFeatured);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [productId]);

  const handleAddDescription = () => {
    if (description.trim() !== "") {
      setDescriptionList([...descriptionList, description]);
      setDescription("");
    }
  };

  const handleRemoveDescription = (index) => {
    const newList = [...descriptionList];
    newList.splice(index, 1);
    setDescriptionList(newList);
  };

  const handleFileChange = (e) => {
    // Get the selected file from input
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append("name", name);
    formData.append("price", price);
    formData.append("model", model);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("isFeatured", isFeatured);
    formData.append("description", JSON.stringify(descriptionList));
    formData.append("imageFile", imageFile);

    try {
      // Make a POST request to your server
      const url = productId
        ? `http://localhost:4000/api/products/${productId}`
        : "http://localhost:4000/api/products";

      const response = await fetch(url, {
        method: productId ? "PUT" : "POST",
        body: formData,
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      // Reset form fields after successful submission
      setName("");
      setPrice("");
      setModel("");
      setLocation("");
      setCategory("");
      setIsFeatured(false);
      setDescription("");
      setDescriptionList([]);
      setImageFile(null);

      history.push("/admin/products")
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const CategoryEnum = ["None", "Premium", "Featured", "Classic"];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
        <form onSubmit={handleSubmit}>
          {/* File Upload */}
          <FormControl>
            <FormLabel>Upload Product Image</FormLabel>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
          </FormControl>
          {/* Rest of the form */}
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Model</FormLabel>
            <Input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CategoryEnum.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Is Featured</FormLabel>
            <Checkbox
              isChecked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            >
              Featured
            </Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleAddDescription} mt={2}>
              Add Description
            </Button>
          </FormControl>
          <Box>
            {descriptionList.map((desc, index) => (
              <Box key={index} mt={2}>
                {desc}
                <Button
                  ml={2}
                  size="xs"
                  colorScheme="red"
                  onClick={() => handleRemoveDescription(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
          <Button type="submit" mt={4} colorScheme="teal">
            Submit
          </Button>
        </form>
      </Grid>
    </Box>
  );
}
