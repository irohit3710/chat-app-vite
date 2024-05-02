import { Box, Button, Heading } from '@chakra-ui/react'
import React from 'react'
import Lottie from 'react-lottie'
import paymentSuccess from '../../animations/paymentSuccess.json'
import { useNavigate } from 'react-router'


const PaymentSuccess = () => {
    const navigate = useNavigate();

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentSuccess,
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
            <Button bg='orange.400' outline='none' onClick={()=>{navigate('/')}}>Go Back</Button>
        </Box>
    )
}

export default PaymentSuccess