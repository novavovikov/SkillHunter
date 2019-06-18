import {MigrationInterface, QueryRunner} from "typeorm";

export class userRelations1560816784253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_resource" ("id" SERIAL NOT NULL, "professionId" integer NOT NULL, "skillId" integer NOT NULL, "status" character varying NOT NULL, "userId" integer, "resourceId" integer, CONSTRAINT "PK_bbc9c1c0be40ea0e919fa28bb01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0f27e5819aa0f8cfc14db7220e" ON "user_resource" ("userId", "professionId", "skillId", "resourceId") `);
        await queryRunner.query(`CREATE TABLE "user_skill" ("id" SERIAL NOT NULL, "professionId" integer NOT NULL, "userId" integer, "skillId" integer, CONSTRAINT "PK_42557e0ad33b670a55b7bd0f725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9dfb6de9b4ba4fd33ed32988a8" ON "user_skill" ("userId", "professionId", "skillId") `);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD CONSTRAINT "FK_db6eec94c2913dfd4540e4614b6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD CONSTRAINT "FK_0246e12408d2f3db3d392cd6dfe" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"`);
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"`);
        await queryRunner.query(`ALTER TABLE "user_resource" DROP CONSTRAINT "FK_0246e12408d2f3db3d392cd6dfe"`);
        await queryRunner.query(`ALTER TABLE "user_resource" DROP CONSTRAINT "FK_db6eec94c2913dfd4540e4614b6"`);
        await queryRunner.query(`DROP INDEX "IDX_9dfb6de9b4ba4fd33ed32988a8"`);
        await queryRunner.query(`DROP TABLE "user_skill"`);
        await queryRunner.query(`DROP INDEX "IDX_0f27e5819aa0f8cfc14db7220e"`);
        await queryRunner.query(`DROP TABLE "user_resource"`);
    }

}
