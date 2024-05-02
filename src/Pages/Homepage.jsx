import { Box, Center, Container, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text, } from "@chakra-ui/react";
import { useEffect } from "react";
import {  useNavigate, } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import logo from '../assets/chatLogo1.png'
import bg from '../assets/bg.jpg'

function Homepage() {
    // const history = useHistory();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user){ 
            // history.push("/chats");
            navigate('/chats');
        }
    }, [navigate]);
    return (
        // <div style={{background: "linear-gradient(223deg, rgba(255,102,0,1) 0%, rgba(175,41,174,1) 48%, rgba(33,0,255,1) 100%)", minHeight: "100vh"}}>
        <div style={{backgroundImage:`url(${bg})`, backgroundSize:'cover', backgroundAttachment:'fixed', minHeight: "100vh"}}>
        <Container maxW="xl" centerContent backgroundColor="rgba(255, 255, 255, 0)">
            <Box
                d="flex"
                justifyContent="center"
                alignItems="center"
                gap={3}
                p={3}
                color="white"
                // colorScheme="red"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                // borderWidth="1px"
            >  
                <Image src={logo} boxSize='100px'></Image>
                <Text fontSize="4xl" fontFamily="'Cairo Play', sans-serif" fontWeight="bold" letterSpacing="wider">
                    ChitChatWeb
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} backgroundColor="rgba(255, 255, 255, 0)" textColor="white">
                <Tabs isFitted variant="solid-rounded">
                    <TabList mb="1em" textColor={"white"} gap={2}>
                        <Tab textColor={"white"} style={{boxShadow:'none',border:'1px solid white'}}>Login</Tab>
                        <Tab textColor={"white"} style={{boxShadow:'none',border:'1px solid white'}}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Box>
                    <Link onClick={()=>{navigate('/forgotPassword')}}>Forgot Password</Link>
                </Box>
            </Box>
        </Container>
        </div>
    );
}

export default Homepage;
// 9MCU3PCTEEBDP439H7S1ZCBA sg recovery