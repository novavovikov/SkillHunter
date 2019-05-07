import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1556959936310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscribe_entity" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "profession" character varying, "expectations" character varying, CONSTRAINT "UQ_0cd3ed73b9cf2688441b6dc3a15" UNIQUE ("email"), CONSTRAINT "PK_ee1584fa76c8e0f787d54356a34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "picture" character varying, "name" character varying, "locale" character varying, "googleId" character varying, "facebookId" character varying, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "subscribe_entity"`);
    }

}
