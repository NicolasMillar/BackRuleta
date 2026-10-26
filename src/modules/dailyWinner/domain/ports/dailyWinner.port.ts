import { IDailyWinner } from "../entities/dailyWinner.interface.js";

export interface DailyWinnerPort {
  getAll(): Promise<IDailyWinner[]>;
  getLatest(): Promise<IDailyWinner | null>;
  create(name: string): Promise<IDailyWinner>;
  update(id: string, name: string): Promise<IDailyWinner>;
  deleteAll(): Promise<boolean>;
}