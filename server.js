const Express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs');
const app = Express();
const port = 3000;
const routerOrders = require('./src/route/Orders');
const routerItems = require('./src/route/Items');
const routerCustomers = require('./src/route/Customers');
const routerUsers = require('./src/route/Users');


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/order', routerOrders);
app.use('/api/item', routerItems);
app.use('/api/user', routerUsers);
app.use('/api/customer', routerCustomers);

app.listen(port, () => {console.log(`Server is running on port`, port);})

