require("dotenv").config();

const sendVideoService = require("../../utils/sendVideoService");
const sendMessage = require("../../utils/sendMessage");

exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);

    if (message && message.text) {
        var TEXT = message.text;

        const re = new RegExp(
            "^(https:\/\/vm.tiktok.com\/)|(https:\/\/vt.tiktok.com\/).*"
        );
        const isTikTokVideo = re.test(TEXT);

        if (TEXT == "/start") {
            await sendMessage(
                message.chat.id,
                "Welcome to the bot. Share me tiktok url to start downloading video!"
            );
            console.log("Response with Start message.")
            return { statusCode: 200 };
        } else if (!isTikTokVideo) {
            await sendMessage(
                message.chat.id,
                "the text you sent is not tiktok url"
            );
            console.log('response with url is not tiktok link')
            return { statusCode: 200 };
        } else {
            await sendMessage(message.chat.id, "Getting you the video...");
            console.log('downloading the video')
            await sendVideoService({
                chat_id: message.chat.id,
                video_url: TEXT,
            });
            return { statusCode: 200 };
        }
    } else {
        console.log("text is undefined");
    }
};
