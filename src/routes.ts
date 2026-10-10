import { IRoutes } from "./common/interface/routes.interface.js";
import { ParticipantController } from "./modules/participants/infrastructure/participant.controller.js";
import { ParticipantRoutes } from "./modules/participants/infrastructure/participant.routes.js";
import { DailyWinnerMiddleware } from "./common/infrastructure/middleware/dailyWinner.middleware.js";

const participantController = new ParticipantController();
const dailyWinnerMiddleware = new DailyWinnerMiddleware();

export const routes: IRoutes[] = [
    new ParticipantRoutes(participantController, dailyWinnerMiddleware)
];