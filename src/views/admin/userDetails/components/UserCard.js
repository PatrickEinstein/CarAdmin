import React from "react";
import { Box, Heading, Text, Divider, Image, Flex, Switch } from "@chakra-ui/react";

const UserCard = ({ user, onToggleActivation }) => {
  return (
    <Box bg="white" p={4} boxShadow="md" borderRadius="md">
      <Heading size="md">{`${user.firstName} ${user.lastName}`}</Heading>
      <Divider my={2} />
      <Flex alignItems="center">
        <Box flex="1">
          <Text>Email: {user.email}</Text>
          <Text>Phone Number: {user.phoneNumber}</Text>
          <Text>Admin: {user.isAdmin ? "Yes" : "No"}</Text>
          <Text>Active:</Text>
          <Switch
            isChecked={user.isActive}
            onChange={() => onToggleActivation(user.id, !user.isActive)}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UserCard;
