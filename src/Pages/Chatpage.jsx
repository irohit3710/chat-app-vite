import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import Joyride from "react-joyride";
import { customStyles, handleJoyrideCallback, steps } from "../components/Helper/joyRideHelper";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user,themeValue } = ChatState();
  const [run, setRun] = useState(true);

  useEffect(() => {
    const isTourCompleted = localStorage.getItem('joyride-tour-completed');
    console.log("first  ; ",isTourCompleted);
    if (isTourCompleted=='true') {
      setRun(false);
    }
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={(e)=>{handleJoyrideCallback(e,setRun)}}
        styles={customStyles}
        disableCloseOnEsc={true}
        disableOverlayClose = {true}
      />
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" bg={themeValue ? 'gray.900' : "orange.300"}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
