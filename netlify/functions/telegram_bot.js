const sendVideoService = require("../../utils/sendVideoService");

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);
    await sendVideoService(message.chat.id, "I got your message!");
    return { statusCode: 200 };
};
