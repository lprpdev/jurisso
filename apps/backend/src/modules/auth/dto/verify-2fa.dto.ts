import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Verify2faDto {
  @ApiProperty({ example: '123456', description: 'TOTP code or backup code' })
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  code!: string;

  @ApiPropertyOptional({ description: 'Temporary token from login (for 2FA verification step)' })
  @IsOptional()
  @IsString()
  tempToken?: string;
}
