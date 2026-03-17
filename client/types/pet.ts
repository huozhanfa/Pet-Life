export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  avatar: string;
  weight?: string;
  birthday?: string;
  photos?: string[];
}

export interface CreatePetInput {
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: 'male' | 'female';
  weight: string;
  avatar: string;
}
