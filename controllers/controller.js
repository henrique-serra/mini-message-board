import crypto from 'crypto';
import Database from '../db/queries.js';
import { body, validationResult } from 'express-validator';

const db = new Database();

export const validateMessage = [
  body('text')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ max: 1000 })
    .withMessage('Max characters: 1000')
    .trim(),
  
  body('username')
    .notEmpty()
    .withMessage('Mandatory field')
    .isLength({ max: 100 })
    .withMessage('Max characters: 100)')
    .trim()
];

const deleteMessage = function deleteMessage(id) {
  const messageIndex = messages.findIndex((msg) => msg.id === id);
  return messages.splice(messageIndex, 1);
}

const formatDate = function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} at ${hour}:${minutes}`
}

const formatMessages = function formatMessages(messages) {
  return messages.map(({ id, text, username, added }) => {
    const dateFormatted = formatDate(added);
    return {
      id,
      text,
      username,
      added: dateFormatted
    }
  })
}

export const index = async function index(req, res) {

  const messagesSortedByDate = await db.getAllMessages();
  const messagesFormatted = formatMessages(messagesSortedByDate);

  res.render('index', { title: 'Home', messages: messagesFormatted });
};

export const newMsg = function newMsg(req, res) {
  res.render('new', { title: 'Create New Message' })
}

export const createNewMsg = async function createNewMsg(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    await db.insertMessage(req.body);  
    res.redirect('/');

  } catch (error) {
    console.error('Error posting message: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
}

export const msgDetails = async function msgDetails(req, res) {
  try {
    const message = await db.getMessage(req.params.id);
    const dateFormatted = formatDate(message.added);
    const messageCopy = { ...message, added: dateFormatted }

    res.render('message', { title: 'Message Details', message: messageCopy });
  } catch (err) {
    console.error(err);
    res.status(404).render('404', { title: 'Message not found' });
  }
}

export const deleteMessagePost = async function deleteMessagePost(req, res) {
  try {
    await db.deleteMessage(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(404).render('404', { title: 'Message not found' });
  }
}

export const notFound = function notFound(req, res) {
    res.status(404).render('404', { title: 'Not Found' });
};