

const admins = require("../Models/adminSchema");


//getting all turfs from db
exports.getallturfs=async(req,res)=>{
    const searchKey=req.query.search
    const query={
      turfname:{$regex:searchKey,$options:"i"}
       
    }
    try{
       const allTurfs=await admins.find(query)
       res.status(200).json(allTurfs)
 
    }catch(err){
      res.status(401).json(err)
    }
   }



   exports.getAturf = async (req, res) => {
    const { id } = req.params; // Access ID from URL parameters
   console.log(id)
    try {
      const turf = await admins.findOne({ _id: id });
      if (!turf) {
        return res.status(404).json({ message: 'Turf not found' });
      }
      res.status(200).json(turf);
    } catch (err) {
      console.error('Error fetching turf:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  