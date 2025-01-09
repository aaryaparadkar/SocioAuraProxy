const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.post('/api/v1', async (req, res) => {
    try {
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

        // Log the full response structure
        console.log('Full Langflow Response:', JSON.stringify(response.data, null, 2));

        // Extract the response based on Langflow's structure
        let outputText;
        if (response.data && response.data.result && response.data.result.output) {
            outputText = response.data.result.output;
        } else if (response.data && response.data.output) {
            outputText = response.data.output;
        } else if (response.data && response.data.outputs) {
            outputText = response.data.outputs;
        } else if (typeof response.data === 'string') {
            outputText = response.data;
        } else {
            console.log('Unexpected response structure:', response.data);
            outputText = "Unable to parse response";
        }

        // Log the extracted output
        console.log('Extracted output:', outputText);

        res.json({ output: outputText });
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