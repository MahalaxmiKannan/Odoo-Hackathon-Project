const notificationRepository =
  require(
    "../repositories/notification.repository"
  );

// Get notifications
const getNotificationsByUser =
  async (userId) => {
    return await notificationRepository.getNotificationsByUser(
      userId
    );
  };

// Create notification
const createNotification =
  async (data) => {
    const notificationId =
      await notificationRepository.createNotification(
        data
      );

    return await notificationRepository.findById(
      notificationId
    );
  };

// Mark as read
const markAsRead = async (id) => {
  const notification =
    await notificationRepository.findById(
      id
    );

  if (!notification) {
    throw new Error(
      "Notification not found"
    );
  }

  await notificationRepository.markAsRead(
    id
  );

  return {
    message:
      "Notification marked as read",
  };
};

// Get unread count
const getUnreadCount =
  async (userId) => {
    return {
      unreadCount:
        await notificationRepository.getUnreadCount(
          userId
        ),
    };
  };

module.exports = {
  getNotificationsByUser,
  createNotification,
  markAsRead,
  getUnreadCount,
};