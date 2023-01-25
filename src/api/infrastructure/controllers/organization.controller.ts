import "reflect-metadata"
import { NextFunction, Request, Response, Router } from 'express'
import { OrganizationService } from "../../application/services/organization.service.js"
import { container } from "tsyringe"
import { validateDTO } from "../helpers/organization-dtoValidation.js"
import { EntityType } from "../utils/entity-types.js"
import { HttpStatus } from "../utils/http-status.js"
import _ from 'lodash'

/**
 * Controller class for the Organization resource.
 * 
 * Each route, before going into the service BLL layer, runs a class-validator function
 * that makes sure input data is present and correct.
 * 
 * Exports an Express.js Router with the routes binded.
 */
class OrganizationController {
  private readonly _router: Router = Router()
  // Dependency Injection
  private organizationService: OrganizationService = container.resolve(OrganizationService)

  // Bootstraps the routing configuration once the object is created
  constructor() {
    this._configure()
  }

  // Routes inside this controller endpoint
  private _configure(): void {

    this._router.post('/findAll', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindAll", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.organizationService.getAllOrganizations(req.body.entity)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.post('/findOne', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindOne", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.organizationService.getOneOrganizationById(req.body.entity, req.body.id)

        res.send(response)
      } catch (error) {
        res.status(HttpStatus.BADREQUEST).json({
          statusCode: HttpStatus.BADREQUEST,
          error: (error as Error).message,
          stack: (error as Error).stack
        })
      }
    })

    this._router.post('/findByName', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationResult = await validateDTO("FindByName", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.organizationService.getOrganizationByName(req.body.name)

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
        const validationResult = await validateDTO("UpsertOrganization", req.body)

        if (!_.isEmpty(validationResult)) {
          return res.status(HttpStatus.BADREQUEST).json(validationResult)
        }

        const response = await this.organizationService.upsertOrganization(req.body)

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

        const response = await this.organizationService.deleteOrganizationById(EntityType.ORGANIZATION, req.body.id)

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

        const response = await this.organizationService.removeOrganizations(EntityType.ORGANIZATION, req.body)

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

export default new OrganizationController().router