import { IParticipant } from "../../domain/entities/participant.interface.js";
import { ParticipantPort } from "../../domain/ports/participants.port.js";

export class ParticipantGetter {
    constructor(
        private readonly repository: ParticipantPort
    ) { }

    async getAll(): Promise<IParticipant[]> {
        const participant = await this.repository.getAll();

        return participant;
    }
}