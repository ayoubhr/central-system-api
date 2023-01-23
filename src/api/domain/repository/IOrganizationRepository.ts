import { Organization } from "../entities/organization.entity.js"

/**
 * Organization interface holding a specific operation
 */
export interface IOrganizationRepository {
  findByName(name: string): Promise<Organization>
}