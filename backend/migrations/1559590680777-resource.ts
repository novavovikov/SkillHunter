import {MigrationInterface, QueryRunner} from "typeorm";

export class resource1559590680777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "resource" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "UQ_2ebbb177a9141301c85c660e99c" UNIQUE ("link"), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_resources" ("userId" integer NOT NULL, "resourceId" integer NOT NULL, CONSTRAINT "PK_56381172ba707e3c5e15c8fc3f4" PRIMARY KEY ("userId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f2432c8c356d0cc20cbb2db5b" ON "user_resources" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4531294f2ecf5932ceb6dc7e8c" ON "user_resources" ("resourceId") `);
        await queryRunner.query(`CREATE TABLE "skill_resources" ("resourceId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_a05bea0c1f2f90bbb1d76f83233" PRIMARY KEY ("resourceId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f6fdec084092442fa8064a498" ON "skill_resources" ("resourceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_90a8fd9059eb074343eecd6196" ON "skill_resources" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user_resources" ADD CONSTRAINT "FK_5f2432c8c356d0cc20cbb2db5bf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_resources" ADD CONSTRAINT "FK_4531294f2ecf5932ceb6dc7e8c3" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_resources" ADD CONSTRAINT "FK_6f6fdec084092442fa8064a4986" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skill_resources" ADD CONSTRAINT "FK_90a8fd9059eb074343eecd61969" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "skill_resources" DROP CONSTRAINT "FK_90a8fd9059eb074343eecd61969"`);
        await queryRunner.query(`ALTER TABLE "skill_resources" DROP CONSTRAINT "FK_6f6fdec084092442fa8064a4986"`);
        await queryRunner.query(`ALTER TABLE "user_resources" DROP CONSTRAINT "FK_4531294f2ecf5932ceb6dc7e8c3"`);
        await queryRunner.query(`ALTER TABLE "user_resources" DROP CONSTRAINT "FK_5f2432c8c356d0cc20cbb2db5bf"`);
        await queryRunner.query(`DROP INDEX "IDX_90a8fd9059eb074343eecd6196"`);
        await queryRunner.query(`DROP INDEX "IDX_6f6fdec084092442fa8064a498"`);
        await queryRunner.query(`DROP TABLE "skill_resources"`);
        await queryRunner.query(`DROP INDEX "IDX_4531294f2ecf5932ceb6dc7e8c"`);
        await queryRunner.query(`DROP INDEX "IDX_5f2432c8c356d0cc20cbb2db5b"`);
        await queryRunner.query(`DROP TABLE "user_resources"`);
        await queryRunner.query(`DROP TABLE "resource"`);
    }

}
