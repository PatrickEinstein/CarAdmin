import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import UserCard from "views/admin/userDetails/components/UserCard";

const UserDetails = () => {
  const { id } = useParams();   
  const [user, setUser] = useState(null);   
  const [isSaving, setIsSaving] = useState(false);

  const history = useHistory();

  useEffect(() => {    
    fetch(`http://localhost:4000/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {        
        setUser(data.responseData);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);   

  const handleSave = (userToUpdate) => {
    setIsSaving(true);            
    fetch(`http://localhost:4000/api/users/activate/${userToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: userToUpdate.isActive }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {          
          setUser(userToUpdate);
          history.push("/admin/users");
        } else {
          console.error("Error updating user activation:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating user activation:", error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {user && (
        <UserCard
          user={user}
          onToggleActivation={(id, isActive) =>
            setUser((prevUser) => ({
              ...prevUser,
              isActive,
            }))
          }
        />
      )}
      <Button
        mt={4}
        colorScheme="teal"
        onClick={() => handleSave(user)}
        isLoading={isSaving}
      >
        Save
      </Button>
    </Box>
  );
};

export default UserDetails;
