import { Router } from 'express';
import multer from 'multer';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { insertPetSchema, updatePetSchema } from '@/storage/database/shared/schema';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

/**
 * GET /api/v1/pets
 * 获取所有宠物列表
 */
router.get('/', async (req, res) => {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
      return res.status(500).json({ error: 'Failed to fetch pets' });
    }

    res.json({ pets: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/v1/pets/:id
 * 获取单个宠物详情
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('pets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching pet:', error);
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json({ pet: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/v1/pets
 * 创建新宠物
 */
router.post('/', upload.single('avatar'), async (req, res) => {
  try {
    const client = getSupabaseClient();
    const petData = {
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed || null,
      age: req.body.age || null,
      gender: req.body.gender || 'male',
      weight: req.body.weight || null,
      avatar: req.body.avatar || null,
      photos: req.body.photos || null,
    };

    // 验证数据
    const validatedData = insertPetSchema.parse(petData);

    const { data, error } = await client
      .from('pets')
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error('Error creating pet:', error);
      return res.status(500).json({ error: 'Failed to create pet' });
    }

    res.status(201).json({ pet: data });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data', details: error });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/v1/pets/:id
 * 更新宠物信息
 */
router.put('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();

    const petData: any = {};
    if (req.body.name) petData.name = req.body.name;
    if (req.body.species) petData.species = req.body.species;
    if (req.body.breed !== undefined) petData.breed = req.body.breed || null;
    if (req.body.age !== undefined) petData.age = req.body.age || null;
    if (req.body.gender) petData.gender = req.body.gender;
    if (req.body.weight !== undefined) petData.weight = req.body.weight || null;
    if (req.body.avatar !== undefined) petData.avatar = req.body.avatar || null;
    if (req.body.photos !== undefined) petData.photos = req.body.photos || null;
    petData.updated_at = new Date().toISOString();

    const validatedData = updatePetSchema.parse(petData);

    const { data, error } = await client
      .from('pets')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pet:', error);
      return res.status(500).json({ error: 'Failed to update pet' });
    }

    res.json({ pet: data });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ error: 'Invalid data', details: error });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/v1/pets/:id
 * 删除宠物
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();

    const { error } = await client
      .from('pets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pet:', error);
      return res.status(500).json({ error: 'Failed to delete pet' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
