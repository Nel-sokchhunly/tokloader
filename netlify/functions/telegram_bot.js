require("dotenv").config();

const sendVideoService = require("../../utils/sendVideoService");

video_url = "https://vm.tiktok.com/ZSeQS6B5k/";

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);
    await sendVideoService(message.chat.id, "I got your message!");

    console.log(message);

    return { statusCode: 200 };
};
