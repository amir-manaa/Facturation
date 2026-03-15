import { Response } from 'express';

export function setRefreshTokenCookie(
  res: Response,
  refreshToken: string
): void {
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.APP_ENV === 'production', // auto selon l'env
    sameSite: 'strict',
    // path: '/auth/refresh',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7j
  });
}
