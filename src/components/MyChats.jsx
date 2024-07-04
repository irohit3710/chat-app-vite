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
import { BASE_URL, ENDPOINT } from '../Context/helper.jsx'
import ProfileModal from "./miscellaneous/ProfileModal.jsx";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import io from "socket.io-client";

// const ENDPOINT = 'http://localhost:8000'; 
var socket, selectedChatCompare;

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const [userToShow, setUserToShow] = useState();
    const [chatBg, setChatBg] = useState('orange.200');
    const { selectedChat, setSelectedChat, user, chats, setChats, themeValue } = ChatState();
    const toast = useToast();

    const fetchChats = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}/chat`, config);
            setChats(data);
        } catch (error) {
            console.log(error);
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


    const checkOnlineUsers = () => {
        console.log('check1')
        socket = io(ENDPOINT);
        // socket.emit('online-users', 122433366);
        socket.on('user-status', (users) => {
            console.log("users : ", users);
        })

        socket.on('checkuseronline', (users) => {
            console.log("users : ", users);
        })
        console.log('check2')
    }


    const getSelectChatBg = ({chat})=>{
        console.log(selectedChat,' & ',chat);
        if(themeValue){
            if(selectedChat===chat){
                return 'green.200';
            }
            else{
                return 'gray.700';
            }
        }
        else{
            if(selectedChat===chat){
                return 'orange.400';
            }
            else{
                return 'orange.200';
            }
        }
    }



    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg={themeValue ? 'gray.700' : "orange.200"}
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            className='my-first-step'
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
                <Text color={themeValue ? 'white' : "black"}>
                    My Chats
                </Text>
                <GroupChatModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}
                        className='my-fourth-step'
                        onClick={() => { checkOnlineUsers() }}
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
                bg={themeValue ? 'gray.600' : "orange.100"}
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
                                    cursor="pointer"
                                    // bg={selectedChat === chat ? "orange.400" : "orange.200"}
                                    bg={
                                        themeValue
                                            ? selectedChat === chat
                                                ? 'green.200'
                                                : 'gray.700'
                                            : selectedChat === chat
                                                ? 'orange.400'
                                                : 'orange.200'
                                    }
                                    color={
                                        themeValue
                                            ? selectedChat === chat
                                                ? 'black'
                                                : 'white'
                                            : selectedChat === chat
                                                ? 'white'
                                                : 'black'
                                    }
                                    // color={selectedChat === chat ? "white" : "black"}
                                    // color={themeValue ? 'white' : 'black'}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                    display='flex'
                                    flexDirection='row'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    className='my-second-step'
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
                                            <MenuButton p={1} className='my-eighth-step'>
                                                <MoreVertIcon fontSize="medium" m={1} />
                                            </MenuButton>
                                            <MenuList p={2} className="d-flex flex-column gap-2">
                                                <Button bg={themeValue ? 'blue.800':'blue.200'} _hover={{ backgroundColor: themeValue ? "blue.900":'orange', color: themeValue ? 'white':'black', transition: 'all 200ms ease' }}>Profile</Button>
                                                <Button bg={themeValue ? 'blue.800':'blue.200'} _hover={{ backgroundColor: themeValue ? "blue.900":'orange', color: themeValue ? 'white':'black', transition: 'all 200ms ease' }}>Send Request</Button>
                                            </MenuList>
                                        </Menu>
                                    </div>
                                    <Box flex='0.1' onClick={() => { handleProfileModelClick(chat) }} className="my-sixth-step">
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
