import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceType1562352051649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "type" character varying NOT NULL DEFAULT 'article'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "type" character varying NOT NULL DEFAULT 'article'`);
    }

}
