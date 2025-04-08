import { faker } from '@faker-js/faker/';
import { Role } from 'src/users/enums/role.enum';
import { User } from 'src/users/user.entity';
import { setSeederFactory } from 'typeorm-extension';


export const UserFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email({ provider: 'gmaill.com' });
  user.password = faker.internet.password({ length: 8, memorable: true });
  user.phone_number = faker.phone.number();

  const roles: Role[] = [
    Role.DIRECTOR,
    Role.HEAD_STATIONS,
    Role.STATION_STAFF,
    Role.INSPECTOR,
    Role.ADMIN,
  ];
  user.role = faker.helpers.arrayElement(roles);

  return user;
});
