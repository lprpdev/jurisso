import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SearchModule } from './modules/search/search.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { AnnotationsModule } from './modules/annotations/annotations.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { AuditModule } from './modules/audit/audit.module';
import { AppCacheModule } from './modules/cache/cache.module';
import { EmailModule } from './modules/email/email.module';
import { LegifranceModule } from './modules/legifrance/legifrance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: config.get<string>('DB_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    ScheduleModule.forRoot(),
    EmailModule,
    AuthModule,
    UsersModule,
    SearchModule,
    DocumentsModule,
    FavoritesModule,
    CollectionsModule,
    AnnotationsModule,
    AlertsModule,
    AuditModule,
    AppCacheModule,
    LegifranceModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
