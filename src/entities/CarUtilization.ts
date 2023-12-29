import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Cars } from "./Cars";
import { Drivers } from "./Drivers";
import { v4 as uuid } from "uuid";

@Entity("carUtilization")
export class CarsUtilization {
  @PrimaryColumn()
  id: string;

  @Column()
  carID: string;

  @Column()
  driverID: string;

  @ManyToOne(() => Cars, (car) => car.carUtilization)
  @JoinColumn({ name: "carID" })
  car: Cars;

  
  @ManyToOne(() => Drivers, (driver) => driver.carUtilization)
  @JoinColumn({ name: "driverID" })
  driver: Drivers;

  @Column()
  reasonForUse: string;

  @CreateDateColumn()
  initialDate: string;

  @Column({ nullable: true })
  endDate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
