export const JobName = {
  WELCOME_EMAIL: 'welcome-email',
  RESET_PASSWORD: 'reset-password',
} as const;

export type JobNameType = typeof JobName[keyof typeof JobName];

export interface WelcomeEmailPayload {
  email: string;
  name: string;
}

export interface ResetPasswordPayload {
  email: string;
  resetToken: string;
}

export interface JobPayloadMap {
  [JobName.WELCOME_EMAIL]: WelcomeEmailPayload;
  [JobName.RESET_PASSWORD]: ResetPasswordPayload;
}
