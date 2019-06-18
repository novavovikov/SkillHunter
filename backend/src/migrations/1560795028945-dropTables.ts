import {MigrationInterface, QueryRunner} from "typeorm";

export class dropTables1560795028945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_skills"`);
        await queryRunner.query(`DROP TABLE "user_resources"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_skills" ("userId" SERIAL NOT NULL, "skillId" SERIAL NOT NULL, CONSTRAINT "PK_ee1584fa76c8e0f787d54356a34" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE TABLE "user_resources" ("userId" SERIAL NOT NULL, "resourceId" SERIAL NOT NULL, CONSTRAINT "PK_ee1584fa76c8e0f787d54356a34" PRIMARY KEY ("userId", "resourceId"))`);
    }

}
