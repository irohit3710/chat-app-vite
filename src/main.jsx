import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter, Router } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Notifications } from 'react-push-notification';
import InternetConnection from "./components/InternetConnection/InternetConnection";


Router
ReactDOM.render(
  <GoogleOAuthProvider clientId="762113155979-9t0a6rnpr6fbd5da5jl7qmjaksb3lj6j.apps.googleusercontent.com">
    <ChakraProvider>
      <BrowserRouter>
        <ChatProvider>
          <Notifications/>
          <App />
          {/* <InternetConnection /> */}
        </ChatProvider>
      </BrowserRouter>
    </ChakraProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
