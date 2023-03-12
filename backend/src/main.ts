import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('FSGW-API')
      .setDescription('FSGW-API')
      .setVersion('1.0')
      .addTag('fsgw')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('port'));
}

bootstrap();
