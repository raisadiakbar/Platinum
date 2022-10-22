require('dotenv').config();
const Express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');


const routerOrders = require('./src/route/Orders');
const routerItems = require('./src/route/Items');
const routerCustomers = require('./src/route/Customers');
const routerAdmin = require('./src/route/Admins');
const routerSellers = require('./src/route/Sellers');
const errorHandler = require('./middleware/errHandler');

const app = Express();
const server = createServer(app);
const io = new Server(server);

const chatHandler = require('./socket/chat');

const onConnection = (socket) => {
    console.log('New connection: ', socket);
    chatHandler(io, socket);

    socket.on('disconnect', (reason) => {
        console.log(reason, 'Client disconnected');
    })
}

io.on("connection", onConnection);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc');
const passport = require('./helpers/passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('./middleware/morgan');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan);
app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
}))
app.use(Express.json());
app.use(Express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        docExpansion: 'none'
    }
}));

app.use('/api/order', routerOrders);
app.use('/api/item', routerItems);
app.use('/api/admin', routerAdmin);
app.use('/api/customer', routerCustomers);
app.use('/api/seller', routerSellers);

// err handler middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT, () => {
      console.log('<<<< SERVER RUNNING ON PORT', process.env.PORT);
    })
  }
module.exports = app;