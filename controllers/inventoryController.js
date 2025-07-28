const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create-inventory
const createInventoryController = async (req, res) => {
  try {
    const { email} = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // if(inventoryType === 'in' && user.role != 'donor'){
    //     throw new Error("Not a donor account")
    // }
    // if(inventoryType === 'out' && user.role != 'hospital'){
    //     throw new Error("Not a hospital")
    // }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.user.bloodGroup;
      const requestedQuantityOfBlood = req.user.quantity;
      const organisation = req.user.userId;
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } 
    else {
      req.body.donor = user?._id;
    }
    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in CREATE INVENTORY API",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.user.userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all inventory",
      error,
    });
  }
};

//get donor records
const getDonorsController = async (req,res)=>{
  try {

    const organisation = req.user.userId

    //find donors
    const donorId = await inventoryModel.distinct("donor",{organisation});

    // console.log(donorId)
    const donors = await userModel.find({_id:{$in:donorId}})

    return res.status(200).send({
      success:true,
      message:"Donor Records Fetched Successfully",
      donors
    })

  } catch (error) {
    console.log(error)
    res.status(500).send(
      {success:false,
      message:"Error in Donor Records",
      error:error.message}
    )
  }
}

const getHospitalsController = async(req,res)=>{
  try {
    const organisation = req.user.userId
    
    //get hospital id
    const hospitalId = await inventoryModel.distinct('hospital',{organisation})

    //find hospital
    const hospitals = await userModel.find({_id:{$in:hospitalId}})

    return res.status(200).send({
      success:true,
      message:"Hopitals Data Fetched Successfully",
      hospitals
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in getting Hospital API"
    })
  }
}

//get org profiles
const getOrganisationController = async (req,res)=>{
 try {
  //get donor id
  const donor = req.user.userId
  const orgId = await inventoryModel.distinct('organisation',{donor})

  //find org
  const organisations = await userModel.find({_id:{$in:orgId}})

  return res.status(200).send({
    success:true,
    message:"Org Data Fetched Successfully",
    organisations
  })

 } catch (error) {
   console.log(error)
   return res.status(500).send({
    success:false,
    message:"Error in ORG API"
   })
 }
}


// get org for hospital
const getOrganisationForHospitalController = async (req,res)=>{
 try {
  //get hospital id
  const hospital = req.user.userId
  const orgId = await inventoryModel.distinct('organisation',{hospital})

  //find org
  const organisations = await userModel.find({_id:{$in:orgId}})

  return res.status(200).send({
    success:true,
    message:"Hospital Org Data Fetched Successfully",
    organisations
  })

 } catch (error) {
   console.log(error)
   return res.status(500).send({
    success:false,
    message:"Error in HOSPITAL ORG API"
   })
 }
}

//get hospital blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get Hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting consumer inventory",
      error,
    });
  }
};

//GET BLOOD RECORDS OF 3
const getRecentInventoryController = async (req,res)=>{
  try {
    const inventory = await inventoryModel.find({
      organisation:req.user.userId
    }).limit(3).sort({createdAt:-1})
    return res.status(200).send({
      success:true,
      message:"Hospital Org Data Fetched Successfully",
      inventory
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
     success:false,
     message:"Error in Recent Inventory API",
     error
    })
  }
}

module.exports = { createInventoryController, getInventoryController,
getDonorsController ,
getHospitalsController,
getOrganisationController,
getOrganisationForHospitalController,
getInventoryHospitalController,
getRecentInventoryController
};
