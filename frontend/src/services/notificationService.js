import api from './api';

export const getAllNotifications = async () => {
	const res = await api.get('/notifications');
	return res.data.data || [];
};

export const getNotificationsByUser = async (userId) => {
	const res = await api.get(`/notifications/user/${userId}`);
	return res.data.data || [];
};

export const markAsRead = async (id) => {
	const res = await api.put(`/notifications/${id}/read`);
	return res.data.data;
};

export const getUnreadCount = async (userId) => {
	const res = await api.get(`/notifications/user/${userId}/unread-count`);
	return res.data.data?.count ?? 0;
};

export default { getAllNotifications, getNotificationsByUser, markAsRead, getUnreadCount };
