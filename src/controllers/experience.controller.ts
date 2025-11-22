import { Request, Response } from 'express';
import { Experience } from '../models/experience.model';
import mongoose from 'mongoose';

export class ExperienceController {
  // Obtener todas las experiencias de un usuario
  static async getExperiencesByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format',
        });
      }

      const experiences = await Experience.find({ userId })
        .sort({ startDate: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        data: experiences,
        count: experiences.length,
      });
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching experiences',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Obtener una experiencia específica
  static async getExperienceById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid experience ID format',
        });
      }

      const experience = await Experience.findById(id).lean();

      if (!experience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: experience,
      });
    } catch (error) {
      console.error('Error fetching experience:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching experience',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Crear nueva experiencia
  static async createExperience(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const experienceData = req.body;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format',
        });
      }

      // Validaciones básicas
      if (!experienceData.title || !experienceData.company || !experienceData.startDate) {
        return res.status(400).json({
          success: false,
          message: 'Title, company, and start date are required',
        });
      }

      // Si current es true, no debe haber endDate
      if (experienceData.current && experienceData.endDate) {
        experienceData.endDate = null;
      }

      const newExperience = await Experience.create({
        ...experienceData,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: 'Experience created successfully',
        data: newExperience,
      });
    } catch (error) {
      console.error('Error creating experience:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating experience',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Actualizar experiencia
  static async updateExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid experience ID format',
        });
      }

      // Si current es true, eliminar endDate
      if (updateData.current) {
        updateData.endDate = null;
      }

      const updatedExperience = await Experience.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true },
      ).lean();

      if (!updatedExperience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Experience updated successfully',
        data: updatedExperience,
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      return res.status(500).json({
        success: false,
        message: 'Error updating experience',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Eliminar experiencia
  static async deleteExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid experience ID format',
        });
      }

      const deletedExperience = await Experience.findByIdAndDelete(id).lean();

      if (!deletedExperience) {
        return res.status(404).json({
          success: false,
          message: 'Experience not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Experience deleted successfully',
        data: deletedExperience,
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting experience',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Obtener experiencias actuales de un usuario
  static async getCurrentExperiences(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format',
        });
      }

      const currentExperiences = await Experience.find({
        userId,
        current: true,
      })
        .sort({ startDate: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        data: currentExperiences,
        count: currentExperiences.length,
      });
    } catch (error) {
      console.error('Error fetching current experiences:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching current experiences',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}