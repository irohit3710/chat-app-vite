import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL, randomPassword } from "../../Context/helper";
import ReCAPTCHA from "react-google-recaptcha";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Icon, Image, Text, Box, IconButton } from "@chakra-ui/react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as EmailValidator from 'email-validator'
import ToolTip from "../Helper/ToolTip";
import { handleGetLocation } from "../Helper/getLocation";


const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [imgg, setImgg] = useState()
    const [coordinates,setCoordinates] = useState(undefined);
    const toast = useToast();
    // const history = useHistory();
    const navigate = useNavigate();

    const inputCSS = {
        backgroundColor: 'rgba(255, 255, 255, .15)', backdropFilter: blur('5px'), border: 'none', boxShadow: 'none'
    }

    const handleClick = () => setShow(!show);

    const handleLocationFunction =async () =>{
        const coordinates =await handleGetLocation();
        setCoordinates(coordinates);
    }


    const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        const validated = EmailValidator.validate(email);
        if(!validated){
            toast({
                title: "Please enter a valid email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }

        if(!coordinates){
            toast({
                title: "Current Location required",
                description:" Click on location icon to proceed further.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
        // console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${BASE_URL}/api/user`,
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            // history.push("/chats");
            navigate('/chats');
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };

    const postDetails = async (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            var reader = new FileReader();
            reader.readAsDataURL(pics);
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
            }
            // const data = new FormData();
            // console.log("Data : ", data);
            // data.append("file", pics);
            // data.append("upload_preset", "chitChatWebApp");
            // data.append("cloud_name", "rohitpanwarchitchatwebapp");
            // fetch("https://api.cloudinary.com/v1_1/rohitpanwarchitchatwebapp/image/upload", {
            //     method: "post",
            //     body: data,
            // })
            //     .then((res) => res.json())
            //     .then((data) => {
            //         setPic(data.url.toString());
            //         // console.log(data.url.toString());
            //         setPicLoading(false);
            //     })
            //     .catch((err) => {
            //         // console.log(err);
            //         setPicLoading(false);
            //     });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        setPicLoading(false);
    };

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true);
    }

    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                    style={inputCSS}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputCSS}
                />
            </FormControl>
            <FormControl id="" isRequired>
                <FormLabel style={{display:'flex',flexDirection:'row',alignItems:'center', gap:'5px'}}>Password <ToolTip/></FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputCSS}
                        value={password}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} color={"black"}>
                            {show ? <VisibilityOffIcon /> : <VisibilityIcon style={{ color: 'orangered' }} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        style={inputCSS}
                        value={confirmpassword}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} color={"black"} >
                            {show ? <VisibilityOffIcon /> : <VisibilityIcon style={{ color: 'orangered' }} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture <span color="red">(png/jpeg only)</span></FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    style={inputCSS}
                />
            </FormControl>
            <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-evenly' width='full'>
                <ReCAPTCHA
                    sitekey="6LcsbFYpAAAAAE-MvxaJhwr_vnKL9DKMiCmwDSnD"
                    onChange={onChange}
                />
                <Box display='flex' flexDirection='column' alignItems='center' cursor='pointer'>
                    <Button color={'orange.400'}><LocationOnIcon fontSize="large" onClick={handleLocationFunction} /></Button>
                    <Text fontSize='xs' color='orange.400'>(click here)</Text>
                </Box>
            </Box>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
                isDisabled={!verified}
            >
                Sign Up
            </Button>
            <Button
                variant="solid"
                colorScheme="whiteAlpha"
                width="100%"
                onClick={() => {
                    setPassword(randomPassword());
                }}
            >
                Generate Random Password
            </Button>
            <Text className="" color='orange.400' fontWeight="semibold">(Recommended for strong password)</Text>
            {/* {imgg && <Image src={imgg} alt="Testing Image"></Image>} */}

        </VStack>
    );
};

export default Signup;
