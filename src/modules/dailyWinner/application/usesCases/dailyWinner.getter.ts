import { IDailyWinner } from "../../domain/entities/dailyWinner.interface.js";
import { DailyWinnerPort } from "../../domain/ports/dailyWinner.port.js";

export class DailyWinnerGetter {
  constructor(
    private readonly repository: DailyWinnerPort
  ) { }

  async getAll(): Promise<IDailyWinner[]> {
    return await this.repository.getAll();
  }

  async getLatest(): Promise<IDailyWinner | null> {
    return await this.repository.getLatest();
  }
}