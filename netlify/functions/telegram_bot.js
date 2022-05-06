require("dotenv").config();

const sendVideoService = require("../../utils/sendVideoService");
const sendMessage = require("../../utils/sendMessage");

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);

    // regex
    const re = new RegExp(
        "^(https://vm.tiktok.com/)|(https://vt.tiktok.com/).*$"
    );
    const isTikTokVideo = re.test(message.text);

    if (!isTikTokVideo) {
        await sendMessage(
            message.chat.id,
            "the text you sent is not tiktok url"
        );
    } else {
        await sendMessage(message.chat.id, "Getting you the video...");
        await sendVideoService({
            chat_id: message.chat.id,
            video_url: message.text.trim(),
        });
    }

    return { statusCode: 200 };
};
