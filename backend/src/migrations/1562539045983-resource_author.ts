import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceAuthor1562539045983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "author" text`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "picture" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "author"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "icon" character varying`);
    }

}
