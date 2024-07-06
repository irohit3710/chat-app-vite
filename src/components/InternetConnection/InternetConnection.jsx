import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { MdOutlineWifiOff } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const InternetConnection = () => {
    const [online, setOnline] = useState(false);
    const [showConnectedMessage, setShowConnectedMessage] = useState(true);
    const [connectedHeight, setConnectedHeight] = useState(0);
    const [notConnectedHeight, setNotConnectedHeight] = useState(0);

    const handleOnline = () => {
        setOnline(true);
        setShowConnectedMessage(true);
        console.log('Device is back online');

        // Set a timer to hide the connected message after 10 seconds
        setTimeout(() => {
            setShowConnectedMessage(false);
        }, 10000);
    };

    const handleOffline = () => {
        setOnline(false);
        setShowConnectedMessage(false);
        console.log('Device is offline');
    };

    useEffect(() => {
        // Initial check
        if (navigator.onLine) {
            handleOnline();
        } else {
            handleOffline();
        }

        // Add event listeners
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {!online &&
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 25 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, delay:4}}
                    >
                        <Box width={'100%'} height={'25px'} position='absolute' bottom={'0px'} bg='red.500' textAlign={'center'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={'3px'} color={'white'}>
                            No Connection  <MdOutlineWifiOff color='white' size={20} />
                        </Box>
                    </motion.div>
                }
            </AnimatePresence>
            <AnimatePresence>
                {(showConnectedMessage && online) && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 25 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, delay: 4 }}
                    >
                        <Box width={'100%'} height={'25px'} position='absolute' bottom={'0px'} bg='whatsapp.600' textAlign={'center'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={'3px'} color={'white'}>
                            Connected <FaWifi color='white' size={20} />
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default InternetConnection