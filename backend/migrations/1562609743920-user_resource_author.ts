import {MigrationInterface, QueryRunner} from "typeorm";

export class userResourceAuthor1562609743920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" ADD "author" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_resource" DROP COLUMN "author"`);
    }

}
