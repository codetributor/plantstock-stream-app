import { StreamChat } from 'stream-chat';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API;

let chatClient; 

if(!chatClient) {
    chatClient = new StreamChat.getInstance(apiKey);
}

export { chatClient }