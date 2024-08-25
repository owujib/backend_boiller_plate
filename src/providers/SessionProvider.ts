import session from 'express-session';

class SessionProvider {
  public static setupSession(app: Express): void {
    app.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Set to true if using HTTPS
      }),
    );
  }
}

export default SessionProvider;
