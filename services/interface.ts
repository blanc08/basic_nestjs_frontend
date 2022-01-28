export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  description: string;
  user?: {
    username: string;
  };
}
