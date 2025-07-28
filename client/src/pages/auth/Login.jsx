import React from "react";
import banner1 from "../../assets/images/banner1.jpg";
import Form from "../../components/Shared/Form/Form";
import {useSelector} from 'react-redux'
import Spinner from "../../components/Shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const {loading,error} = useSelector(state => state.auth)
  return (
    <>
    {error && toast.error(error)}
    {loading ? <Spinner/> : (
       <div className="min-h-screen  flex">
        <div className="hidden md:flex md:w-2/3 form-banner">
          <img src={banner1} alt="LoginImage"
          className="w-full h-full object-cover " />
        </div>
        <div className="overflow-y-auto form-container">
          <Form formTitle={"Login"} submitBtn={'Login'} formType={"Login"}/>
        </div>
      </div>
    )}
    </>
  );
};

export default Login;
