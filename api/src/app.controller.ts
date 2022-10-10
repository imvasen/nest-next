import { Controller, Get } from '@nestjs/common';

import { AppService } from '@api/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus(): API.AppStatusResponse {
    return this.appService.getStatus();
  }
}
