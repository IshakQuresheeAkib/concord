import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hook/useAuth";
import useBiodata from "../../hook/useBiodata";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { enqueueSnackbar } from "notistack";

const CheckoutForm = () => {

    const [error,setError] = useState('')
    const {user} = useAuth();
    const [biodata] = useBiodata();
    const {BiodataId,Name,MobileNumber,ContactEmail} = biodata || {}
    const stripe = useStripe()
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState('')
    const [transactionId,setTransactionId] = useState('')


    useEffect(()=>{
      axiosSecure.post('/create-payment-intent',{price:500})
      .then(res=>{
        setClientSecret(res.data?.clientSecret)
      })
    },[axiosSecure])


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('hello');
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]',error);
            setError(error.message)
        }else{
            console.log('[PaymentMethod]',paymentMethod);
            setError('')
        }
        const {paymentIntent,error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card: card,
            billing_details: {
              name: user?.displayName,
              email: user?.email
            }
          }
        })
        if (confirmError) {
          console.log('confirm error!',confirmError);
        } else{
          console.log('payment intent',paymentIntent);
          if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            console.log('transaction id',paymentIntent.id);
            // save the payment 
            const biodataInfo = {BiodataId,Name,MobileNumber,ContactEmail,Status:'Pending',UserEmail:user?.email}
            axiosSecure.post('/contact-request',biodataInfo)
            .then(res=>{
              console.log(res?.data);
              if (res.data?.insertedId) {
                return enqueueSnackbar('You successfully paid for contact info!',{variant:'success'})
            }
            })
          }
        }
    }

    return (
        <form onSubmit={handleSubmit} className=" px-16 py-10 mt-10 rounded-2xl border border-black/10 font-light">
            <CardElement
            options={{
              style: {
                base: {
                  fontSize: '19px',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            />
            {error && <p className="text-[#FF2511] font-medium text-sm">{error}</p>}
            <button type="submit" disabled={!stripe || !clientSecret} className="hover:bg-white hover:text-teal shadow font-medium mx-auto py-3 mt-10 flex items-center justify-center w-44 text-lg bg-light-teal duration-700 rounded-3xl cursor-pointer" >
              Pay $500
            </button>
            {transactionId && <p className="text-sm text-[#44ff34]">Your Transaction id: {transactionId}</p> }
          </form>
    )
}
export default CheckoutForm;