import { Request, Response } from 'express';

export class ParticipantController {
  public getAll = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'Obtener todos los participantes' });
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: 'Crear participante', data: req.body });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: `Actualizar participante por nombre: ${req.params.nombre}`, data: req.body });
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: `Eliminar participante por nombre: ${req.params.nombre}` });
  };
}