import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { LockIcon } from "@chakra-ui/icons";

const UserListItem = ({ handleFunction,user }) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg={user.private? "#d1eddb":"#E8E8E8"}
      _hover={{
        background: "#38B2AC",
        color: "white",
        transition: "all 100ms ease-in",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        // src={user.pic}
      />
      <Box>
        <Text className="d-flex align-items-center flex-row gap-2">{user.name}{user.private && <LockIcon color="green.500" />}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
