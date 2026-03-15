import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES, ErrorCodes } from './error-codes';

export interface HttpErrorDefinition {
  code: ErrorCodes;
  status: HttpStatus;
  message: string;
}

export const HTTP_ERROR_CATALOG: Record<ErrorCodes, HttpErrorDefinition> = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: {
    code: ERROR_CODES.AUTH_INVALID_CREDENTIALS,
    status: HttpStatus.UNAUTHORIZED,
    message: 'Email ou mot de passe invalide.',
  },
  [ERROR_CODES.AUTH_UNAUTHORIZED]: {
    code: ERROR_CODES.AUTH_UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    message: 'Vous devez être authentifié.',
  },
  [ERROR_CODES.USER_NOT_FOUND]: {
    code: ERROR_CODES.USER_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    message: 'Utilisateur introuvable.',
  },
  [ERROR_CODES.USERS_NOT_FOUND]: {
    code: ERROR_CODES.USERS_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    message: 'Liste des utilisateurs est vide.',
  },
  [ERROR_CODES.USER_ALREADY_EXISTS]: {
    code: ERROR_CODES.USER_ALREADY_EXISTS,
    status: HttpStatus.CONFLICT,
    message: 'Cet utilisateur existe déjà.',
  },
  [ERROR_CODES.VALIDATION_ERROR]: {
    code: ERROR_CODES.VALIDATION_ERROR,
    status: HttpStatus.BAD_REQUEST,
    message: 'Les données envoyées sont invalides.',
  },
  [ERROR_CODES.INTERNAL_SERVER_ERROR]: {
    code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Une erreur interne est survenue.',
  },
  [ERROR_CODES.REFRESH_TOKEN_INVALID_OR_EXPIRED]: {
    code: ERROR_CODES.REFRESH_TOKEN_INVALID_OR_EXPIRED,
    status: HttpStatus.UNAUTHORIZED,
    message: 'Le token est invalide ou a expiré..',
  },
};
