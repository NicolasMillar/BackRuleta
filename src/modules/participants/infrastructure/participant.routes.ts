import { Application } from "express";
import { IRoutes } from "../../../common/interface/routes.interface.js";
import { ParticipantController } from "./participant.controller.js";

export class ParticipantRoutes implements IRoutes {

    constructor(
        private readonly controller: ParticipantController
    ) { }

    public routes(prefix: string, app: Application): void {
        app.get(`${prefix}participants`, this.controller.getAll);
        app.post(`${prefix}participants`, this.controller.create);
        app.put(`${prefix}participants/:name`, this.controller.update);
        app.delete(`${prefix}participants/:name`, this.controller.delete);
    }
}