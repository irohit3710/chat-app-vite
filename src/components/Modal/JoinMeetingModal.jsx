import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,Button,Input } from '@chakra-ui/react'


const JoinMeetingModal = ({meetingModal, setMeetingModal,setJoinMeetingId,joinMeetingHandler}) => {
    return (
        <>
            <Modal isOpen={meetingModal} onClose={()=>{setMeetingModal(false)}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Join Meeting</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Enter Meeting ID
                        <Input placeholder='Ax$3eJ..' onChange={(e)=>{setJoinMeetingId(e.target.value)}}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>{setMeetingModal(false)}}>
                            Close
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={()=>{joinMeetingHandler()}}>
                            Join
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default JoinMeetingModal