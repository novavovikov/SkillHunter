import {MigrationInterface, QueryRunner} from "typeorm";

export class userSettings1568247372477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" SERIAL NOT NULL, "private" boolean NOT NULL DEFAULT false, "onboarding" boolean NOT NULL DEFAULT true, "newsletter" boolean NOT NULL DEFAULT true, "push" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "settingsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_390395c3d8592e3e8d8422ce853" FOREIGN KEY ("settingsId") REFERENCES "user_settings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "settingsId"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
    }

}
