import {MigrationInterface, QueryRunner} from "typeorm";

export class sudcribeUser1568920545156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "UQ_78138550e21d8b67790d761148d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "FK_78138550e21d8b67790d761148d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "FK_78138550e21d8b67790d761148d"`);
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "UQ_78138550e21d8b67790d761148d"`);
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "userId"`);
    }

}
