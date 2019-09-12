import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceLikes1560239105810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "resource_likes" ("resourceId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_3847b493798aa2722f4feaefaf8" PRIMARY KEY ("resourceId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd9329419b884a21c693005100" ON "resource_likes" ("resourceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_43ff487b15f5d3ddacd16e4a92" ON "resource_likes" ("userId") `);
        await queryRunner.query(`ALTER TABLE "resource_likes" ADD CONSTRAINT "FK_dd9329419b884a21c693005100b" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resource_likes" ADD CONSTRAINT "FK_43ff487b15f5d3ddacd16e4a92c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource_likes" DROP CONSTRAINT "FK_43ff487b15f5d3ddacd16e4a92c"`);
        await queryRunner.query(`ALTER TABLE "resource_likes" DROP CONSTRAINT "FK_dd9329419b884a21c693005100b"`);
        await queryRunner.query(`DROP INDEX "IDX_43ff487b15f5d3ddacd16e4a92"`);
        await queryRunner.query(`DROP INDEX "IDX_dd9329419b884a21c693005100"`);
        await queryRunner.query(`DROP TABLE "resource_likes"`);
    }

}
