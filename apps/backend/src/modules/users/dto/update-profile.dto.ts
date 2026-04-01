import { IsString, IsEnum, IsBoolean, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfession } from '../../../entities/user.entity';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jean' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Dupont' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ enum: UserProfession })
  @IsOptional()
  @IsEnum(UserProfession)
  profession?: UserProfession;

  @ApiPropertyOptional({ example: 'P1234' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  barNumber?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  newsletter?: boolean;
}
