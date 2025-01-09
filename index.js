const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.post('/api/v1', async (req, res) => {
    try {
        // Transform the request to match Langflow's expected format
        const langflowRequest = {
            input_value: req.body.input,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
                "ChatInput-kVkQt": {},
                "ParseData-hj8Sc": {},
                "Prompt-h6bMw": {},
                "SplitText-AV8Wn": {},
                "ChatOutput-EpSVR": {},
                "AstraDB-UtQfs": {},
                "AstraDB-JQxQg": {},
                "File-vug9F": {},
                "NVIDIAModelComponent-W6KpH": {}
            }
        };

        const response = await axios.post(`${process.env.API}`, langflowRequest, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN}`
            }
        });

        // Transform the response to match what your frontend expects
        const transformedResponse = {
            output: response.data.output || response.data.result || response.data
        };

        res.json(transformedResponse);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to process request',
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});