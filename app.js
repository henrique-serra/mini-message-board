import 'dotenv/config';
import express from 'express';
import url from 'url';
import path from 'path';
import morgan from 'morgan';
import { index, newMsg, createNewMsg, msgDetails, notFound, deleteMessagePost, validateMessage } from './controllers/controller.js';
import createTable from './db/createTable.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', index);
app.get('/new', newMsg);
app.get('/msgs/:id', msgDetails);
app.post('/new', validateMessage, createNewMsg);
app.post('/msgs/:id/delete', deleteMessagePost);

// 404 page
app.use(notFound);

// server
app.listen(port, (err) => {
  if (err) throw err;
  createTable();
  console.log('Server listening on port ', port);
});