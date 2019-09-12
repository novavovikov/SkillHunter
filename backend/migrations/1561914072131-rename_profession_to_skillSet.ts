import {MigrationInterface, QueryRunner} from "typeorm";

export class renameProfessionToSkillSet1561914072131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_0f27e5819aa0f8cfc14db7220e"`);
        await queryRunner.query(`DROP INDEX "IDX_9dfb6de9b4ba4fd33ed32988a8"`);
        await queryRunner.query(`ALTER TABLE "user_resource" RENAME COLUMN "professionId" TO "skillsetId"`);
        await queryRunner.query(`ALTER TABLE "user_skill" RENAME COLUMN "professionId" TO "skillsetId"`);
        await queryRunner.query(`ALTER TABLE "subscribe" RENAME COLUMN "profession" TO "skillset"`);
        await queryRunner.query(`CREATE TABLE "skillset" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "accepted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_4228c18bd37accf418e0667991e" UNIQUE ("name"), CONSTRAINT "PK_2aa59d80bd4a194c63840d98074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skillsets" ("userId" integer NOT NULL, "skillsetId" integer NOT NULL, CONSTRAINT "PK_fc5b00697fb37b39a501cf9941a" PRIMARY KEY ("userId", "skillsetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3bc4465a9cc888037dc453146" ON "user_skillsets" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d1b86da5f30e3c9ce439e600c6" ON "user_skillsets" ("skillsetId") `);
        await queryRunner.query(`CREATE TABLE "skillset_skills" ("skillsetId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_abb7a8b2eac2c0ee6bee8bf3c2c" PRIMARY KEY ("skillsetId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0fe632493ed0a6aa412a6be5c2" ON "skillset_skills" ("skillsetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d3d9464d781ab05505f9c6ae62" ON "skillset_skills" ("skillId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cfda209985e299ab0d898bb67d" ON "user_resource" ("userId", "skillsetId", "skillId", "resourceId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d84a1ae2ed0842b3476f120cf7" ON "user_skill" ("userId", "skillsetId", "skillId") `);
        await queryRunner.query(`ALTER TABLE "user_skillsets" ADD CONSTRAINT "FK_b3bc4465a9cc888037dc453146b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skillsets" ADD CONSTRAINT "FK_d1b86da5f30e3c9ce439e600c6f" FOREIGN KEY ("skillsetId") REFERENCES "skillset"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skillset_skills" ADD CONSTRAINT "FK_0fe632493ed0a6aa412a6be5c2f" FOREIGN KEY ("skillsetId") REFERENCES "skillset"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "skillset_skills" ADD CONSTRAINT "FK_d3d9464d781ab05505f9c6ae629" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "skillset" ("id", "created", "name", "accepted") SELECT "id", "created", "name", "accepted" FROM profession`)
        await queryRunner.query(`DROP TABLE "profession" CASCADE`);
        await queryRunner.query(`INSERT INTO "user_skillsets" ("userId", "skillsetId") SELECT "userId", "professionId" FROM user_professions`)
        await queryRunner.query(`DROP TABLE "user_professions" CASCADE`);
        await queryRunner.query(`INSERT INTO "skillset_skills" ("skillId", "skillsetId") SELECT "skillId", "professionId" FROM profession_skills`)
        await queryRunner.query(`DROP TABLE "profession_skills" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "skillset_skills" DROP CONSTRAINT "FK_d3d9464d781ab05505f9c6ae629"`);
        await queryRunner.query(`ALTER TABLE "skillset_skills" DROP CONSTRAINT "FK_0fe632493ed0a6aa412a6be5c2f"`);
        await queryRunner.query(`ALTER TABLE "user_skillsets" DROP CONSTRAINT "FK_d1b86da5f30e3c9ce439e600c6f"`);
        await queryRunner.query(`ALTER TABLE "user_skillsets" DROP CONSTRAINT "FK_b3bc4465a9cc888037dc453146b"`);
        await queryRunner.query(`DROP INDEX "IDX_d84a1ae2ed0842b3476f120cf7"`);
        await queryRunner.query(`DROP INDEX "IDX_cfda209985e299ab0d898bb67d"`);
        await queryRunner.query(`DROP INDEX "IDX_d3d9464d781ab05505f9c6ae62"`);
        await queryRunner.query(`DROP INDEX "IDX_0fe632493ed0a6aa412a6be5c2"`);
        await queryRunner.query(`DROP TABLE "skillset_skills"`);
        await queryRunner.query(`DROP INDEX "IDX_d1b86da5f30e3c9ce439e600c6"`);
        await queryRunner.query(`DROP INDEX "IDX_b3bc4465a9cc888037dc453146"`);
        await queryRunner.query(`DROP TABLE "user_skillsets"`);
        await queryRunner.query(`DROP TABLE "skillset"`);
        await queryRunner.query(`ALTER TABLE "subscribe" RENAME COLUMN "skillset" TO "profession"`);
        await queryRunner.query(`ALTER TABLE "user_skill" RENAME COLUMN "skillsetId" TO "professionId"`);
        await queryRunner.query(`ALTER TABLE "user_resource" RENAME COLUMN "skillsetId" TO "professionId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9dfb6de9b4ba4fd33ed32988a8" ON "user_skill" ("professionId", "userId", "skillId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0f27e5819aa0f8cfc14db7220e" ON "user_resource" ("professionId", "skillId", "userId", "resourceId") `);
    }

}
