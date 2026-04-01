import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token!: string;

  @ApiProperty({ example: 'MyNewStr0ng!Pass12', minLength: 12 })
  @IsString()
  @MinLength(12, { message: 'Le mot de passe doit faire au moins 12 caracteres' })
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractere special' },
  )
  password!: string;
}
