import crypto from 'crypto';

const createId = function createId() {
  return crypto.randomBytes(16).toString('hex');
}

const messages = [
  {
    id: createId(),
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: createId(),
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
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
  return messages.map(({ id, text, user, added }) => {
    const dateFormatted = formatDate(added);
    return {
      id,
      text,
      user,
      added: dateFormatted
    }
  })
}

export const index = function index(req, res) {

  const messagesSortedByDate = messages.sort((a, b) => new Date(b.added) - new Date(a.added));
  const messagesCopy = formatMessages(messagesSortedByDate);

  res.render('index', { title: 'Home', messages: messagesCopy });
};

export const newMsg = function newMsg(req, res) {
  res.render('new', { title: 'Create New Message' })
}

export const createNewMsg = function createNewMsg(req, res) {
  const { user, text } = req.body;
  console.log(req.body);
  messages.push({
    id: createId(),
    text,
    user,
    added: new Date()
  });
  res.redirect('/');
}

export const msgDetails = function msgDetails(req, res) {
  try {
    const message = messages.find((msg) => msg.id === req.params.id);
    const dateFormatted = formatDate(message.added);
    const messageCopy = { ...message, added: dateFormatted }

    res.render('message', { title: 'Message Details', message: messageCopy });
  } catch (err) {
    console.error(err);
    res.status(404).render('404', { title: 'Message not found' });
  }
}

export const deleteMessagePost = function deleteMessagePost(req, res) {
  try {
    deleteMessage(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(404).render('404', { title: 'Message not found' });
  }
}

export const notFound = function notFound(req, res) {
    res.status(404).render('404', { title: 'Not Found' });
};