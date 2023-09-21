import {
  HTTP_CLIENT_FOR_CHAT,
  HTTP_CLIENT,
} from "@component/utills/axiosClient";

interface Message {
  id: number | string;
  message: string;
}

export const getChatRooms = async (page: any) => {
  return await HTTP_CLIENT_FOR_CHAT.get(`/chat/rooms?page=${page}&limit=10`);
};
export const getChatRoomsUnreadMessages = async (page: any, userId: string) => {
  return await HTTP_CLIENT_FOR_CHAT.get(
    `/chat/rooms/unread/messages?userId=${userId}&page=${page}&limit=10`
  );
};

export const getChatRoomMessages = async ({ chatRoomId, page, userId }) => {
  return await HTTP_CLIENT_FOR_CHAT.get(
    `/chat/room/messages?chatRoomId=${chatRoomId}&page=${page}&limit=10&userId=${userId}`
  );
};

export const deleteChatRoom = async ({ chatRoomId, userId }) => {
  return await HTTP_CLIENT_FOR_CHAT.delete(
    `/chat/room/delete?chatRoomId=${chatRoomId}&userId=${userId}`
  );
};

export const getChats = async ({ userId }) => {
  return await HTTP_CLIENT_FOR_CHAT.get(`/chat/get-chat/${userId}`);
};

export const saveChat = async ({ message, sender, recipient }) => {
  return await HTTP_CLIENT_FOR_CHAT.post(`/chat/save-chat`, {
    message,
    sender,
    recipient,
  });
};

export const getNotification = async () => {
  return await HTTP_CLIENT_FOR_CHAT.get(`/notification`);
};

export const SearchUsers = async ({ searchInput }) => {
  return await HTTP_CLIENT.get(`/user/search-user?fullName=${searchInput}`);
};

export const createRoom = async (data: any) => {
  return await HTTP_CLIENT_FOR_CHAT.post(`/chat/room/create`, data);
};

export const handleUpload = async (data: any) => {
  return await HTTP_CLIENT_FOR_CHAT.post(`/chat/upload-image`, data);
};

export const deleteChat = async ({ chatId }) => {
  return await HTTP_CLIENT_FOR_CHAT.delete(`/chat/message/delete/${chatId}`);
};

export const deleteChatMedia = async ({ chatId, key }) => {
  return await HTTP_CLIENT_FOR_CHAT.delete(
    `/chat/delete-image?chatId=${chatId}&key=${key}`
  );
};

export const getNotificationsApi = async ({ userId }) => {
  return await HTTP_CLIENT_FOR_CHAT.get(
    `/chat/rooms/unread/messages?userId=${userId}`
  );
};
