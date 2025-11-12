const editBindMasterRepo = require("../repository/editRepository");
const editBindMasterService = {
    editBindMasterGrid : async (tableName, id)=>{
        try {
            const  result = await editBindMasterRepo.editBindMasterGrid(tableName, id);
            return result;
        } catch (error) {
            console.error("❌ Service Error (editBindMasterGrid):", error);
        }

    }
}
module.exports = editBindMasterService;