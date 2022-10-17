require('dotenv').config();
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const ejs = require('ejs');
const mail = require('./config/mail');

const morgan = require('./middlewares/morgan');
const swaggerUi = require('swagger-ui-express');
const doc = require('./doc');

const AdminRouter = require('./routes/admin.routes');
const ItemRouter = require('./routes/items.routes');
const SellerRouter = require('./routes/seller.routes');
const errorHandler = require('./middlewares/errHandler');
const chatHandler = require('./socket/chat');

const app = express();
const server = createServer(app);
const io = new Server(server);

const onConnection = (socket) => {
  chatHandler(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(reason, '<<<< Client Disconnected');
  });
}

io.on("connection", onConnection);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc, {
  swaggerOptions: {
    docExpansion: "none"
  }
}));

app.use(morgan);
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));
app.use(express.json());

app.post('/forgot-password', async (req, res, next) => {
  try {
    const html = await ejs.renderFile('./templates/forgot-password.ejs', {});

    await mail.sendMail({
      from: process.env.MAIL_EMAIL,
      to: req.body.email,
      subject: 'Forgot Password',
      html: html
    });

    return res.status(200).json({
      status: 200,
      message: 'Silahkan cek email anda untuk melakukan perubahan password.'
    })
  } catch (err) {
    next(err);
  }
})

app.use('/admin', AdminRouter);
app.use('/seller', SellerRouter);
app.use('/items', ItemRouter);

//  error handler middlerware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT, () => {
    console.log('<<<< SERVER RUNNING ON PORT', process.env.PORT);
  })
}

module.exports = app;