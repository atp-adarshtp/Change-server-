const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/vms', async (req, res) => {
  try {
    const response = await axios.get('https://46.4.244.15:8006/api2/json/nodes/dceu01p017100/qemu', {
      headers: {
        'CSRFPreventionToken': '67E290A3:Hygfff4i8ZE2SW3JhOTv7xMxS+McirMprz1sloxQ884',
        'Authorization': 'PVEAPIToken=API@pve!C6e4dS3gnP2Jbw6E8Lnq86zH=a2a7026a-8872-4dd4-a427-d60596dcc1b8'
      },
      httpsAgent: new (require('https').Agent)({  
        rejectUnauthorized: false // This is required if the server uses a self-signed certificate
      })
    });

    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;