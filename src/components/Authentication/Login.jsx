import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { BASE_URL, randomPassword } from "../../Context/helper";
import ReCAPTCHA from "react-google-recaptcha";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as EmailValidator from 'email-validator'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const { setUser } = ChatState();



    const navigate = useNavigate();
    const inputCSS = {
        backgroundColor: 'rgba(255, 255, 255, .15)', backdropFilter: blur('5px'), border: 'none', boxShadow: 'none',
    }
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        const validated = EmailValidator.validate(email);
        if (!validated) {
            toast({
                title: "Please enter a valid email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            // console.log(email, "and", password)
            const { data } = await axios.post(
                `${BASE_URL}/api/user/login`,
                { email, password },
                config
            );
            console.log("data : ", data);

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // console.log("In login side");
            navigate("/chats")
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true);
    }


    // console.log(BASE_URL)

    // useGoogleOneTapLogin({
    //     onSuccess: credentialResponse => {
    //       console.log(credentialResponse);
    //     },
    //     onError: () => {
    //       console.log('Login Failed');
    //     },
    //   });

    const onSuccess = async (credentialResponse)=>{
            console.log(credentialResponse);
            const decoded = await jwtDecode(credentialResponse.credential);
            console.log(decoded);
    }

    const onError = () =>{
        console.log('Login Failed');
    }


    return (
        <VStack spacing="10px">
            <FormControl id="" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputCSS}
                />
            </FormControl>
            <FormControl id="" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        style={inputCSS}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick} color={"black"} style={{ boxShadow: 'none' }}>
                            {/* {show ? "Hide" : "Show"} */}
                            {show ? <VisibilityOffIcon /> : <VisibilityIcon style={{ color: 'orangered' }} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <ReCAPTCHA
                sitekey="6LcsbFYpAAAAAE-MvxaJhwr_vnKL9DKMiCmwDSnD"
                onChange={onChange}
            />
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
                isDisabled={!verified}
            >
                Login
            </Button>
            {/* <Button
                variant="solid"
                colorScheme="whiteAlpha"
                width="100%"
                onClick={() => {
                    setPassword(randomPassword());
                }}
            >
                Generate Random Password
            </Button> */}
            <GoogleLogin
                
                text="signin_with"
                shape="pill"
                useOneTap = {true}
                cancel_on_tap_outside = {false}
                auto_select
                use_fedcm_for_prompt
                onSuccess={onSuccess}
                onError={onError}
            />;
            

        </VStack>
    );
};

export default Login;
