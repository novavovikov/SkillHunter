import {MigrationInterface, QueryRunner} from "typeorm";

export class userResourceLink1562621105768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "UQ_2ebbb177a9141301c85c660e99c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "UQ_2ebbb177a9141301c85c660e99c" UNIQUE ("link")`);
    }

}
