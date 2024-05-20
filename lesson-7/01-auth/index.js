import express from 'express';

import routes from './routes/index.js';

import './db.js';
const app = express();
app.use('/api', routes);
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
// app.listen(8080, () => {
//   console.log('Server started on port 8080');
// });
