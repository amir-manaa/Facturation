import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class Security {

  public generateAccessToken(id: string, role: number): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  };

  public matchPassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}