import { Badge, Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const UserListModal = ({ openListModal, setOpenListModal }) => {
    return (
        <>
            <Modal onClose={() => { setOpenListModal(false) }} isOpen={openListModal} isCentered>
                <ModalOverlay />
                <ModalContent bg='orange.200'>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        Users List
                    </ModalHeader>

                    <ModalCloseButton onClick={() => { setOpenListModal(false) }} />
                    <ModalBody d="flex" flexDir="column" alignItems="center" backgroundColor='whiteAlpha.600' maxHeight='300px' overflow='auto' marginY='1.5'>
                        <hr style={{ width: '100%' }} />
                        <Box d='flex' flexDir='row' alignItems="center" padding='4px' justifyContent='space-between' w='100%'>
                            <Box d='flex' flexDir='row' gap='1' alignItems='center'> 
                                <h5>User name <span style={{color:'gray'}}>(email)</span></h5>
                                {/* <Badge backgroundColor='blue.400' color='white'>Admin</Badge>
                                <Badge backgroundColor='green.400' color='white'>Supervisor</Badge> */}
                            </Box>
                            <Button backgroundColor='red.500' color='white' _hover={{ backgroundColor: 'red.600' }}>Remove</Button>
                        </Box>
                        <hr style={{ width: '100%' }} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserListModal