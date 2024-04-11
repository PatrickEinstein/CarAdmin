import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import illustration from "assets/img/auth/car.jpg";
import DefaultAuth from "layouts/auth/Default";
import {
  Box,
  Flex,
  Icon,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function Register() {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    profilePicture: File,
  });

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    profilePicture,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const data = new FormData();

  data.append("firstName", firstName);
  data.append("lastName", lastName);
  data.append("email", email);
  data.append("phoneNumber", phoneNumber);
  data.append("password", password);
  data.append("profilePicture", profilePicture);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const requestOptions = {
      method: "POST",
      body: data,
    };

    try {
      const response = await fetch(
        "http://localhost:4200/api/register",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      history.push("/auth/sign-in");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Register
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Create your account!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <form onSubmit={handleRegister}>
            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                First Name
              </FormLabel>
              <Input
                id="firstName"
                isRequired
                fontSize="sm"
                placeholder="Enter your first name"
                mb="24px"
                size="lg"
                variant="auth"
                name="firstName"
                value={firstName}
                onChange={(e) => handleChange(e)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Last Name
              </FormLabel>
              <Input
                id="lastName"
                isRequired
                fontSize="sm"
                placeholder="Enter your last name"
                mb="24px"
                size="lg"
                variant="auth"
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Email
              </FormLabel>
              <Input
                id="email"
                isRequired
                fontSize="sm"
                placeholder="Enter your email"
                mb="24px"
                size="lg"
                variant="auth"
                type="email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Phone Number
              </FormLabel>
              <Input
                id="phoneNumber"
                isRequired
                fontSize="sm"
                placeholder="Enter your phone number"
                mb="24px"
                size="lg"
                variant="auth"
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handleChange(e)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  isRequired
                  fontSize="sm"
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  variant="auth"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Confirm Password
              </FormLabel>
              <Input
                isRequired
                fontSize="sm"
                placeholder="Confirm password"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Display Picture
              </FormLabel>
              <Input
                id="profileImage"
                isRequired
                fontSize="sm"
                placeholder="Add a picture"
                mb="24px"
                size="lg"
                type="file"
                variant="auth"
                name="profilePicture"
                value={profilePicture}
                onChange={(e) => handleChange(e)}
              />
              <Button
                type="submit"
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
              >
                Register
              </Button>
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/login">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Log In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
