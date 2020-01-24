const express = require('express');
const path = require('path');

const app = express();
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'build')));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use(express.json());
app.use(cookieParser());

const users = [];
let userId = 0;

function parseUser(user) {
  const { password, ...userData } = user;
  return userData;
}

app.post('/api/users', (req, res) => {
  const {
    name, password, age, web, email, gender,
  } = req.body;
  const user = {
    name,
    password,
    secret: '',
    id: String(userId),
    age,
    web,
    email,
    gender,
  };
  users.push(user);
  res.json({});
  userId += 1;
});

app.put('/api/users', (req, res) => {
  const {
    name, age, gender, id,
  } = req.body.user;
  const user = users.find((userStored) => userStored.id === id);
  user.name = name;
  user.age = age;
  user.gender = gender;
  res.json({});
});

app.put('/api/users/password-edit', (req, res) => {
  const user = users.find((userStored) => userStored.secret === req.cookies.sessionId);
  console.log(user);
  if (user.password !== req.body.resetPasswordForm.current) {
    res.json({ error: 'password not validation' });
  } else if (user.password === req.body.resetPasswordForm.new) {
    res.json({ error: 'the passwords match' });
  } else if (req.body.resetPasswordForm.new !== req.body.resetPasswordForm.newConfirm) {
    res.json({ error: "the new password doesn't match" });
  } else {
    user.password = req.body.resetPasswordForm.new;
    res.json({});
  }
});

app.get('/api/users', (req, res) => {
  const user = users.find((userStored) => userStored.secret === req.cookies.sessionId);
  console.log(req.cookies.sessionId);
  console.log(user);
  console.log(users);
  if (user) {
    const userPropertiex = parseUser(user);
    res.json(userPropertiex);
  } else {
    res.json({});
  }
});

app.delete('/api/users', (req, res) => {
  const user = users.find((userStored) => userStored.id === req.body.id);
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.json({});
});

app.get('/api/logout', (req, res) => {
  const user = users.find((userStored) => userStored.id === req.query.id);
  user.secret = '';
  res.json({});
});

app.get('/api/time', (req, res) => res.json(new Date().toLocaleTimeString()));

app.post('/api/users/login', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const { name, password } = req.body;
  const user = users.find((userStored) => (userStored.name === name && userStored.password === password));
  user.secret = String(randomNumber);
  console.log(user);
  if (user == null) {
    res.json({ user: '' });
  }
  try {
    if (password === user.password) {
      res.cookie('sessionId', user.secret);
      const userPropertiex = parseUser(user);
      res.json(userPropertiex);
    } else {
      res.json({});
    }
  } catch {
    res.status(500).send({});
  }
});

app.get('/api/news/:page', async (req, res) => {
  const sliceStart = req.params.page * 10;
  const sliceEnd = sliceStart + 10;
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  const responseJson = await response.json();
  const numberOfButton = Math.ceil(responseJson.length / 10);
  const chunkNewsIds = responseJson.slice(sliceStart, sliceEnd);
  const promises = chunkNewsIds.map(async (item) => {
    const responseNews = await fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`);
    const responseJsonNews = await responseNews.json();
    return responseJsonNews;
  });
  const newsResponse = await Promise.all(promises);
  res.json({
    news: newsResponse,
    ids: responseJson,
    numbOfPage: numberOfButton,
  });
});

app.listen(8080);
