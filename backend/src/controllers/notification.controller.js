const notificationService = require(
  "../services/notification.service"
);

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications =
      await notificationService.getAllNotifications();

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications =
      await notificationService.getNotificationsByUser(
        userId
      );

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await notificationService.markAsRead(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count =
      await notificationService.getUnreadCount(
        userId
      );

    res.status(200).json({
      success: true,
      data: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};