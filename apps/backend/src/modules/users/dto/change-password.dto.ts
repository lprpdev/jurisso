import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password' })
  @IsString()
  @MinLength(1)
  currentPassword!: string;

  @ApiProperty({ description: 'New password', minLength: 12 })
  @IsString()
  @MinLength(12, { message: 'Le mot de passe doit faire au moins 12 caracteres' })
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractere special' },
  )
  newPassword!: string;
}
