import { Application } from "express";
import { IRoutes } from "../../../common/interface/routes.interface.js";
import { DailyWinnerController } from "./dailyWinner.controller.js";

export class DailyWinnerRoutes implements IRoutes {
  constructor(
    private readonly controller: DailyWinnerController
  ) {}

  public routes(prefix: string, app: Application): void {
    app.get(`${prefix}daily-winner`, this.controller.getAll);
    app.get(`${prefix}daily-winner/latest`, this.controller.getLatest);
  }
}

