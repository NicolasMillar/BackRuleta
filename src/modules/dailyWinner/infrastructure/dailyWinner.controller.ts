import { Request, Response } from 'express';
import { DailyWinnerRepositories } from './db/repositories/dailyWinner.repositories.js';
import { DailyWinnerGetter } from '../application/usesCases/dailyWinner.getter.js';

export class DailyWinnerController {
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const repository = new DailyWinnerRepositories();
      const getter = new DailyWinnerGetter(repository);

      const winners = await getter.getAll();
      res.status(200).json(winners);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener el historial de ganadores diarios';
      res.status(500).json({ error: message });
    }
  };

  getLatest = async (req: Request, res: Response): Promise<void> => {
    try {
      const repository = new DailyWinnerRepositories();
      const getter = new DailyWinnerGetter(repository);

      const latest = await getter.getLatest();
      res.status(200).json(latest);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al obtener el último ganador diario';
      res.status(500).json({ error: message });
    }
  };
}

