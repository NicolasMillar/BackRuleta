import { Application } from "express";

export interface IRoutes {
    routes(prefix: string, app: Application): void;
}