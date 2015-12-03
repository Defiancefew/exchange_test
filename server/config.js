module.exports = (app) => {
    app.use(morgan('dev', {stream: logger}));
    app.use(passport.initialize());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

        next();
    });
};
