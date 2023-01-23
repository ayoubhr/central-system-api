import { Chargepoint } from "../entities/chargepoint.entity.js"

/**
 * Chargepoint interface holding a set of specific operations
 */
export interface IChargePointRepository {
  findByIdentity(identity: string): Promise<Chargepoint[]>
  findByCpo(cpo: string): Promise<Chargepoint[]>
}