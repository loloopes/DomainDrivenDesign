import { MigrationInterface, QueryRunner } from 'typeorm';

export class ship1657429154316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`SCP\`.\`ship\` (
      \`id\` INT AUTO_INCREMENT,
      \`fuel_capacity\` INT NULL,
      \`fuel_level\` INT NULL,
      \`cargo_capacity\` INT NULL,
      PRIMARY KEY (\`id\`));`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`ship\`;`);
  }
}
