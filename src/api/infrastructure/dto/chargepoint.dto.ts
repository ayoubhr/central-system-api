import { IsString, IsNotEmpty, IsUUID, IsArray } from 'class-validator'

/**
 * DTO specification for the Chargepoint resource.
 * 
 * Used in combination with the /helpers/chargepoint-dtovalidation class to validate input data from request.
 * 
 * Each class represents a subset type of the interface ChargepointModel, its used on a specific route.
 */
export interface ChargepointModel {
  id: string
  identity: string
  cpo: string
  entityType?: string
}

export class UpsertChargePointDTO implements Pick<ChargepointModel, "identity" | "cpo"> {
  @IsString()
  @IsNotEmpty()
  identity: string

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  cpo: string
}

export class FindByIdentityDTO implements Pick<ChargepointModel, "identity"> {
  @IsString()
  @IsNotEmpty()
  identity: string
}

export class FindByCpoDTO implements Pick<ChargepointModel, "cpo"> {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  cpo: string
}

export class FindOneChargepointDTO implements Pick<ChargepointModel, "id" | "entityType"> {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  entityType: string
}

export class FindAllChargepointsDTO implements Pick<ChargepointModel, "entityType"> {

  @IsString()
  @IsNotEmpty()
  entityType: string
}

export class DeleteChargepointByIdDTO implements Pick<ChargepointModel, "id" | "identity"> {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string

  @IsString()
  @IsNotEmpty()
  identity: string
}

export class RemoveChargepointsDTO {
  @IsArray()
  @IsNotEmpty()
  entities: ChargepointModel[]
}