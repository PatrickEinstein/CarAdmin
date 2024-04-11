import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdVisibility, MdEdit } from "react-icons/md";

import {
  Box,
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
  MdLibraryBooks,
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

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:4200/api/allUser/1/1000",{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const users = data.message;

        const tableData = users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          active: user.isActive,
          actions: (
            <div>
              <button onClick={() => handleView(user)}>
                <MdVisibility />            
              </button>
            </div>
          ),
        }));

        setUsers(tableData);
        setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  const totalUsersCount = users.length;

  const activeUsersCount = users.filter((user) => user.isActive).length;
  const inactiveUsersCount = totalUsersCount - activeUsersCount;

  const userColumn = [
    { header: "First Name", key: "firstName" },
    { header: "Last Name", key: "lastName" },
    { header: "Email", key: "email" },
    { header: "Phone Number", key: "phoneNumber" },    
    { header: "Active", key: "active" },
    { header: "Action", key: "actions" },
  ];

  const handleView = (product) => {
    setSelectedUser(product);
    // setIsPopupOpen(true);

    history.push(`/admin/user/${product._id}`);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
                <Icon
                  w="32px"
                  h="32px"
                  as={MdLibraryBooks}
                  color={brandColor}
                />
              }
            />
          }
          name="Total Users"
          value={totalUsersCount.toString()}
        />
      </SimpleGrid>

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(2, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <PieCard
          data={[
            { label: "Active", value: activeUsersCount, color: "green" },
            { label: "Inactive", value: inactiveUsersCount, color: "red" },
          ]}
        />        
      </Grid>

      <ComplexTable
        tableHeading="Users"
        columnsData={userColumn}
        tableData={users}
      />
    </Box>
  );
}
