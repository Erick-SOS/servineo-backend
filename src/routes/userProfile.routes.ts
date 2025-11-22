import { Router } from 'express';
import {
  createUserProfile,
  getUserProfiles,
  updateBio,
  getUsersByRole,
  convertToFixer,
  getUserProfileById 
} from '../controllers/userProfile.controller';

const router = Router();

router.post('/', createUserProfile);
router.get('/', getUserProfiles);

// Obtener usuarios por rol
router.get('/role/:role', getUsersByRole);

// Editar bio
router.patch('/:id/bio', updateBio);
// Convertir a fixer (actualizar profile)
router.patch('/:id/convert-fixer', convertToFixer)
//obtener usuario por id
router.get('/:id', getUserProfileById);

// Convertir a fixer (actualizar profile)
router.patch('/:id/convert-fixer', convertToFixer);

export default router;

