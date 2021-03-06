import {MigrationInterface, QueryRunner} from "typeorm";

export class userResourceTitle1562539481038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "title"`);
    }

}
