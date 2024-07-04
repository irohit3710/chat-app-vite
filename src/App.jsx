import "./App.css";
import Homepage from "./Pages/Homepage";
import { Navigate, Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import ForgotPassword from "./components/miscellaneous/ForgotPassword";
import PricingTable from "./Pages/PricingTable";
import {Routes} from 'react-router-dom'
import ResetPassword from "./components/miscellaneous/ResetPassword";
import PaymentSuccess from "./components/PaymentStatus/PaymentSuccess";
import PaymentFailure from "./components/PaymentStatus/PaymentFailure";
import { ChatState } from "./Context/ChatProvider";
import Meeting from "./components/Meeting/Meeting";
import JoinMeet from "./components/Meeting/JoinMeet";
import ThankYou from "./components/Meeting/ThankYou";
import Test from "./components/VideoChat/Test";

const PrivateRoute = ({children}) => {
  const {authenticated} = ChatState();
  return authenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/chats" element={<PrivateRoute><Chatpage /></PrivateRoute>} />
        <Route path="/forgotPassword" element={<PrivateRoute><ForgotPassword /> </PrivateRoute>} />
        <Route path="/reset-password/:userid/:token" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
        <Route path='/pricing' element={<PrivateRoute><PricingTable /></PrivateRoute>} />
        <Route path='/payment/success/:Id' element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
        <Route path='/payment/failure/:Id' element={<PrivateRoute><PaymentFailure /></PrivateRoute>} />
        <Route path='/ne/meeting/:meetingId' element={<PrivateRoute><Meeting /></PrivateRoute>} />
        <Route path='/ex/meeting/:meetingId' element={<PrivateRoute><JoinMeet /></PrivateRoute>} />
        <Route path='/meeting/thank' element={<ThankYou />}/>
        {/* <Route path='/video/test' element={<Test />}/> */}
        {/* <Route path='/' element={<Router/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
