import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameTables1557619497342 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "subscribe" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "profession" character varying, "expectations" character varying, CONSTRAINT "UQ_ccd17da54ad3367a752be476971" UNIQUE ("email"), CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id"))`)
    await queryRunner.query(`INSERT INTO "subscribe" ("id", "created", "email", "profession", "expectations") SELECT "id", "created", "email", "profession", "expectations" FROM subscribe_entity`)
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "picture" character varying, "name" character varying, "locale" character varying, "googleId" character varying, "facebookId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`INSERT INTO "user" ("id", "created", "email", "picture", "name", "locale", "googleId", "facebookId") SELECT "id", "created", "email", "picture", "name", "locale", "googleId", "facebookId" FROM user_entity`)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "subscribe"`)
  }

}
