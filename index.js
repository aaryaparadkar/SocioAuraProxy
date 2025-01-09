const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.post('/api/v1', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.API}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN}`
            },
            data: {
                input: req.body.input
            }
        })

        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to process request',
            details: error.response?.data || error.message
        });
    }
})