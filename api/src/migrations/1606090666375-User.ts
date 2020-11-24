import {MigrationInterface, QueryRunner} from "typeorm";

export class User1606090666375 implements MigrationInterface {
    name = 'User1606090666375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
        await queryRunner.query(`CREATE TABLE "Permissions" ("codeName" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_3be34bcdb5f080123c3b7d07678" PRIMARY KEY ("codeName"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" character varying(64) NOT NULL, "password" character varying NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Groups" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying NOT NULL, CONSTRAINT "UQ_d7650def7a54c77759fb05070b9" UNIQUE ("name"), CONSTRAINT "PK_be8543c3ec161e109d124cf9498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_groups__groups" ("usersId" uuid NOT NULL, "groupsId" uuid NOT NULL, CONSTRAINT "PK_2ff45f4985870fa54647ab9ea5d" PRIMARY KEY ("usersId", "groupsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbb464367a03fe9943f677b3a4" ON "users_groups__groups" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e91ef5dc6014ab34d869e5f050" ON "users_groups__groups" ("groupsId") `);
        await queryRunner.query(`CREATE TABLE "users_permissions__permissions" ("usersId" uuid NOT NULL, "permissionsCodeName" character varying NOT NULL, CONSTRAINT "PK_b2103074fdb9a080a6bd801e256" PRIMARY KEY ("usersId", "permissionsCodeName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29eb9a65f0350e5e89af07733f" ON "users_permissions__permissions" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d829bed7bde2f5992c3c1d23c3" ON "users_permissions__permissions" ("permissionsCodeName") `);
        await queryRunner.query(`CREATE TABLE "groups_permissions__permissions" ("groupsId" uuid NOT NULL, "permissionsCodeName" character varying NOT NULL, CONSTRAINT "PK_cf021fed6454d6dca3d7d52473f" PRIMARY KEY ("groupsId", "permissionsCodeName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2261685f83ed0e5c81c0682911" ON "groups_permissions__permissions" ("groupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9327eff75926a264984047c95" ON "groups_permissions__permissions" ("permissionsCodeName") `);
        await queryRunner.query(`ALTER TABLE "users_groups__groups" ADD CONSTRAINT "FK_cbb464367a03fe9943f677b3a40" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_groups__groups" ADD CONSTRAINT "FK_e91ef5dc6014ab34d869e5f0501" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_permissions__permissions" ADD CONSTRAINT "FK_29eb9a65f0350e5e89af07733f4" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_permissions__permissions" ADD CONSTRAINT "FK_d829bed7bde2f5992c3c1d23c38" FOREIGN KEY ("permissionsCodeName") REFERENCES "Permissions"("codeName") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_permissions__permissions" ADD CONSTRAINT "FK_2261685f83ed0e5c81c06829115" FOREIGN KEY ("groupsId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups_permissions__permissions" ADD CONSTRAINT "FK_f9327eff75926a264984047c953" FOREIGN KEY ("permissionsCodeName") REFERENCES "Permissions"("codeName") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups_permissions__permissions" DROP CONSTRAINT "FK_f9327eff75926a264984047c953"`);
        await queryRunner.query(`ALTER TABLE "groups_permissions__permissions" DROP CONSTRAINT "FK_2261685f83ed0e5c81c06829115"`);
        await queryRunner.query(`ALTER TABLE "users_permissions__permissions" DROP CONSTRAINT "FK_d829bed7bde2f5992c3c1d23c38"`);
        await queryRunner.query(`ALTER TABLE "users_permissions__permissions" DROP CONSTRAINT "FK_29eb9a65f0350e5e89af07733f4"`);
        await queryRunner.query(`ALTER TABLE "users_groups__groups" DROP CONSTRAINT "FK_e91ef5dc6014ab34d869e5f0501"`);
        await queryRunner.query(`ALTER TABLE "users_groups__groups" DROP CONSTRAINT "FK_cbb464367a03fe9943f677b3a40"`);
        await queryRunner.query(`DROP INDEX "IDX_f9327eff75926a264984047c95"`);
        await queryRunner.query(`DROP INDEX "IDX_2261685f83ed0e5c81c0682911"`);
        await queryRunner.query(`DROP TABLE "groups_permissions__permissions"`);
        await queryRunner.query(`DROP INDEX "IDX_d829bed7bde2f5992c3c1d23c3"`);
        await queryRunner.query(`DROP INDEX "IDX_29eb9a65f0350e5e89af07733f"`);
        await queryRunner.query(`DROP TABLE "users_permissions__permissions"`);
        await queryRunner.query(`DROP INDEX "IDX_e91ef5dc6014ab34d869e5f050"`);
        await queryRunner.query(`DROP INDEX "IDX_cbb464367a03fe9943f677b3a4"`);
        await queryRunner.query(`DROP TABLE "users_groups__groups"`);
        await queryRunner.query(`DROP TABLE "Groups"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Permissions"`);
    }

}
