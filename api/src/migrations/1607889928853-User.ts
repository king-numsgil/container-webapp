import {MigrationInterface, QueryRunner} from "typeorm";

export class User1607889928853 implements MigrationInterface {
    name = 'User1607889928853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "codeName" character varying(100) NOT NULL, CONSTRAINT "UQ_390215abbc2901e2e623a69a03c" UNIQUE ("codeName"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "codeName" character varying(100) NOT NULL, CONSTRAINT "UQ_c13ca26406d3e9be800054b9a4c" UNIQUE ("codeName"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" character varying(44) NOT NULL, "user_id" integer, "content" text NOT NULL, "flash" text NOT NULL, "updated_at" integer NOT NULL, "created_at" integer NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_d9b4ec30d48ed8515908f47f691" PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24022d7e409de3835f25603d35" ON "group_permissions_permission" ("groupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0777702b851f7662e2678b4568" ON "group_permissions_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `);
        await queryRunner.query(`CREATE TABLE "user_user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_bf95d80e2b8e8d17c2b598a7a0e" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c3462965c06c5bc3c8996f452" ON "user_user_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a38ad03e94f4de594fc09fb53" ON "user_user_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_24022d7e409de3835f25603d35d" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_0777702b851f7662e2678b45689" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_user_permissions_permission" ADD CONSTRAINT "FK_4c3462965c06c5bc3c8996f4524" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_user_permissions_permission" ADD CONSTRAINT "FK_4a38ad03e94f4de594fc09fb53c" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_user_permissions_permission" DROP CONSTRAINT "FK_4a38ad03e94f4de594fc09fb53c"`);
        await queryRunner.query(`ALTER TABLE "user_user_permissions_permission" DROP CONSTRAINT "FK_4c3462965c06c5bc3c8996f4524"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_0777702b851f7662e2678b45689"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_24022d7e409de3835f25603d35d"`);
        await queryRunner.query(`DROP INDEX "IDX_4a38ad03e94f4de594fc09fb53"`);
        await queryRunner.query(`DROP INDEX "IDX_4c3462965c06c5bc3c8996f452"`);
        await queryRunner.query(`DROP TABLE "user_user_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "IDX_8abdfe8f9d78a4f5e821dbf620"`);
        await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`);
        await queryRunner.query(`DROP TABLE "user_groups_group"`);
        await queryRunner.query(`DROP INDEX "IDX_0777702b851f7662e2678b4568"`);
        await queryRunner.query(`DROP INDEX "IDX_24022d7e409de3835f25603d35"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
