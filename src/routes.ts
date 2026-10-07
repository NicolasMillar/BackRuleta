import { IRoutes } from "./common/interface/routes.interface.js";
import { ParticipantPort } from "./modules/participants/domain/ports/participants.port.js";
import { ParticipantController } from "./modules/participants/infrastructure/participant.controller.js";
import { ParticipantRoutes } from "./modules/participants/infrastructure/participant.routes.js";
import { ParticipantsRepositories } from "./modules/participants/infrastructure/db/repositories/participants.repositories.js";

const participantsRepository: ParticipantPort = new ParticipantsRepositories();
const participantController = new ParticipantController(participantsRepository);

export const routes: IRoutes[] = [
    new ParticipantRoutes(participantController)
];