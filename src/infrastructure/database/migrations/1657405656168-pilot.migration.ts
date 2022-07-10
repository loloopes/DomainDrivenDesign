import { MigrationInterface, QueryRunner } from 'typeorm';

export class pilot1657374922568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`SCP\`.\`pilot\` (
      \`id\` INT NOT NULL,
      \`certification\` VARCHAR(255) NULL,
      \`name\` VARCHAR(255) NULL,
      \`age\` INT NULL,
      \`current_planet\` VARCHAR(255) NULL,
      \`credits\` INT NULL,
      PRIMARY KEY (\`id\`));`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`pilot\`;`);
  }
}
