import "reflect-metadata"
import { injectable } from "tsyringe"
import { Equal } from "typeorm"
import { Chargepoint } from "../../domain/entities/chargepoint.entity.js"
import { IChargePointRepository } from "../../domain/repository/IChargepointRepository.js"
import { dataSource } from "../config/datasource.js"
import { CrudRepository } from "./crud.repository.js"

/**
 * Implementation of the IChargePointRepository.
 * Inherits operation from the base repository class CrudRepository.
 * 
 * Service is made available as an injectable for DI container specified in app.ts class.
 */
@injectable()
export class ChargePointRepository extends CrudRepository<Chargepoint | any> implements IChargePointRepository {
  async findByIdentity(identity: string): Promise<Chargepoint[]> {
    try {
      return await dataSource.manager.findBy<any>(Chargepoint, {
        identity: Equal(identity)
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async findByCpo(cpo: string): Promise<Chargepoint[]> {
    try {
      return await dataSource.manager.findBy<any>(Chargepoint, {
        cpo: Equal(cpo)
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}