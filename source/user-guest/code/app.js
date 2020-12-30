const express = require('express');

const app = express();

//Static
app.use('/public', express.static('public'));

//Default body-parser
app.use(express.urlencoded());

require('./middlewares/dbLocal.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/route.mdw')(app);
require('./middlewares/error.mdw')(app);

app.listen(8000, console.log('Server running on port 8000'));

