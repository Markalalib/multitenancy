const editBindMasterService = require("../service/editService");
const editBindMasterController ={
    editBindMasterGrid: async(req,res) => {
        const {tableName,id}=req.params;
        
        try {
            const result = await editBindMasterService.editBindMasterGrid(tableName,id);
            res.status(200).json(result);
        } catch (error) {
            console.error("edit controller error:" , error);
        }
    }
}
module.exports = editBindMasterController;