import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/Shared/Layout/Layout";
import Modal from "../components/Shared/Modal/Modal";
import API from "../services/API";
import moment from 'moment'

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  //get funtion
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout>
      {user?.role=='admin' && navigate('/admin')}
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i>
              Add Inventory
            </h4>
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity}(ML)</td>
                    <td>{record.email}</td>
                    <td>{moment(record.createdAt).format('DD/MM/YY HH:MM A')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
