import { Request, Response, NextFunction } from 'express';
import { DailyWinnerRepositories } from '../../../modules/dailyWinner/infrastructure/db/repositories/dailyWinner.repositories.js';
import { DailyWinnerGetter } from '../../../modules/dailyWinner/application/usesCases/dailyWinner.getter.js';
import { DailyWinnerSetter } from '../../../modules/dailyWinner/application/usesCases/dailyWinner.setter.js';

export class DailyWinnerMiddleware {
  public validateDailyWinner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = req.body.name || req.params.name;

      if (!name || typeof name !== 'string' || name.trim() === '') {
        res.status(400).json({ error: 'El nombre debe ser un string valido' });
        return;
      }

      const repository = new DailyWinnerRepositories();
      const getter = new DailyWinnerGetter(repository);
      const setter = new DailyWinnerSetter(repository);

      const latestWinner = await getter.getLatest();

      if (latestWinner) {
        const winnerDate = new Date(latestWinner.date);
        const today = new Date();

        const isSameDay =
          winnerDate.getFullYear() === today.getFullYear() &&
          winnerDate.getMonth() === today.getMonth() &&
          winnerDate.getDate() === today.getDate();

        if (isSameDay) {
          res.status(409).json({
            error: 'Ya existe un ganador registrado para el dia de hoy',
            winner: latestWinner
          });
          return;
        }
      }

      // Si no hay ganador hoy (o es el primero), crea un nuevo registro en el historial
      await setter.create(name.trim());

      next();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error en la validacion del ganador diario';
      res.status(500).json({ error: message });
    }
  };
}