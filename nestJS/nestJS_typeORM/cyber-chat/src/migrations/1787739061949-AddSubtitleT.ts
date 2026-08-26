import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubtitleToThread1787739061949 implements MigrationInterface {
  name = "AddSubtitleT1787739061949";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(120) NOT NULL, "body" text NOT NULL, "author" varchar(120) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "subtitle" varchar(120))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_threads"("id", "title", "body", "author", "createdAt") SELECT "id", "title", "body", "author", "createdAt" FROM "threads"`,
    );
    await queryRunner.query(`DROP TABLE "threads"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_threads" RENAME TO "threads"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "threads" RENAME TO "temporary_threads"`,
    );
    await queryRunner.query(
      `CREATE TABLE "threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(120) NOT NULL, "body" text NOT NULL, "author" varchar(120) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "threads"("id", "title", "body", "author", "createdAt") SELECT "id", "title", "body", "author", "createdAt" FROM "temporary_threads"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_threads"`);
  }
}
