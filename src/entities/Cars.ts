import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CarsUtilization } from "./CarUtilization";


@Entity("cars")
export class Cars {

    @PrimaryColumn()
    id: string

    @Column()
    plate: string

    @Column()
    color: string

    @Column()
    brand: string

    @Column()
    inUse: boolean

    @OneToMany(() => CarsUtilization, carUtilization => carUtilization.car)
    carUtilization: CarsUtilization[];

    constructor() {
        if (!this.id) {
            this.id =  uuid()
        }
        if (!this.inUse) {
            this.inUse = false
        }
    }
}