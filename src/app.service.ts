import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('localhost:3014');
    return '¡Hola Mundo!';
  }
}

