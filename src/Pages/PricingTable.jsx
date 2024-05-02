import React from 'react'
import pricingAnimation from '../animations/pricing.json'
import Lottie from 'react-lottie';
import { MDBContainer, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { payNow } from '../config/Razorpay/Razorpay';
import axios from 'axios';
import { BASE_URL } from '../Context/helper';
import { ChatState } from '../Context/ChatProvider';


const PricingTable = () => {
    const navigate = useNavigate();
    const {user} = ChatState();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: pricingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const paymentHandler = async(e)=>{
        if(localStorage.getItem("userInfo")){ 
            const user = localStorage.getItem("userInfo");
            payNow({e,user});
        }
        else{
            navigate('/');
        }
    }

    
    return (
        <div style={{  backgroundImage: 'radial-gradient(circle, rgba(252,173,94,1) 0%, rgba(250,250,250,1) 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }} >

            <Heading>Pricing</Heading>
            <Text fontSize='2xl'>Must Try our prime features !!!</Text>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-around' gap='200px'>
                <Box>
                    <Lottie
                        options={defaultOptions}
                        // height={50}
                        width={570}
                        style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                </Box>
                <Box display='flex' flexDirection='column' alignItems='center'>
                    {/* <MDBContainer className="py-5"> */}
                    <MDBTable
                        responsive
                        striped
                        className=" text-successtable-border border-light"
                    >
                        <MDBTableHead className="border-light">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">
                                    <strong>PRO</strong>
                                </th>
                                <th scope="col">
                                    <strong>Basic</strong>
                                </th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <th scope="row">One to One chat</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Group Chat</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Support</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Community</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="times" className="text-danger" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Voice & Video call</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="times" className="text-danger" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">See Other user profile</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="times" className="text-danger" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">FInd users by distance</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="times" className="text-danger" />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Backups</th>
                                <td>
                                    <MDBIcon fas icon="check" className="text-success" />
                                </td>
                                <td>
                                    <MDBIcon fas icon="times" className="text-danger" />
                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                    {/* </MDBContainer> */}
                    <Box display='flex' gap='10px'>
                        <Button variant='solid' bgColor='orange' color='' outline='none' _hover='none' onClick={paymentHandler}>BUY NOW at $15</Button>
                        <Button variant='solid' bgColor='red' color='white' outline='none' _hover='none' onClick={()=>{navigate('/chats')}}>BUY LATER</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default PricingTable