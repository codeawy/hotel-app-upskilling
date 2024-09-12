export interface CreateUserDto {
  name: string;
  email: string;
  isAdmin: boolean;
}

export type UpdateUserDto = Partial<CreateUserDto>;
