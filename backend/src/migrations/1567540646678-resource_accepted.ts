import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceAccepted1567540646678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ADD "accepted" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "accepted"`);
    }

}
