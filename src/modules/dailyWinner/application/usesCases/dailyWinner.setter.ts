import { IDailyWinner } from "../../domain/entities/dailyWinner.interface.js";
import { DailyWinnerPort } from "../../domain/ports/dailyWinner.port.js";

export class DailyWinnerSetter {
  constructor(
    private readonly repository: DailyWinnerPort
  ) { }

  async create(name: string): Promise<IDailyWinner> {
    return await this.repository.create(name);
  }

  async update(id: string, name: string): Promise<IDailyWinner> {
    return await this.repository.update(id, name);
  }

  async deleteAll(): Promise<boolean> {
    return await this.repository.deleteAll();
  }
}