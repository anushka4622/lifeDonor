import React from 'react'
import banner2 from "../../assets/images/banner2.jpg"
import Form from "../../components/Shared/Form/Form";
import { useSelector } from 'react-redux';
import Spinner from '../../components/Shared/Spinner';
import { toast } from "react-toastify";

const Register = () => {
  const {loading,error} = useSelector(state=>state.auth)
  return (
    <>
    {error && toast.error(error)}
    {loading ? <Spinner/> :(
      <div className="min-h-screen  flex">
        <div className="hidden md:flex md:w-2/3 form-banner">
          <img src={banner2} alt="RegisterImage" 
          className="w-full h-full object-cover "/>
        </div>
        <div className="overflow-y-auto form-container">
          <Form formTitle={"Register"} submitBtn={'Register'} formType={"Register"}/>
        </div>
      </div>
    )}   
    </>
  )
}

export default Register