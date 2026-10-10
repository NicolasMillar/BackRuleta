import { IParticipant } from "../../../domain/entities/participant.interface.js";
import { ParticipantPort } from "../../../domain/ports/participants.port.js";
import { ParticipantModel } from "../schemas/participant.schema.js";

export class ParticipantsRepositories implements ParticipantPort {
    async getAll(): Promise<IParticipant[]> {
        return await ParticipantModel.find().lean<IParticipant[]>();
    }

    async create(name: string): Promise<IParticipant> {
        const participant = await ParticipantModel.create({ name, wins: 0 });
        return participant.toObject<IParticipant>();
    }

    async updateName(name: string, newName: string): Promise<IParticipant | null> {
        return await ParticipantModel.findOneAndUpdate(
            { name },
            { name: newName },
            { new: true }
        ).lean<IParticipant | null>();
    }

    async addWin(name: string): Promise<IParticipant | null> {
        return await ParticipantModel.findOneAndUpdate(
            { name },
            { $inc: { wins: 1 } },
            { new: true }
        ).lean<IParticipant | null>();
    }
}