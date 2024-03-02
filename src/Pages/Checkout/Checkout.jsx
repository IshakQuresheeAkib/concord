import Heading from "../../Components/Heading/Heading";
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Checkout = () => {
    
    return (
        <div className="max-w-3xl mx-auto ">
            <Heading>Checkout</Heading>
                <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </div>
    )}
export default Checkout;