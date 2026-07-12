// const notificationRepository =
//   require(
//     "../repositories/notification.repository"
//   );

// // Get notifications
// const getNotificationsByUser =
//   async (userId) => {
//     return await notificationRepository.getNotificationsByUser(
//       userId
//     );
//   };

// // Create notification
// const createNotification =
//   async (data) => {
//     const notificationId =
//       await notificationRepository.createNotification(
//         data
//       );

//     return await notificationRepository.findById(
//       notificationId
//     );
//   };

// // Mark as read
// const markAsRead = async (id) => {
//   const notification =
//     await notificationRepository.findById(
//       id
//     );

//   if (!notification) {
//     throw new Error(
//       "Notification not found"
//     );
//   }

//   await notificationRepository.markAsRead(
//     id
//   );

//   return {
//     message:
//       "Notification marked as read",
//   };
// };

// // Get unread count
// const getUnreadCount =
//   async (userId) => {
//     return {
//       unreadCount:
//         await notificationRepository.getUnreadCount(
//           userId
//         ),
//     };
//   };

// module.exports = {
//   getNotificationsByUser,
//   createNotification,
//   markAsRead,
//   getUnreadCount,
// };
const notificationRepository = require(
  "../repositories/notification.repository"
);

// Get all notifications
const getAllNotifications = async () => {
  return await notificationRepository.getAllNotifications();
};

// Get notifications by user
const getNotificationsByUser = async (
  userId
) => {
  return await notificationRepository.getNotificationsByUser(
    userId
  );
};

// Create notification
const createNotification = async (
  notification
) => {
  return await notificationRepository.createNotification(
    notification
  );
};

// Mark notification as read
const markAsRead = async (id) => {
  const notification =
    await notificationRepository.findById(id);

  if (!notification) {
    throw new Error("Notification not found");
  }

  await notificationRepository.markAsRead(
    id
  );

  return {
    message: "Notification marked as read",
  };
};

// Get unread notification count
const getUnreadCount = async (
  userId
) => {
  const count =
    await notificationRepository.getUnreadCount(
      userId
    );

  return {
    unreadCount: count,
  };
};

module.exports = {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
  markAsRead,
  getUnreadCount,
};