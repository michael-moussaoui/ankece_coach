const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const sequelize = require('./config/database');
const sequelize = require('./models/models.index');
const authRoutes = require('./routes/auth.routes');
const passwordRoutes = require('./routes/password.routes');
const seanceRoutes = require('./routes/seance.routes');
const uploadRoutes = require('./routes/upload.routes');
const fileRoutes = require('./routes/file.routes');

const app = express();
const PORT = require('./config/config').port;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/auth', passwordRoutes)
app.use('/seances', seanceRoutes);
app.use('/files', uploadRoutes);
app.use('/file', fileRoutes);




sequelize.sync({alter:true})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
