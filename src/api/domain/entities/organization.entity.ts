import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from "typeorm"
import { Chargepoint } from "./chargepoint.entity.js"

/**
 * Organization Entity object
 */
@Entity()
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: true
  })
  legalEntity?: string;

  @OneToMany(type => Chargepoint, chargepoint => chargepoint.cpo)
  chargePoints?: Relation<Chargepoint>[];
}