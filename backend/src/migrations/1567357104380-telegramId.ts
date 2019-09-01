import {MigrationInterface, QueryRunner} from "typeorm";

export class telegramId1567357104380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "telegramId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "telegramId"`);
    }

}
