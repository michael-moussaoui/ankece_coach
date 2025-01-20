const express = require('express');
const bodyParser = require('body-parser');
// const sequelize = require('./config/database');
const sequelize = require('./models/models.index');
const authRoutes = require('./routes/auth.routes');
const passwordRoutes = require('./routes/password.routes');
const seanceRoutes = require('./routes/seance.routes');

const app = express();
const PORT = require('./config/config').port;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/auth', passwordRoutes)
app.use('/seances', seanceRoutes);

sequelize.sync({alter:true})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
