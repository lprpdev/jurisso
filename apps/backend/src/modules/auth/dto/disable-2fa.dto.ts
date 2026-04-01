import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Disable2faDto {
  @ApiProperty({ description: 'Current account password' })
  @IsString()
  @MinLength(1)
  password!: string;

  @ApiProperty({ example: '123456', description: 'Current TOTP code' })
  @IsString()
  @MinLength(6)
  code!: string;
}
