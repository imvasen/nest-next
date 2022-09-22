import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): API.AppStatusResponse {
    return { status: 'OK' };
  }
}
