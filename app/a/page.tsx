"use client"

import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { BaseUrl, CUSTOMERKEYS, IpnCall, IpnId, PayCall, Pcallback, SECRETKEYS, callUrl, consumer_key, consumer_secret } from '../constants/cookie';

const PaymentForm = () => {
  
  const [Token,setToken] =useState<any|null>(null)
  const [Apikey,setApikey] = useState<any|null>(null)
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    // accountNumber:'',
    amount: '',
    currency: '',
    // externalId: '',
    // provider: '',
    // additionalProperties: null,
    
  });
  const [currency,setCurrency]=useState("")
  const [amount,setAmount]=useState("")

  const billing_address={
    "country_code": "TZ",
  
            "first_name": "John",
    
            "middle_name": "",
    
            "last_name": "Doe",
   
            "line_1": "Pesapal Limited",
   
            "line_2": "",
    
            "city": "",
    
            "state": "",
    
            "postal_code": "",
    
            "zip_code": ""
    }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const token =await axios.post(`${BaseUrl}`,{
        consumer_key:consumer_key,
        consumer_secret:consumer_secret
      })
      if(token){
      const response = await axios.post(`${PayCall}`,{
        id:CUSTOMERKEYS,
        amount:amount,
        currency:currency,
        callback_url:callUrl,
        notification_id:IpnId,
        description:"Payment",
        redirect_mode:"",
        "billing_address":billing_address
      }, {
        headers: {
          Authorization: 'Bearer ' + token.data.token, 
        }})
      if (response){
        console.log(response.data.redirect_url)
        const iframe = document.createElement('iframe');
          iframe.src = response.data.redirect_url;
          iframe.style.width = '100%';
          iframe.style.height = '600px';
          document.body.appendChild(iframe);
      }
  }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      
      <input type="text" name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount" required /><br/>
      <input type="text" name="currency" value={currency} onChange={(e)=>setCurrency(e.target.value)} placeholder="Currency" required /><br></br>
  


      <button type="submit" disabled={loading}>Submit</button>
      
     </form>
</>
  );
};

export default PaymentForm;