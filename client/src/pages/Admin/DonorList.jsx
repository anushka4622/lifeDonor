import React from 'react'
import Layout from "./../../components/Shared/Layout/Layout"
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import API from "../../services/API"

const DonorList = () => {
    const[data,setData] = useState([])
    //find donor records
    const getDonors = async ()=>{
        try {
            const {data} = await API.get('/admin/donor-list')
            // console.log(data)
            if(data?.success){
                setData(data?.donorData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getDonors();
    },[])

    // delete function
    const handleDelete = async (id)=>{
      try {
        let answer = window.prompt('Are you suru you want to delete this donor','Sure')
        if(!answer)return
        const {data} = await API.delete(`/admin/delete-donor/${id}`)
        alert(data?.message)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  return (
   <Layout>
     <table className="table ">
                   <thead>
                     <tr>
                       <th scope="col">Name</th>
                       <th scope="col">Email Address</th>
                       <th scope="col">Phone</th>
                       <th scope="col">Date</th>
                       <th scope='col'>Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {data?.map((record) => (
                       <tr key={record._id}>
                         <td>{record.name || record.organisationName + " (ORG)"}</td>
                         <td>{record.email}</td>
                         <td>{record.phone}</td>
                         <td>{moment(record.createdAt).format('DD/MM/YY HH:MM A')}</td>
                         <td><button className="btn btn-danger" onClick={()=>{handleDelete(record._id)}}>Delete</button></td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
    </Layout>
  )
}

export default DonorList