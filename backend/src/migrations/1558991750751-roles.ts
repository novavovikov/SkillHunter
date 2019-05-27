import {MigrationInterface, QueryRunner} from "typeorm";

export class roles1558991750751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscribe_entity" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "profession" character varying, "expectations" character varying, CONSTRAINT "UQ_0cd3ed73b9cf2688441b6dc3a15" UNIQUE ("email"), CONSTRAINT "PK_ee1584fa76c8e0f787d54356a34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "subscribe_entity"`);
    }

}
