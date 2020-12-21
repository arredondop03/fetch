const axios = require('axios');

const getItems = async (_, res) => {
    try {
        const response = await axios.get('https://fetch-hiring.s3.amazonaws.com/hiring.json');
        res.json(response.data);
    } catch {
        res
            .status(500)
            .json({
                message: 'Oops... something went wrong. Try again later.',
            });
    }
};

module.exports = {
    getItems
};