import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'jean.dupont@avocat.fr' })
  @IsEmail({}, { message: 'Adresse email invalide' })
  email!: string;
}
