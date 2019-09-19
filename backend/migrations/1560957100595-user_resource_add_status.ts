import {MigrationInterface, QueryRunner} from "typeorm";

export class userResourceAddStatus1560957100595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "user_resource_status_enum" AS ENUM('Backlog', 'Plan', 'Done')`);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "status" "user_resource_status_enum" NOT NULL DEFAULT 'Backlog'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "user_resource_status_enum"`);
    }

}
