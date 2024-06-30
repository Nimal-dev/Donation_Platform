// userController.js
const agentmodels = require('../Models/agentModel');


// exports.sendresourceRequest = async (req, res) => {
//     try {
//         const requestparam = {
//             userid: req.body.userid,
//             resourcerequest: req.body.resourcerequest,
//         };
//         await agentModel.create(requestparam);
//         res.json('success');
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// exports.getResourceRequest = async (req, res) => {
//     try {
//         const resourceRequest = await agentModel.find().populate('userid');
//         res.json(resourceRequest);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };