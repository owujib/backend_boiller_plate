import jwt from 'jsonwebtoken';
declare class AuthProvider {
    private secret;
    constructor(secret: string);
    generateToken(payload: object): string;
    verifyToken(token: string): string | jwt.JwtPayload | null;
}
export default AuthProvider;
