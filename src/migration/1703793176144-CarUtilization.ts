import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CarUtilization1703793176144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "carUtilization",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "carID",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "driverID",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "reasoForUse",
                        type: "varchar",
                        length: "255" 
                    },
                    {
                        name: "initialDate",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "endDate",
                        type: "date"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("carUtilization")
    }

}
