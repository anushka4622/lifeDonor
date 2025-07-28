import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const colors = ['#7B4019','#819A91','#FCEF91','#0ABAB5','#FFA673','#749BC2','#DED3C4','#FEC5F6']
  const [inventoryData,setInventoryData] = useState([])
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      console.log("BloodGroupData", data);
      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getBloodGroupData();
  },[]);

  //get function
  const getBloodRecords = async () => {
      try {
        const { data } = await API.get("/inventory/get-recent-inventory");
        if (data?.success) {
          setInventoryData(data?.inventory);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getBloodRecords();
    }, []);
  return (
    <>
      <Header />
 <div className="d-flex flex-row flex-wrap">
  {data && data.length > 0 ? (
    data.map((record, i) => (
      <div
        className="card m-2 p-1"
        key={i}
        style={{
          width: "18rem",
          backgroundColor: colors[i % colors.length],
        }}
      >
        <div className="card-body">
          <h1 className="card-title bg-light text-dark text-center mb-3">
            {record.bloodGroup}
          </h1>
          <p className="card-text">
            Total In : <b>{record.totalIn}</b> (ML)
          </p>
          <p className="card-text">
            Total Out : <b>{record.totalOut}</b> (ML)
          </p>
        </div>
        <div className="card-footer text-light bg-dark text-center">
          Total Available : <b>{record.availableBlood}</b> (ML)
        </div>
      </div>
    ))
  ) : (
    <p className="m-3">Loading or no data available...</p>
  )}
</div>

      <div className="container mt-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
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
                        {inventoryData?.map((record) => (
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
      </div>
    </>
  );
};

export default Analytics;
