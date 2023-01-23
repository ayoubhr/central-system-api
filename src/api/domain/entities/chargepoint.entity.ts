import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Organization } from "./organization.entity.js"

/**
 * Chargepoint Entity object
 */
@Entity()
export class Chargepoint {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false
  })
  identity: string;

  @ManyToOne(type => Organization, organization => organization.chargePoints, { nullable: false, eager: true })
  @JoinColumn({
    name: "cpo"
  })
  cpo: string;
}