import { IParticipant } from "../entities/participant.interface.js";

export interface ParticipantPort {
    getAll(): Promise<IParticipant[]>;
    create(name: string): Promise<IParticipant>;
    updateName(name: string, newName: string): Promise<IParticipant | null>;
    addWin(name: string): Promise<IParticipant | null>;
}