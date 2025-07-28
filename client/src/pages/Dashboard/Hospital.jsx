import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import { useEffect } from 'react'
import { useState } from 'react'
import API from '../../services/API'
import moment from 'moment'

const Hospital = () => {
   const[data,setData] = useState([])
      //find hospital records
      const getHospitals = async ()=>{
          try {
              const {data} = await API.get('/inventory/get-hospitals')
              // console.log(data)
              if(data?.success){
                  setData(data?.hospitals)
              }
          } catch (error) {
              console.log(error)
          }
      }
  
      useEffect(()=>{
          getHospitals();
      },[])
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
                           <td>{record.hospitalName }</td>
                           <td>{record.email}</td>
                           <td>{record.phone}</td>
                           <td>{record.address}</td>
                           <td>{moment(record.createdAt).format('DD/MM/YY HH:MM A')}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
     </Layout>
  )
}

export default Hospital