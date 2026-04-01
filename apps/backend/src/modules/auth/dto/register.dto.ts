import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfession } from '../../../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'jean.dupont@avocat.fr' })
  @IsEmail({}, { message: 'Adresse email invalide' })
  email!: string;

  @ApiProperty({ example: 'MyStr0ng!Pass12', minLength: 12 })
  @IsString()
  @MinLength(12, { message: 'Le mot de passe doit faire au moins 12 caracteres' })
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractere special' },
  )
  password!: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({ enum: UserProfession, example: UserProfession.AVOCAT })
  @IsEnum(UserProfession, { message: 'Profession invalide' })
  profession!: UserProfession;

  @ApiPropertyOptional({ example: 'P1234' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  barNumber?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  acceptsCgu!: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  newsletter?: boolean;
}
