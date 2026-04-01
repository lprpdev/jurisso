import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'jean.dupont@avocat.fr' })
  @IsEmail({}, { message: 'Adresse email invalide' })
  email!: string;

  @ApiProperty({ example: 'MyStr0ng!Pass12' })
  @IsString()
  @MinLength(1, { message: 'Le mot de passe est requis' })
  password!: string;
}
