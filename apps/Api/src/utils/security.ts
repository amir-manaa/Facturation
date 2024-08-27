import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class Security {

  static generateAccessToken(email: string, role: number): string {
    return jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  };

  static async matchPassword(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}