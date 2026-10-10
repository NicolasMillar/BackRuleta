import { Request, Response, NextFunction } from 'express';
import { ParticipantsRepositories } from '../../../modules/participants/infrastructure/db/repositories/participants.repositories.js';
import { ParticipantGetter } from '../../../modules/participants/application/usesCases/participants.getter.js';
import { DailyWinnerRepositories } from '../../../modules/dailyWinner/infrastructure/db/repositories/dailyWinner.repositories.js';
import { DailyWinnerGetter } from '../../../modules/dailyWinner/application/usesCases/dailyWinner.getter.js';

export class ResetMiddleware {
  public validateReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const participantRepository = new ParticipantsRepositories();
      const participantGetter = new ParticipantGetter(participantRepository);
      const hasWins = await participantGetter.hasParticipantWithWins();

      if (!hasWins) {
        res.status(400).json({
          error: 'No se puede reiniciar: no existe ningun participante con victorias registradas'
        });
        return;
      }

      const dailyWinnerRepository = new DailyWinnerRepositories();
      const dailyWinnerGetter = new DailyWinnerGetter(dailyWinnerRepository);
      const latestWinner = await dailyWinnerGetter.getLatest();

      if (!latestWinner) {
        res.status(400).json({
          error: 'No se puede reiniciar: no existe ningun registro en el historial de ganadores diarios'
        });
        return;
      }

      next();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error en la validacion de reinicio';
      res.status(500).json({ error: message });
    }
  };
}