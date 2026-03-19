import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [LeaderboardGateway],
  exports: [LeaderboardGateway],
})
export class LeaderboardModule {}
