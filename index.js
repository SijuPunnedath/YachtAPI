const express = require('express');
const app = express();
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
//Import Routes
const authRoute =require('./routes/auth');
const postRoute =require('./routes/posts');
const yachtRoute = require('./routes/yachtOperations');
const uploadRoute = require('./routes/fileUpload');
const swaggerDocument = require('./swagger.json');
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
{ 
  useNewUrlParser: true ,
  useUnifiedTopology: true   
},
() => console.log('Cnnected to DB')
);

//Middleware
app.use(express.json());


//Route middlewares

 app.use('/api/user',authRoute);
 app.use('/api/posts',postRoute);
 app.use('/api/yacht',yachtRoute);
 app.use('/api/upload',uploadRoute);
 app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.listen(3000,()=> console.log('Server up and running'));