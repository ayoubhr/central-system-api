import "reflect-metadata"
import { Organization } from "../../domain/entities/organization.entity.js"
import { IOrganizationRepository } from "../../domain/repository/IOrganizationRepository.js"
import { dataSource } from "../config/datasource.js"
import { CrudRepository } from "./crud.repository.js"
import { injectable } from "tsyringe"

/**
 * Implementation of the IOrganizationRepository.
 * Inherits operation from the base repository class CrudRepository.
 * 
 * Service is made available as an injectable for DI container specified in app.ts class.
 */
@injectable()
export class OrganizationRepository extends CrudRepository<Organization | any> implements IOrganizationRepository {

  async findByName(name: string): Promise<Organization> {
    try {
      return await dataSource.manager.findOneBy<any>(Organization, {
        name: name
      })
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}