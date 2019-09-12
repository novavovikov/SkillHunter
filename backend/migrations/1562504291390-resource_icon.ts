import {MigrationInterface, QueryRunner} from "typeorm";

export class resourceIcon1562504291390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "icon" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "resource" ALTER COLUMN "icon" SET NOT NULL`);
    }

}
