import {MigrationInterface, QueryRunner} from "typeorm";

export class userSkillResources1562182750660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "subscribe_entity"`);
        await queryRunner.query(`DELETE FROM "user_resource"`);
        await queryRunner.query(`DROP INDEX "IDX_cfda209985e299ab0d898bb67d"`);
        await queryRunner.query(`ALTER TABLE "user_resource" RENAME COLUMN "skillId" TO "userSkillId"`);
        await queryRunner.query(`ALTER TABLE "user_resource" ALTER COLUMN "userSkillId" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e8d2df765de8b10b7e072c2e5a" ON "user_resource" ("userId", "skillsetId", "userSkillId", "resourceId") `);
        await queryRunner.query(`ALTER TABLE "user_resource" ADD CONSTRAINT "FK_5c30ad9dbbd6fe5b7957acd122f" FOREIGN KEY ("userSkillId") REFERENCES "user_skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP CONSTRAINT "FK_5c30ad9dbbd6fe5b7957acd122f"`);
        await queryRunner.query(`DROP INDEX "IDX_e8d2df765de8b10b7e072c2e5a"`);
        await queryRunner.query(`ALTER TABLE "user_resource" ALTER COLUMN "userSkillId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_resource" RENAME COLUMN "userSkillId" TO "skillId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cfda209985e299ab0d898bb67d" ON "user_resource" ("skillsetId", "skillId", "userId", "resourceId") `);
    }

}
