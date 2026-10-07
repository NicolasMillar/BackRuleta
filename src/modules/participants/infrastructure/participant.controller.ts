import { Request, Response } from 'express';
import { ParticipantPort } from '../domain/ports/participants.port.js';

export class ParticipantController {
  constructor(
    private readonly participantRepository: ParticipantPort
  ) { }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const participants = await this.participantRepository.getAll();
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
        res.status(400).json({ error: 'The name must be a valid non-empty string' });
        return;
      }

      const newParticipant = await this.participantRepository.create(name.trim());
      res.status(201).json(newParticipant);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear participante';
      res.status(500).json({ error: message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: `Actualizar participante por nombre: ${req.params.name}`, data: req.body });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: `Eliminar participante por nombre: ${req.params.name}` });
  };
}