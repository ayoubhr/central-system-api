import "reflect-metadata"
import { NextFunction, Request, Response, Router } from 'express'
import { container } from "tsyringe"
import { ChargePointService } from "../../application/services/chargepoint.service.js"
import { validateDTO } from "../helpers/chargepoint-dtoValidation.js"
import { EntityType } from "../utils/entity-types.js"
import { HttpStatus } from "../utils/http-status.js"
import _ from 'lodash'

/**
 * Controller class for the Chargepoint resource.
 * 
 * Each route, before going into the service BLL layer, runs a class-validator function
 * that makes sure input data is present and correct.
 * 
 * Exports an Express Router with the routes binded.
 */
class ChargePointController {
  private readonly _router: Router = Router()
  // Dependency Injection
  private chargePointService: ChargePointService = container.resolve(ChargePointService)

  // Bootstraps the routing configuration once the object is created
  constructor() {
    this._configure()
  }

  // Routes inside this controller endpoint
  private _configure(): void {
    this._router.get('/findAll', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindAll", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.getAllChargePoints(req.body.entity, req.body.cpo)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.get('/findOne', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindOne", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.getOneChargePointById(req.body.entity, req.body.id)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.get('/findByIdentity', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindByIdentity", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.getChargePointByIdentity(req.body.identity)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.get('/findByCpo', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindByCpo", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.getAllChargePointsByCpo(req.body.cpo)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    // upsert, insert or update
    this._router.post('/upsert', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("UpsertChargepoint", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.upsertChargePoint(req.body)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.delete('/deleteById', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("DeleteById", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.deleteChargePointById(EntityType.CHARGEPOINT, req.body.id)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.delete('/remove', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("Remove", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.chargePointService.removeChargePoints(EntityType.CHARGEPOINT, req.body)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })
  }

  get router(): Router {
    return this._router
  }
}

export default new ChargePointController().router