import { IParticipant } from "../../domain/entities/participant.interface.js";
import { ParticipantPort } from "../../domain/ports/participants.port.js";

export class ParticipantSetter {
    constructor(
        private readonly repository: ParticipantPort
    ) { }

    async create(name: string): Promise<IParticipant> {
        return await this.repository.create(name);
    }

    async updateName(name: string, newName: string): Promise<IParticipant | null> {
        return await this.repository.updateName(name, newName);
    }

    async addWin(name: string): Promise<IParticipant | null> {
        return await this.repository.addWin(name);
    }

    async delete(name: string): Promise<boolean> {
        return await this.repository.delete(name);
    }
}