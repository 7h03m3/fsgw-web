import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), AuthModule, SharedModule, DatabaseModule, ControllerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
