import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1556898115601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('create table user;')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
