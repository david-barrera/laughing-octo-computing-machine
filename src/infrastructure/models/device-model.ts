import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Device } from "../../domain/entities/device";

@Entity()
export class DeviceModel implements Device {
  @PrimaryColumn("uuid", { generated: "uuid" })
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  brand: string;

  @CreateDateColumn()
  createdAt: Date;
}
