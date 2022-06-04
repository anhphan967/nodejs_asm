const express = require('express');
const app = express();

const port = 3001;
const router = require('./router/index');
const db = require('./config/db');
const Staff = require('./models/staff');
const session = require('express-session');
const csrf = require('csurf');
const mongodbStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const flash = require('connect-flash');
const path = require('path')

const MONGODB_URI = 'mongodb+srv://asm2:batho123@cluster0.jvmuo.mongodb.net/';
;

// Connect to MongoDB
db();

// Set static: public
app.use(express.static('public'));

// HTTP logger
// app.use(morgan('combined'));

// Parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// save session
const store = new mongodbStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store,
  })
);
// Set static: public:

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

// Token
const csrfProtection = csrf();
app.use(csrfProtection);

// set token, authenticated
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Add staff in request
app.use((req, res, next) => {
  if (!req.session.staff) {
    res.locals.account = false;
    return next();
  }
  Staff.findById(req.session.staff._id)
    .then((staff) => {
      if (!staff) {
        return next();
      }
      req.staff = staff;
      res.locals.loggedIn = true;
      res.locals.auth = staff;
      if (staff.account == 'admin') {
        res.locals.account = 'admin'
        return next()
      }
      res.locals.account = 'staff'
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Init router
router(app);

app.listen(process.env.PORT || port, () => {
  console.log(`App running at http://localhost:${port}`);
});
