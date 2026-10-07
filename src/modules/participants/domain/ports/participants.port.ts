import { IParticipant } from "../entities/participant.interface.js";

export interface ParticipantPort {
    getAll(): Promise<IParticipant[]>;
    create(name: string): Promise<IParticipant>;
}