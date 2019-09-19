import {MigrationInterface, QueryRunner} from "typeorm";

export class userSettingsRelation1568826227525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "settingsId"`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78"`);
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78"`);
        await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "settingsId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_390395c3d8592e3e8d8422ce853" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_390395c3d8592e3e8d8422ce853" FOREIGN KEY ("settingsId") REFERENCES "user_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
