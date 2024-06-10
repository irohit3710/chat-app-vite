import React from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Box, Button, Image, Text, VStack ,Link} from '@chakra-ui/react';
import ThankYouBg from '../../assets/ThankYouBg.jpg'
import ChatLogo1 from '../../assets/chatLogo1.png'
import { getRandomThought } from '../Helper/custome.helper';
const ThankYou = () => {

    const navigate = useNavigate();

    const handleComplete = () => {
        navigate('/chats');
    };

    const renderer = ({ seconds }) => {
        return (
            <Text fontSize="2xl" color="blue.500">
                Redirecting in {seconds} seconds...
            </Text>
        );
    };

    const thought = getRandomThought();


    return (
        <VStack
            height="100vh"
            // justifyContent="center"

            alignItems="center"
            // spacing={4}
            backgroundImage={ThankYouBg}
            paddingTop='2%'
        >
            <Box>
                <Image height='100px' src={ChatLogo1} marginBottom='20px'></Image>
            </Box>
            <Box
                // border='1px solid red'
                height='content-fit'
                padding='20px'
                borderRadius='15px'
                width='60%'
                boxShadow="2xl"
                bg='rgba(0,0,0,0.5)'
            >
                <Box width='full' height='content-fit'>
                    <Text color='white' fontSize='3xl' fontWeight='bold'>{thought.thought}</Text>
                </Box>
                <hr />
                <Box width='full' height='content-fit' textAlign='right'>
                    <Text color='white' fontSize='xl'>{thought.by}</Text>
                </Box>
            </Box>
            <Box
                padding={8}
                // bg="white"
                // boxShadow="md"
                borderRadius="lg"
                textAlign="center"
            >
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
                    Thank You!
                </Text>
                <Box
                padding='20px'
                borderRadius='15px'
                bg='white'
                >
                    <Countdown date={Date.now() + 59000} renderer={renderer} onComplete={handleComplete} />
                    <Text>Click <Link color='blue' textDecoration='underline' onClick={()=>{navigate('/chats')}}>here</Link> to go faster</Text>
                </Box>
            </Box>
        </VStack>
    );
};

export default ThankYou;