import React from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { useEffect } from "react";
import { useState } from "react";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Organisation = () => {
  //get current user using use selector hook
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  //find Organisation records
  const getOrg = async () => {
    try {
      if (user?.role === "donor") {
        const { data } = await API.get("/inventory/get-organisation");
        // console.log(data)
        if (data?.success) {
          setData(data?.organisations);
        }
      }

      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
        // console.log(data)
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);
  return (
    <Layout>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YY HH:MM A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Organisation;
