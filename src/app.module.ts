import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { configuration } from 'config/configuration';
import { AppConfigModule } from './config/app/app-config.module';
import { AuthConfigModule } from './config/auth/auth-config.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseConfigModule } from './config/database/database-config.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    AppConfigModule,
    AuthConfigModule,
    DatabaseModule,
    DatabaseConfigModule,
  ],
})
export class AppModule {}
