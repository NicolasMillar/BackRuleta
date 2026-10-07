import { IRoutes } from "./common/interface/routes.interface.js";
import { ParticipantRoutes } from "./modules/participants/infrastructure/participant.routes.js";

export const routes: IRoutes[] = [
    new ParticipantRoutes()
];