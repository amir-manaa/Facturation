import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  private readonly hashOptions = {
    type: argon2.argon2id,
    memoryCost: 19456, // 19 MiB
    timeCost: 2, // 2 itérations
    parallelism: 1, // 1 thread
  };

  async hash(password: string): Promise<string> {
    return argon2.hash(password, this.hashOptions);
  }

  async verify(hash: string, plainPassword: string): Promise<boolean> {
    return argon2.verify(hash, plainPassword);
  }
}
