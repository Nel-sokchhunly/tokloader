const sendMessage = require("./sendMessage");

const axios = require("axios").default;

module.exports = async ({ chat_id, video_url }) => {
    // getting video url

    const options = {
        method: "GET",
        url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
        params: { url: video_url, hd: "0" },
        headers: {
            "X-RapidAPI-Host": "tiktok-video-no-watermark2.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.RAPID_API_TOKEN,
        },
    };

    const result = await axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
            return "";
        });

    if (result.data.play == "") {
        sendMessage(chat_id, "The url is broken. Please try another link!");
        return false;
    }
    axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendVideo`,
        {
            chat_id,
            video: result.data.play,
            supports_streaming: true,
        }
    );

    return true;
};