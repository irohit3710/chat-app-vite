import { Button, Container, Heading, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, WrapItem, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import forgotPassword from '../../assets/forgotPassword.png'

const ForgotPassword = () => {
    const [disable, setDisable] = useState(false);
    const [email,setEmail] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOnClick = ()=>{
        if(email.length<1){
            return;
        }
        setDisable(true);
        onOpen()
    }
    return (
        <div style={{ alignItems: "center", background: "linear-gradient(223deg, rgba(255,102,0,1) 0%, rgba(175,41,174,1) 48%, rgba(33,0,255,1) 100%)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", color: "white", }} >
            <Heading>Forgot Password ? </Heading>
            <div style={{ display: 'flex', flexDirection: "row", gap: "200px", marginTop: '20px', alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ maxWidth: "600px" }}>
                    <img src={forgotPassword} alt="" />
                </div>
                <div>
                    <Stack gap={"20px"} style={{ alignItems: "center", }}>
                        <InputGroup>
                            <InputLeftAddon style={{ color: "black", border: "none" }} >
                                Email
                            </InputLeftAddon>
                            <Input type='email' required={true} placeholder='Registered Email' onChange={(e)=>{setEmail(e.target.value)}} width="64" style={{ backgroundColor: 'rgba(255, 255, 255, .15)', backdropFilter: blur('5px'), border: 'none', boxShadow: 'none' }} />
                        </InputGroup>
                        <WrapItem>
                            <Button colorScheme='whatsapp' disabled={disable} style={{ boxShadow: 'none' }} onClick={handleOnClick}>Submit</Button>
                        </WrapItem>
                    </Stack>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forgot Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Password Reset Link has been sent to {email}.
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ForgotPassword