export class CreateUserDto {
  username: string;
  password: string;
  //'用户角色 1 管理员 2 普通用户'
  role: number;
  nick_name: string;
  avatar: string;
  qq: string;
  ip: string;
}
