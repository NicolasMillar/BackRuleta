import { IDailyWinner } from "../../../domain/entities/dailyWinner.interface.js";
import { DailyWinnerPort } from "../../../domain/ports/dailyWinner.port.js";
import { DailyWinnerModel } from "../schemas/dailyWinner.schema.js";

export class DailyWinnerRepositories implements DailyWinnerPort {
  async getLatest(): Promise<IDailyWinner | null> {
    return await DailyWinnerModel.findOne().sort({ date: -1 }).lean<IDailyWinner | null>();
  }

  async create(name: string): Promise<IDailyWinner> {
    const winner = await DailyWinnerModel.create({ name, date: new Date() });
    return winner.toObject<IDailyWinner>();
  }

  async update(id: string, name: string): Promise<IDailyWinner> {
    const updated = await DailyWinnerModel.findByIdAndUpdate(
      id,
      { name, date: new Date() },
      { new: true }
    ).lean<IDailyWinner>();

    if (!updated) {
      throw new Error('No se encontró el registro de ganador diario para actualizar');
    }

    return updated;
  }
}