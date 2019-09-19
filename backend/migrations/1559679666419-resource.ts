import {MigrationInterface, QueryRunner} from "typeorm";

export class resource1559679666419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "type" SET DEFAULT 'article'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "type" DROP DEFAULT`);
    }

}
