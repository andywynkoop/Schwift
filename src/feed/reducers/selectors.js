export const selectMessages = state => {
  const { messages } = state.entities;
  const channel = state.ui.activeChannel;
  let messagesArray = Object.values(messages);
  let channelMessagesArray = messagesArray.filter(message => message.channel === channel);
  return channelMessagesArray.sort((msg1, msg2) => {
    if (msg1.createdAt < msg2.createdAt) return -1;
    if (msg1.createdAt > msg2.createdAt) return 1;
    return 0;
  })
}