// userController.js
const agentmodels = require('../Models/agentModel');


exports.getAgentProfile = async (req, res) => {
    try {
        const agentDetails = await agentmodels
            .findOne({ authid: req.params.id })
            .populate("authid");

        if (!agentDetails) {
            return res.status(404).json({ message: "Agent not found" });
        }

        res.json({ agent: agentDetails });
    } catch (error) {
        console.error("Error fetching agent profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// exports.getResourceRequest = async (req, res) => {
//     try {
//         const resourceRequest = await agentModel.find().populate('userid');
//         res.json(resourceRequest);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
