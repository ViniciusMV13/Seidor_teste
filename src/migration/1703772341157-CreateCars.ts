import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCars1703772341157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "plate",
                        type: "varchar",
                        length: "7",
                        isUnique: true
                    },
                    {
                        name: "color",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "brand",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "inUse",
                        type: "boolean",
                        default: "false"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars")
    }

}
