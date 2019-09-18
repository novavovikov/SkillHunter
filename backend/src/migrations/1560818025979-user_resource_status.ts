import {MigrationInterface, QueryRunner} from "typeorm";

export class userResourceStatus1560818025979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "user_resource_status_enum" AS ENUM('backlog', 'plan', 'done')`);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "status" "user_resource_status_enum" NOT NULL DEFAULT 'backlog'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "user_resource_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "status" character varying NOT NULL`);
    }

}
