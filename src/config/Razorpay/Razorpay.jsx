import axios from "axios";
import { BASE_URL } from "../../Context/helper";
import { ChatState } from "../../Context/ChatProvider";


export const payNow = async ({ e, user }) => {
    user = JSON.parse(user);
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    console.log(user);
    const amount = '100';
    const userId = user._id || null;
    const order = await axios.post(`${BASE_URL}/api/payment/checkout`, { amount,userId}, config)
    const { data } = await axios.get(`${BASE_URL}/api/payment/get/key`, config);
    console.log("order : ", order);
    console.log("data : ", data);
    if(order.status!=200){
        return;
    }
    var options = {
        key: `${data.key}`,
        amount: amount,
        currency: "INR",
        name: "ChitChat",
        description: "Buy premium",
        image: "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png",
        order_id: `${order.data.orderId}`,
        callback_url: `${BASE_URL}/api/payment/verify`,
        prefill: {
            "name": `${user.name}`,
            "email": `${user.email}`,
            "contact": "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };


    var rzp1 = new window.Razorpay(options);
    rzp1.open();

    e.preventDefault();
}