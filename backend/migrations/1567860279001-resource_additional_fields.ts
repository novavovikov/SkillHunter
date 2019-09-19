import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceAdditionalFields1567860279001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "date" character varying`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "text" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "picture" character varying`);
    }

}
