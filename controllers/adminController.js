const userModel = require("../models/userModel")

//get donor-list
const getDonorListController = async (req,res)=>{
  try {
    const donorData = await userModel.find({role:"donor"}).sort({createdAt:-1})
    return res.status(200).send({
        success:true,
        totalCount:donorData.length,
        message:"Donor list fetched successfully",
        donorData
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in Donor List API",
        error
    })
  }
}

//get hospital-list
const getHospitalListController = async (req,res)=>{
  try {
    const hositalData = await userModel.find({role:"hospital"}).sort({createdAt:-1})
    return res.status(200).send({
        success:true,
        totalCount:donorData.length,
        message:"Hospital list fetched successfully",
        hositalData
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in Hospital List API",
        error
    })
  }
}

//get org-list
const getOrgListController = async (req,res)=>{
  try {
    const orgData = await userModel.find({role:"organisation"}).sort({createdAt:-1})
    return res.status(200).send({
        success:true,
        totalCount:donorData.length,
        message:"Organisation list fetched successfully",
        orgData
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:"Error in Organisation List API",
        error
    })
  }
}

//delete donor
const deleteDonorController = async (req,res)=>{
   try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success:true,
      message:"Record deleted successfully"
    })
   } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error while deleting donor',
      error
    })
   }
}

module.exports = {getDonorListController,getHospitalListController,getOrgListController,deleteDonorController}