import {MigrationInterface, QueryRunner} from "typeorm";

export class removeExternalId1558461796670 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscribe_entity" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "profession" character varying, "expectations" character varying, CONSTRAINT "UQ_0cd3ed73b9cf2688441b6dc3a15" UNIQUE ("email"), CONSTRAINT "PK_ee1584fa76c8e0f787d54356a34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "UQ_c563a49c1cd6f4b65e20803ae0a"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "externalId"`);
        await queryRunner.query(`ALTER TABLE "profession" DROP CONSTRAINT "UQ_ffecd83212866cd50201c57f25c"`);
        await queryRunner.query(`ALTER TABLE "profession" DROP COLUMN "externalId"`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "profession" ADD CONSTRAINT "UQ_3113ca18873244db8aac3441ae6" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profession" DROP CONSTRAINT "UQ_3113ca18873244db8aac3441ae6"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "UQ_0f49a593960360f6f85b692aca8"`);
        await queryRunner.query(`ALTER TABLE "profession" ADD "externalId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profession" ADD CONSTRAINT "UQ_ffecd83212866cd50201c57f25c" UNIQUE ("externalId")`);
        await queryRunner.query(`ALTER TABLE "skill" ADD "externalId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "UQ_c563a49c1cd6f4b65e20803ae0a" UNIQUE ("externalId")`);
        await queryRunner.query(`DROP TABLE "subscribe_entity"`);
    }

}
