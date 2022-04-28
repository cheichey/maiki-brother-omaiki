import { Controller, Get } from '@nestjs/common';

@Controller('/bot')
export class BotController {
  @Get()
  getBot() {
    return 'GET /bot succeed';
  }
}
