import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UnprocessableEntityException } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
    
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},
    { id: 3, name: 'Juana de arco', email: 'juana.de.arco@example.com'}
  ];

  
  @Get()
  getUsers(): User[] {
    return this.users;
  }


  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number): User {

    const user = this.users.find(user => user.id === id);
    if (!user) {
     throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: { name: string; email: string }): User {
    const { name, email } = createUserDto;
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email
    };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): { message: string } {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
    return { message: 'User deleted successfully' };
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: { name?: string; email?: string }
  ): User {
    if(updateUserDto.email && !updateUserDto.email.includes('@')) {
      throw new UnprocessableEntityException('Invalid email format');
    }
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    else {
      Object.assign(user, updateUserDto);
    }
    return user;
  }  

}
