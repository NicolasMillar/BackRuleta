import { IRoutes } from "./common/interface/routes.interface.js";
import { ParticipantController } from "./modules/participants/infrastructure/participant.controller.js";
import { ParticipantRoutes } from "./modules/participants/infrastructure/participant.routes.js";
import { DailyWinnerMiddleware } from "./common/infrastructure/middleware/dailyWinner.middleware.js";
import { ResetMiddleware } from "./common/infrastructure/middleware/reset.middleware.js";

const participantController = new ParticipantController();
const dailyWinnerMiddleware = new DailyWinnerMiddleware();
const resetMiddleware = new ResetMiddleware();

export const routes: IRoutes[] = [
    new ParticipantRoutes(participantController, dailyWinnerMiddleware, resetMiddleware)
];