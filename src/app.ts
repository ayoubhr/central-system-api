import "reflect-metadata"
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import dbConnection from "./api/infrastructure/config/database.js"
import RouteTable from './api/infrastructure/RouteTable.js'
import { container } from "tsyringe"
import { OrganizationRepository } from "./api/application/RepositoryImpl/organization.repository.js"
import { OrganizationService } from "./api/application/services/organization.service.js"
import { ChargePointRepository } from "./api/application/RepositoryImpl/chargepoint.repository.js"
import { ChargePointService } from "./api/application/services/chargepoint.service.js"

/**
 * Booststrap file where the Database connection, the RouteTable are spinned up.
 */
export const App = express()

dbConnection()

App.use(cors())

App.use(bodyParser.json())

App.use('/api/v1', RouteTable)

App.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send(err.message)
})

/**
 * Registering dependencies in the execution context container
 */
container.register<OrganizationRepository>(OrganizationRepository, { useClass: OrganizationRepository })
container.register<OrganizationService>(OrganizationService, { useClass: OrganizationService })

container.register<ChargePointRepository>(ChargePointRepository, { useClass: ChargePointRepository })
container.register<ChargePointService>(ChargePointService, { useClass: ChargePointService })
