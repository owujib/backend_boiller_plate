import jwt from 'jsonwebtoken';

class AuthProvider {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  public verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}

export default AuthProvider;
