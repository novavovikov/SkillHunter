import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceTitle1562495577121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "title" SET NOT NULL`);
    }

}
