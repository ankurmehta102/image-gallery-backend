import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mssql',
          host: configService.get('database').host,
          port: configService.get('database').port,
          username: configService.get('database').username,
          password: configService.get('database').password,
          database: configService.get('database').database,
          entities: [User, Image],
          synchronize: true,
          extra: {
            trustServerCertificate: true,
          },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ImagesModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
