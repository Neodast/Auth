import { Expose } from 'class-transformer';
import { Roles } from 'src/common/enums/roles.enum';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: Roles;
}
