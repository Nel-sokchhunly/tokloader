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

    const url = await axios
        .request(options)
        .then(function (response) {
            return response.data.data.play;
        })
        .catch(function (error) {
            console.error(error);
            return "";
        });

    if (url == "") return false;
    await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendVideo`,
        {
            chat_id,
            video: video_url,
        }
    );

    return true;
};
