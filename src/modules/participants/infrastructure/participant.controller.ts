import { Request, Response } from 'express';
import { ParticipantsRepositories } from './db/repositories/participants.repositories.js';
import { ParticipantGetter } from '../application/usesCases/participants.getter.js';
import { ParticipantSetter } from '../application/usesCases/participants.setter.js';
import { DailyWinnerRepositories } from '../../dailyWinner/infrastructure/db/repositories/dailyWinner.repositories.js';
import { DailyWinnerSetter } from '../../dailyWinner/application/usesCases/dailyWinner.setter.js';

export class ParticipantController {
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const repository = new ParticipantsRepositories();
      const getter = new ParticipantGetter(repository);

      const participants = await getter.getAll();
      res.status(200).json(participants);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener participantes';
      res.status(500).json({ error: message });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ error: 'El nombre debe ser un string valido' });
        return;
      }

      const repository = new ParticipantsRepositories();
      const setter = new ParticipantSetter(repository);

      const newParticipant = await setter.create(name.trim());
      res.status(201).json(newParticipant);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear participante';
      res.status(500).json({ error: message });
    }
  };

  updateName = async (req: Request, res: Response): Promise<void> => {
    try {
      const paramName = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
      const { newName } = req.body;

      if (!newName || typeof newName !== 'string' || newName.trim() === '') {
        res.status(400).json({ error: 'El nuevo nombre (newName) debe ser un string valido' });
        return;
      }

      const repository = new ParticipantsRepositories();
      const setter = new ParticipantSetter(repository);

      const updatedParticipant = await setter.updateName(paramName, newName.trim());

      if (!updatedParticipant) {
        res.status(404).json({ error: `No se encontro el participante con nombre: ${paramName}` });
        return;
      }

      res.status(200).json(updatedParticipant);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar el nombre del participante';
      res.status(500).json({ error: message });
    }
  };

  registerWin = async (req: Request, res: Response): Promise<void> => {
    try {
      const rawName = req.body.name || req.params.name;
      const name = String(rawName).trim();

      const repository = new ParticipantsRepositories();
      const setter = new ParticipantSetter(repository);

      const updatedParticipant = await setter.addWin(name);

      if (!updatedParticipant) {
        res.status(404).json({ error: `No se encontro el participante con nombre: ${name}` });
        return;
      }

      res.status(200).json({
        message: 'Victoria registrada exitosamente',
        participant: updatedParticipant
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrar victoria del participante';
      res.status(500).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const paramName = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
      const name = String(paramName).trim();

      if (!name) {
        res.status(400).json({ error: 'El nombre del participante es obligatorio' });
        return;
      }

      const repository = new ParticipantsRepositories();
      const setter = new ParticipantSetter(repository);

      const deleted = await setter.delete(name);

      if (!deleted) {
        res.status(404).json({ error: `No se encontro el participante con nombre: ${name}` });
        return;
      }

      res.status(200).json({ message: `Participante '${name}' eliminado exitosamente` });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar participante';
      res.status(500).json({ error: message });
    }
  };

  reset = async (req: Request, res: Response): Promise<void> => {
    try {
      const dailyWinnerRepo = new DailyWinnerRepositories();
      const dailyWinnerSetter = new DailyWinnerSetter(dailyWinnerRepo);
      await dailyWinnerSetter.deleteAll();

      const participantRepo = new ParticipantsRepositories();
      const participantSetter = new ParticipantSetter(participantRepo);
      await participantSetter.resetAllWins();

      res.status(200).json({
        message: 'Reinicio completado con éxito: historial de ganadores eliminado y victorias restablecidas a 0'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al realizar el reinicio';
      res.status(500).json({ error: message });
    }
  };
}