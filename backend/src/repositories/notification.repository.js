const pool = require("../config/db");

// Get notifications by user
const getNotificationsByUser = async (
  userId
) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
    [userId]
  );

  return rows;
};

// Find notification by id
const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM notifications
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

// Create notification
const createNotification = async (
  notification
) => {
  const [result] = await pool.execute(
    `
      INSERT INTO notifications
      (
        user_id,
        title,
        message
      )
      VALUES (?, ?, ?)
    `,
    [
      notification.user_id,
      notification.title,
      notification.message,
    ]
  );

  return result.insertId;
};

// Mark notification as read
const markAsRead = async (id) => {
  await pool.execute(
    `
      UPDATE notifications
      SET is_read = TRUE
      WHERE id = ?
    `,
    [id]
  );
};

// Get unread count
const getUnreadCount = async (
  userId
) => {
  const [[row]] = await pool.execute(
    `
      SELECT COUNT(*) AS count
      FROM notifications
      WHERE user_id = ?
      AND is_read = FALSE
    `,
    [userId]
  );

  return row.count;
};

module.exports = {
  getNotificationsByUser,
  findById,
  createNotification,
  markAsRead,
  getUnreadCount,
};