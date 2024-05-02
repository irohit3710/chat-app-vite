import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Lottie from 'react-lottie'
import paymentFailed from '../../animations/paymentFailed.json'
import { useNavigate } from 'react-router'


const PaymentFailure = () => {
    const navigate = useNavigate();

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentFailed,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Box display='flex' flexDirection='column' alignItems='center' height='100vh'>
            {/* <Heading paddingTop='10'>Payment Success</Heading> */}
            <Box >
                <Lottie
                    options={defaultOptions}
                    height={600}
                />
            </Box>
            <Text color='red.500' paddingBottom='2'>*Do not panic, if amount is deducted it will gets auto refuned in your account within 24 hours</Text>
            <Button bg='orange.400' outline='none' onClick={()=>{navigate('/')}}>Go Back</Button>
        </Box>
    )
}

export default PaymentFailure