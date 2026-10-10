import { Application } from "express";
import { IRoutes } from "../../../common/interface/routes.interface.js";
import { ParticipantController } from "./participant.controller.js";
import { DailyWinnerMiddleware } from "../../../common/infrastructure/middleware/dailyWinner.middleware.js";
import { ResetMiddleware } from "../../../common/infrastructure/middleware/reset.middleware.js";

export class ParticipantRoutes implements IRoutes {

    constructor(
        private readonly controller: ParticipantController,
        private readonly dailyWinnerMiddleware: DailyWinnerMiddleware,
        private readonly resetMiddleware: ResetMiddleware
    ) { }

    public routes(prefix: string, app: Application): void {
        app.get(`${prefix}participants`, this.controller.getAll);
        app.post(`${prefix}participants`, this.controller.create);
        app.put(`${prefix}participants/:name`, this.controller.updateName);
        app.post(`${prefix}participants/win`, this.dailyWinnerMiddleware.validateDailyWinner, this.controller.registerWin);
        app.post(`${prefix}participants/reset`, this.resetMiddleware.validateReset, this.controller.reset);
        app.delete(`${prefix}participants/:name`, this.controller.delete);
    }
}