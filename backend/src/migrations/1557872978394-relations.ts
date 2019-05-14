import {MigrationInterface, QueryRunner} from "typeorm";

export class relations1557872978394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_skills" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_060bea7fd45868588324719de3c" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_60177dd93dcdc055e4eaa93bad" ON "user_skills" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b19f190afaada3852e0f56566b" ON "user_skills" ("skillId") `);
        await queryRunner.query(`CREATE TABLE "user_professions" ("userId" integer NOT NULL, "professionId" integer NOT NULL, CONSTRAINT "PK_9b5d0e1a46fc9128450fd009218" PRIMARY KEY ("userId", "professionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e2299502faa9c6e5bc2407cf7" ON "user_professions" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_88dbdca1756fada77e36a2ef2a" ON "user_professions" ("professionId") `);
        await queryRunner.query(`CREATE TABLE "profession_skills" ("professionId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_a69145405b376936333106cda79" PRIMARY KEY ("professionId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc96296488ffb21735a7e9fc44" ON "profession_skills" ("professionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a80bf072fe91a3e6694fbf1c30" ON "profession_skills" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_b19f190afaada3852e0f56566bc" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_professions" ADD CONSTRAINT "FK_0e2299502faa9c6e5bc2407cf71" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_professions" ADD CONSTRAINT "FK_88dbdca1756fada77e36a2ef2a3" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profession_skills" ADD CONSTRAINT "FK_bc96296488ffb21735a7e9fc445" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profession_skills" ADD CONSTRAINT "FK_a80bf072fe91a3e6694fbf1c302" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profession_skills" DROP CONSTRAINT "FK_a80bf072fe91a3e6694fbf1c302"`);
        await queryRunner.query(`ALTER TABLE "profession_skills" DROP CONSTRAINT "FK_bc96296488ffb21735a7e9fc445"`);
        await queryRunner.query(`ALTER TABLE "user_professions" DROP CONSTRAINT "FK_88dbdca1756fada77e36a2ef2a3"`);
        await queryRunner.query(`ALTER TABLE "user_professions" DROP CONSTRAINT "FK_0e2299502faa9c6e5bc2407cf71"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_b19f190afaada3852e0f56566bc"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade"`);
        await queryRunner.query(`DROP INDEX "IDX_a80bf072fe91a3e6694fbf1c30"`);
        await queryRunner.query(`DROP INDEX "IDX_bc96296488ffb21735a7e9fc44"`);
        await queryRunner.query(`DROP TABLE "profession_skills"`);
        await queryRunner.query(`DROP INDEX "IDX_88dbdca1756fada77e36a2ef2a"`);
        await queryRunner.query(`DROP INDEX "IDX_0e2299502faa9c6e5bc2407cf7"`);
        await queryRunner.query(`DROP TABLE "user_professions"`);
        await queryRunner.query(`DROP INDEX "IDX_b19f190afaada3852e0f56566b"`);
        await queryRunner.query(`DROP INDEX "IDX_60177dd93dcdc055e4eaa93bad"`);
        await queryRunner.query(`DROP TABLE "user_skills"`);
    }

}
