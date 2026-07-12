const express = require("express");

const router = express.Router();

const notificationController = require(
  "../controllers/notification.controller"
);

// Get all notifications (Admin)
router.get(
  "/",
  notificationController.getAllNotifications
);

// Get notifications of a particular user
router.get(
  "/user/:userId",
  notificationController.getNotificationsByUser
);

// Mark notification as read
router.put(
  "/:id/read",
  notificationController.markAsRead
);

// Get unread notification count
router.get(
  "/user/:userId/unread-count",
  notificationController.getUnreadCount
);

module.exports = router;