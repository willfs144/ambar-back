import { IsEmail, IsNotEmpty, IsString } from "class-validator";


class CreateUserDto {

  @IsString()  
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsEmail()
  email: string;
}

class UpdateUserDto {
  name?: string;
  email?: string;
}