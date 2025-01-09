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
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN}`
            },
            body: req.body
        })

        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error);
    }
})