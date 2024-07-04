import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useDisclosure, IconButton, Image, Drawer,Text, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Avatar, Switch, Spinner, useToast, Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Context/helper";
const ProfileModal = ({ UserData, children }) => {
  const { user, themeValue } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedInUser, setLoggedInUser] = useState();
  const [check, setCheck] = useState(user.private);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const updateProfilePrivacy = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.put(
        `${BASE_URL}/user/private/profile`,
        {},
        config
      );

      user.private = data.private;
      setLoading(false);
      setCheck(!check);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
    }
  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedInUser(userInfo);
  }, [])
  return (
    <>
      {/* {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )} */}
      {
        children === 'profileFromMyChats' ? (
          <Avatar />
        ) : (
          children ? (
            <span onClick={onOpen}>{children}</span>
          ) : (
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
          )
        )
      }
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} bg={themeValue?'gray.700':'white'}>
        <DrawerOverlay />
        <DrawerContent bg={themeValue?'gray.700':'white'}>
          <DrawerHeader borderBottomWidth='1px' bg={themeValue?'gray.800':'orange.400'}>
            <Text color={themeValue?'white':'black'}>User's Profile</Text>
          </DrawerHeader>
          <DrawerBody bg={themeValue ? 'gray.700' :'orange.200'}>
            <div>
              <Image src={UserData?.pic} borderRadius='50%' />
            </div>
            <div style={{ display: 'flex', flexDirection: "column", marginTop: "12px" }}>
              <span style={{color:themeValue?'white':'black'}}>Name : <span style={{ fontWeight: "bolder" }}>{UserData?.name + " "}</span>{(loggedInUser?.email === UserData?.email) ? (<EditIcon />) : ""}</span>
              <span style={{color:themeValue?'white':'black'}}>Email : <span style={{ fontWeight: "bolder" }}>{UserData?.email + " "}</span>{(loggedInUser?.email === UserData?.email) ? (<EditIcon />) : ""}</span>
            </div>
            {(user?._id==UserData?._id) && <div className="mt-2 fw-bold text-danger">
              <h4>Profile Privacy</h4>
              <Box className="d-flex align-items-center flex-row gap-3">
                <Switch isChecked={check} onChange={() => { updateProfilePrivacy() }} />
                {loading && <Spinner size="sm" className="m-2" />}
                {user.private ? <h2 className="text-success">Profile is private</h2> : <h2>Profile is open</h2>}
              </Box>
            </div>}
            {(user?._id!=UserData?._id) && <div className="mt-2 fw-bold text-danger">
              <h4>Profile Privacy</h4>
              <Box className="d-flex align-items-center flex-row gap-3">
                {UserData?.private ? <h2 className="text-success">Profile is private</h2> : <h2>Profile is open</h2>}
              </Box>
            </div>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileModal;
