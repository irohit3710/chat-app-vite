import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList, } from "@chakra-ui/menu";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, } from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading.jsx";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal.jsx";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics.jsx";
import UserListItem from "../userAvatar/UserListItem.jsx";
import { ChatState } from "../../Context/ChatProvider.jsx";
import { Diversity2 } from "@mui/icons-material";
import { HiUserGroup } from "react-icons/hi2";
import { FaPlusSquare } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { BASE_URL } from '../../Context/helper.jsx'
import JoinMeetingModal from "../Modal/JoinMeetingModal.jsx";
import { generateMeetingId } from "../Helper/custome.helper.js";
import PushNotification from "../PushNotification/PushNotification.jsx";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [meetingModal, setMeetingModal] = useState(false);
  const [joinMeetingId, setJoinMeetingId] = useState(undefined);

  const { setSelectedChat, user, notification, setNotification, chats, setChats, themeValue, setThemeValue } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId, userPrivacy) => {
    // console.log(userId, ' & ',userPrivacy)
    if (userPrivacy) {
      toast({
        title: "User profile is private",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };


  const createNewMeetingHandler = () => {
    const meetingId = generateMeetingId();
    navigate(`/ne/meeting/${meetingId}`);
  }

  const joinMeetingHandler = () => {
    if (joinMeetingId.length < 1) {
      return;
    }
    navigate(`/ex/meeting/${joinMeetingId}`);
  }

  const themeChangeHandler = () =>{
    setThemeValue(!themeValue);
  }


  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        // bg="white"
        // w="100%"
        p="5px 10px 5px 10px"
        // borderWidth="5px"
        // bg='orange.300'
        bg={themeValue ? 'gray.800' : "orange.300"}
        borderBottomRadius='md'
        marginBottom='5px'
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} className='my-third-step' bg={themeValue ? "whatsapp.500":"white"}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Box paddingX='12px' borderRadius='6px'>
          <Text fontSize="2xl"  fontWeight='bold' color={themeValue?'white':"blue.800"}>
            <span>ChitChatWeb</span>
          </Text>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Box marginRight='5px'>
            <Menu bg={themeValue? "whatsapp.500":"orange.300"} border>
              <MenuButton as={Button} bg={themeValue? "whatsapp.500":"orange.300"} rightIcon={<HiUserGroup />}>
                {/* <HiUserGroup/> */}
                <Text>Meeting</Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { createNewMeetingHandler() }}> <MdFiberNew size={20} style={{ marginRight: '4px' }} color="blue" /> New Meeting</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => { setMeetingModal(true) }}><GrAddCircle size={20} style={{ marginRight: '4px' }} color="green" /> Join Existing</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Button bg={themeValue? "whatsapp.500":"orange.300"} className='my-seventh-step'><Diversity2 fontSize="medium" /></Button>
          <Menu className='my-fifth-step'>
            {/* <MenuList> */}
            {/* <MenuItem>
                <MenuButton>
                  <Diversity2 fontSize="medium" mt={1} />
                </MenuButton>
              </MenuItem> */}
            {/* </MenuList> */}
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} color={themeValue? "white":"black"}/>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu bg={themeValue? "whatsapp.500":"orange.300"} border>
            <MenuButton as={Button} bg={themeValue? "whatsapp.500":"orange.300"} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg={themeValue?'gray.700':'white'} color={themeValue?'white':'black'}>
              <ProfileModal UserData={user}>
                <MenuItem _hover={{bg:themeValue ? 'gray.800':'gray.100'}} bg={themeValue?'gray.700':'white'} >My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler} _hover={{bg:themeValue ? 'gray.800':'gray.100'}} bg={themeValue?'gray.700':'white'} >Logout</MenuItem>
              <MenuDivider />
              <MenuItem onClick={themeChangeHandler} _hover={{bg:themeValue ? 'gray.800':'gray.100'}} bg={themeValue?'gray.700':'white'} >Change Theme</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} bg={themeValue?'gray.700':'white'}>
        <DrawerOverlay />
        <DrawerContent bg={themeValue?'gray.700':'white'}>
          <DrawerHeader borderBottomWidth="1px" color={themeValue?'white':'black'}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                color={themeValue?'white':'black'}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id, user.private)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <JoinMeetingModal
        meetingModal={meetingModal}
        setMeetingModal={setMeetingModal}
        setJoinMeetingId={setJoinMeetingId}
        joinMeetingHandler={joinMeetingHandler}
      />
    </>
  );
}

export default SideDrawer;
