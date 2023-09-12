import { Nullable } from '../types';

class User {
  id!: string;
  name: Nullable<string>;
  image: Nullable<string>;

  constructor(id: string, name: Nullable<string>, image: Nullable<string>) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

export default User;
