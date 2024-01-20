import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { OrderManagementService } from './services/order.service';
import { OrderManagementController } from './controllers/order.controller';
import { PaymentController } from './controllers/payment.controller';
import { QuotingController } from './controllers/quoting.controller';
import { PaymentService } from './services/payment.service';
import { QuotingService } from './services/quoting.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './middleware/local.strategy';
import { UserRepository } from './repositories/auth/user-repo/user.repository';
import { Jwtstrategy } from './middleware/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: './src/.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3h' },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_PANTHEON_DATABASE'),
        entities: [User],
        synchronize: true, // Be cautious with this in production
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, OrderManagementController, PaymentController, QuotingController],
  providers: [
    AppService,
    OrderManagementService,
    PaymentService,
    QuotingService,
    LocalStrategy,
    Jwtstrategy,
    UserRepository,
  ],
})
export class AppModule {}
