import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CarsUtilization } from "./CarUtilization";

@Entity("drivers")
export class Drivers {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  itsDriving: boolean;

  @OneToMany(() => CarsUtilization, (carUtilization) => carUtilization.driver)
  carUtilization: CarsUtilization[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.itsDriving) {
      this.itsDriving = false;
    }
  }
}
