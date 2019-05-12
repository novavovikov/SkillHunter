import { MigrationInterface, QueryRunner } from 'typeorm'

export class SkillsProfessions1557621607431 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "externalId" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_c563a49c1cd6f4b65e20803ae0a" UNIQUE ("externalId"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "profession" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "externalId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ffecd83212866cd50201c57f25c" UNIQUE ("externalId"), CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "profession"`)
    await queryRunner.query(`DROP TABLE "skill"`)
  }

}
