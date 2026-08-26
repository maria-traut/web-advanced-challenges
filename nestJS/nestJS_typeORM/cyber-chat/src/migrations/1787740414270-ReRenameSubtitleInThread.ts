import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRenamedSubtitleInThread1787740414270 implements MigrationInterface {
  name = "ReRenameSubtitleInThread1787740414270";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(120) NOT NULL, "body" text NOT NULL, "author" varchar(120) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`,
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
      `CREATE TABLE "threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(120) NOT NULL, "body" text NOT NULL, "author" varchar(120) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "subtitleWow" varchar(120))`,
    );
    await queryRunner.query(
      `INSERT INTO "threads"("id", "title", "body", "author", "createdAt") SELECT "id", "title", "body", "author", "createdAt" FROM "temporary_threads"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_threads"`);
  }
}
