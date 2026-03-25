// test-cache.controller.ts
import { Controller, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('test-cache')
export class TestCacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async test() {
    // Écrire dans le cache
    await this.cacheManager.set('test_key', 'hello redis', 10000);

    // Lire depuis le cache
    const value = await this.cacheManager.get('test_key');

    return {
      success: true,
      value, // doit retourner "hello redis"
    };
  }
}
