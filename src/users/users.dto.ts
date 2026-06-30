import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateUserDto {

  @IsString()  
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}