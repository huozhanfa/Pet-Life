import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Pet, CreatePetInput } from '@/types/pet';

const STORAGE_KEY = '@pets_local';
const USE_LOCAL =
  process.env.EXPO_PUBLIC_USE_LOCAL_DATA === '1' ||
  process.env.EXPO_PUBLIC_USE_LOCAL_DATA === 'true' ||
  !process.env.EXPO_PUBLIC_BACKEND_BASE_URL;

const MOCK_PETS: Pet[] = [
  {
    id: 1,
    name: '团子',
    species: '猫',
    breed: '英短',
    age: '2岁',
    gender: 'male',
    avatar: 'https://placekitten.com/400/400',
    weight: '5kg',
  },
  {
    id: 2,
    name: '豆豆',
    species: '狗',
    breed: '金毛',
    age: '1岁',
    gender: 'female',
    avatar: 'https://placedog.net/400/400',
    weight: '12kg',
  },
];

async function getLocalPets(): Promise<Pet[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Pet[];
      return Array.isArray(parsed) ? parsed : MOCK_PETS;
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PETS));
    return MOCK_PETS;
  } catch {
    return MOCK_PETS;
  }
}

async function setLocalPets(pets: Pet[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
}

export async function getPets(): Promise<{ pets: Pet[] }> {
  if (USE_LOCAL) {
    const pets = await getLocalPets();
    return { pets: [...pets].sort((a, b) => b.id - a.id) };
  }
  const base = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;
  const res = await fetch(`${base}/api/v1/pets`);
  const data = await res.json();
  return { pets: data.pets ?? [] };
}

export async function getPetById(id: number): Promise<{ pet: Pet | null }> {
  if (USE_LOCAL) {
    const pets = await getLocalPets();
    const pet = pets.find((p) => p.id === Number(id)) ?? null;
    return { pet };
  }
  const base = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;
  const res = await fetch(`${base}/api/v1/pets/${id}`);
  if (!res.ok) return { pet: null };
  const data = await res.json();
  return { pet: data.pet ?? null };
}

export async function createPet(input: CreatePetInput): Promise<{ pet: Pet }> {
  if (USE_LOCAL) {
    const pets = await getLocalPets();
    const nextId = pets.length ? Math.max(...pets.map((p) => p.id)) + 1 : 1;
    const pet: Pet = {
      id: nextId,
      name: input.name,
      species: input.species,
      breed: input.breed,
      age: input.age,
      gender: input.gender,
      avatar: input.avatar || 'https://placekitten.com/400/400',
      weight: input.weight || undefined,
    };
    pets.push(pet);
    await setLocalPets(pets);
    return { pet };
  }
  const base = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;
  const formData = new FormData();
  formData.append('name', input.name);
  formData.append('species', input.species);
  formData.append('breed', input.breed);
  formData.append('age', input.age);
  formData.append('gender', input.gender);
  formData.append('weight', input.weight);
  if (input.avatar) {
    const { createFormDataFile } = await import('@/utils');
    const file = await createFormDataFile(input.avatar, 'pet_avatar.jpg', 'image/jpeg');
    formData.append('avatar', file as Blob & { uri?: string; name?: string });
  }
  const res = await fetch(`${base}/api/v1/pets`, { method: 'POST', body: formData });
  const data = await res.json();
  return { pet: data.pet };
}
