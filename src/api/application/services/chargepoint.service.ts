import "reflect-metadata"
import { container, injectable } from "tsyringe"
import { DeleteResult } from "typeorm"
import { v4 as uuid4 } from "uuid"
import { Chargepoint } from "../../domain/entities/chargepoint.entity.js"
import { ChargePointRepository } from "../RepositoryImpl/chargepoint.repository.js"

/**
 * Implementation of the Chargepoint bussiness logic layer.
 * 
 * Service is made available as an injectable for DI container specified in bootstrap class app.ts.
 */
@injectable()
export class ChargePointService {

  // Dependency Injection
  private chargePointRepository: ChargePointRepository = container.resolve(ChargePointRepository)

  public getAllChargePoints = async (EntityType: String, Cpo?: string): Promise<Chargepoint[]> => {
    try {
      return await this.chargePointRepository.find(EntityType, { select: { id: true, identity: true, cpo: true } })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public getOneChargePointById = async (Entity: String, id: string): Promise<Chargepoint | null> => {
    try {
      return await this.chargePointRepository.findById(Entity, id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public getChargePointByIdentity = async (identity: string): Promise<Chargepoint[]> => {
    try {
      return await this.chargePointRepository.findByIdentity(identity)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public getAllChargePointsByCpo = async (cpo: string): Promise<Chargepoint[]> => {
    try {
      return await this.chargePointRepository.findByCpo(cpo)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public upsertChargePoint = async (Entity: any): Promise<Chargepoint> => {
    try {
      let chargepoint = new Chargepoint()
      chargepoint.id = uuid4()
      chargepoint.identity = Entity.identity
      chargepoint.cpo = Entity.cpo
      return await this.chargePointRepository.save(chargepoint)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public deleteChargePointById = async (Entity: String, id: string): Promise<DeleteResult> => {
    try {
      return await this.chargePointRepository.deleteById(Entity, id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public removeChargePoints = async (EntityType: String, Entities: Chargepoint[]): Promise<Chargepoint[]> => {
    try {
      return await this.chargePointRepository.remove(Entities, EntityType)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}