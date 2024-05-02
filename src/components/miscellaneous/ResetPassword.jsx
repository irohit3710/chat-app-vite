import { Button, Container, Heading, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, WrapItem, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import forgotPassword from '../../assets/forgotPassword.png'
import {  useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [disable, setDisable] = useState(false);
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const history = useHistory();
    const navigate = useNavigate();

    const handleOnClick = ()=>{
        if(password.length<1 || password!==confirmPassword){
            return;
        }
        setDisable(true);
        onOpen()
    }

    const onCloseHandler = ()=>{
        onclose
        // history.push('/');
        navigate(to='/')
    }
    return (
        <div style={{ alignItems: "center", background: "linear-gradient(223deg, rgba(255,102,0,1) 0%, rgba(175,41,174,1) 48%, rgba(33,0,255,1) 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", color: "white", }} >
            <Heading>Reset Password </Heading>
            <div style={{ display: 'flex', flexDirection: "row", gap: "200px", marginTop: '20px', alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ maxWidth: "600px" }}>
                    <img src={forgotPassword} alt="" />
                </div>
                <div>
                    <Stack gap={"20px"} style={{ alignItems: "center", }}>
                        <InputGroup>
                            <InputLeftAddon style={{ color: "black", border: "none" }} width={"40"}>
                                New Password
                            </InputLeftAddon>
                            <Input type='email' required={true} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} width="80" style={{ backgroundColor: 'rgba(255, 255, 255, .15)', backdropFilter: blur('5px'), border: 'none', boxShadow: 'none' }} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon style={{ color: "black", border: "none" }} width={"40"}>
                                Confirm Password
                            </InputLeftAddon>
                            <Input type='email' required={true} placeholder='Confirm Password' onChange={(e)=>{setConfirmPassword(e.target.value)}} width="80" style={{ backgroundColor: 'rgba(255, 255, 255, .15)', backdropFilter: blur('5px'), border: 'none', boxShadow: 'none' }} />
                        </InputGroup>
                        <WrapItem>
                            <Button colorScheme='whatsapp' disabled={disable} style={{ boxShadow: 'none' }} onClick={handleOnClick}>Submit</Button>
                        </WrapItem>
                    </Stack>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onCloseHandler} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forgot Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Password Reset Success
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onCloseHandler}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ResetPassword