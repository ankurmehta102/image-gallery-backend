import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'MYSENSE',
      port: 1433,
      username: 'ankur',
      password: 'ankur',
      database: 'imageGallery',
      entities: [User],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
