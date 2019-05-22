import {MigrationInterface, QueryRunner} from "typeorm";

export class acceptedColumn1558472340111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "skill" ADD "accepted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`UPDATE "skill" SET accepted = true`);
        await queryRunner.query(`ALTER TABLE "profession" ADD "accepted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`UPDATE "profession" SET accepted = true`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profession" DROP COLUMN "accepted"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "accepted"`);
    }

}
