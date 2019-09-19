import {MigrationInterface, QueryRunner} from "typeorm";

export class sudcribeToFeature1568912108962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "skillset"`);
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "expectations"`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "feature" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "feature"`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "expectations" character varying`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "skillset" character varying`);
    }

}
