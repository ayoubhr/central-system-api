import "reflect-metadata"
import { Organization } from "../../domain/entities/organization.entity.js"
import { OrganizationRepository } from "../RepositoryImpl/organization.repository.js"
import { container, injectable } from "tsyringe"
import { DeleteResult, UpdateResult } from "typeorm"
import { v4 as uuid4 } from "uuid"

/**
 * Implementation of the Organization bussiness logic layer.
 * 
 * Service is made available as an injectable for DI container specified in bootstrap app.ts.
 */
@injectable()
export class OrganizationService {

  // Dependency Injection
  private organizationRepository: OrganizationRepository = container.resolve(OrganizationRepository)

  public getAllOrganizations = async (EntityType: String): Promise<Organization[]> => {
    try {
      return await this.organizationRepository.find(EntityType)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public getOneOrganizationById = async (Entity: String, id: string): Promise<Organization | null> => {
    try {
      return await this.organizationRepository.findById(Entity, id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public getOrganizationByName = async (name: string): Promise<Organization> => {
    try {
      return await this.organizationRepository.findByName(name)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public upsertOrganization = async (Entity: any): Promise<Organization | UpdateResult> => {
    try {
      let organization = new Organization()

      organization.name = Entity.name
      organization.legalEntity = Entity.legalEntity

      if(typeof Entity.id == undefined) {
        // saves a new organization
        organization.id = uuid4()
        return await this.organizationRepository.save(organization)
      } else {
        // updates an existing organization
        organization.id = Entity.id
        return await this.organizationRepository.save(organization)
      }
      
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public deleteOrganizationById = async (Entity: String, id: string): Promise<DeleteResult> => {
    try {
      return await this.organizationRepository.deleteById(Entity, id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public removeOrganizations = async (EntityType: String, Entities: Organization[]): Promise<Organization[]> => {
    try {
      return await this.organizationRepository.remove(Entities, EntityType)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
