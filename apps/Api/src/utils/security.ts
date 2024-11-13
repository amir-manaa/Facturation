import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { IDecodeToken } from '../shared/interfaces';

export class Security {
  static generateAccessToken(id: string, email: string, role: number): string {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  static getTokenFromRequest(req: express.Request): string {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return token;
  }

  static decodeToken(req: express.Request): IDecodeToken {
    const token = this.getTokenFromRequest(req);
    return  jwt.verify(token, process.env.JWT_SECRET);
  }

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async matchPassword(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }
}
