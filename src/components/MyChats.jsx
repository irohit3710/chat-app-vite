import { AddIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics.jsx";
import ChatLoading from "./ChatLoading.jsx";
import GroupChatModal from "./miscellaneous/GroupChatModal.jsx";
import { Avatar, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider.jsx";
import { BASE_URL } from '../Context/helper.jsx'
import ProfileModal from "./miscellaneous/ProfileModal.jsx";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { io } from "socket.io-client";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const [userToShow, setUserToShow] = useState();
    const [chatToShow, setChatToShow] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const toast = useToast();

    const fetchChats = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}/api/chat`, config);
            setChats(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const filterUser = (currentChat) => {
        currentChat.users.map((user) => {
            if (user._id !== loggedUser._id) {
                setUserToShow(user);
            }
        })
    }

    const handleProfileModelClick = (chat) => {
        filterUser(chat);
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();

        // eslint-disable-next-line
    }, [fetchAgain]);



    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="orange.200"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
        // borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <GroupChatModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                // bg="#F8F8F8"
                bg='orange.100'
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <>
                                <Box
                                    // onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    // bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    bg={selectedChat === chat ? "orange.400" : "orange.200"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                    display='flex'
                                    flexDirection='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Box onClick={() => setSelectedChat(chat)} flex='0.9'>
                                        <Text>
                                            {!chat.isGroupChat
                                                ? getSender(loggedUser, chat.users)
                                                : chat.chatName}
                                        </Text>
                                        {chat.latestMessage && (
                                            <Text fontSize="xs">
                                                <b>{chat.latestMessage.sender.name} : </b>
                                                {chat.latestMessage.content.length > 50
                                                    ? chat.latestMessage.content.substring(0, 51) + "..."
                                                    : chat.latestMessage.content}
                                            </Text>
                                        )}
                                    </Box>
                                    <div>
                                        <Menu>
                                            <MenuButton p={1}>
                                                <MoreVertIcon fontSize="medium" m={1} />
                                            </MenuButton>
                                            <MenuList p={2} className="d-flex flex-column gap-2">
                                                <Button bg='blue.300' _hover={{ backgroundColor: 'orange', color: 'white', transition: 'all 200ms ease' }}>Profile</Button>
                                                <Button bg='blue.300' _hover={{ backgroundColor: 'orange', color: 'white', transition: 'all 200ms ease' }}>Send Request</Button>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    <Box flex='0.1' onClick={() => { handleProfileModelClick(chat) }}>
                                        <ProfileModal UserData={userToShow}>
                                            <Avatar border='2px solid green' size='md' />
                                        </ProfileModal>
                                    </Box>
                                </Box>
                            </>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
