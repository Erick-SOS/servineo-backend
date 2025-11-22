import { Router } from 'express';
import { ExperienceController } from '../../controllers/experience.controller';

const router = Router();


// GET /api/user-profiles/:userId/experiences
// Obtener todas las experiencias de un usuario
router.get('/user-profiles/:userId/experiences', ExperienceController.getExperiencesByUserId);

// GET /api/user-profiles/:userId/experiences/current
// Obtener solo las experiencias actuales de un usuario
router.get(
  '/user-profiles/:userId/experiences/current',
  ExperienceController.getCurrentExperiences,
);

// POST /api/user-profiles/:userId/experiences
// Crear una nueva experiencia para un usuario
router.post('/user-profiles/:userId/experiences', ExperienceController.createExperience);



// GET /api/experiences/:id
// Obtener una experiencia específica por ID
router.get('/experiences/:id', ExperienceController.getExperienceById);

// PUT /api/experiences/:id
// Actualizar una experiencia (reemplazo completo)
router.put('/experiences/:id', ExperienceController.updateExperience);

// PATCH /api/experiences/:id
// Actualizar una experiencia (parcial)
router.patch('/experiences/:id', ExperienceController.updateExperience);

// DELETE /api/experiences/:id
// Eliminar una experiencia
router.delete('/experiences/:id', ExperienceController.deleteExperience);

export default router;