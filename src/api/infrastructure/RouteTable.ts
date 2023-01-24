import "reflect-metadata"
import { Router } from 'express'
import OrganizationController from "./controllers/organization.controller.js"
import ChargepointController from "./controllers/chargepoint.controller.js"

/**
 * The route table job comes once we are inside the application through the initial /api/v1 path.
 * Works as a gateway door to the controller layer implementation.
 * 
 *  Each provided controller represents an exported Express.js Router from its specific class.
 */
class RouteTable {
  public readonly _router: Router = Router()

  // Bootstraps the routing configuration once the object is created
  constructor() {
    this._configure()
  }

  // Binds each controller to the correspondant path.
  private _configure(): void {
    this._router.use('/organization', OrganizationController)
    this._router.use('/chargepoint', ChargepointController)
  }

  // returns the router
  get router(): Router {
    return this._router
  }
}

export default new RouteTable().router