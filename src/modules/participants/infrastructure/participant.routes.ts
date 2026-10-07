import { Application } from "express";
import { IRoutes } from "../../../common/interface/routes.interface.js";
import { ParticipantController } from "./participant.controller.js";

export class ParticipantRoutes implements IRoutes {
    public controller: ParticipantController = new ParticipantController();

    constructor() {}

    public routes(prefix: string, app: Application): void {
        app.get(`${prefix}participants`, this.controller.getAll);
        app.post(`${prefix}participants`, this.controller.create);
        app.put(`${prefix}participants/:nombre`, this.controller.update);
        app.delete(`${prefix}participants/:nombre`, this.controller.delete);
    }
}