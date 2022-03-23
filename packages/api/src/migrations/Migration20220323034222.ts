import { Migration } from '@mikro-orm/migrations';

export class Migration20220323034222 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "unique_slug" varchar(64) not null;');
    this.addSql('alter table "user" add constraint "user_unique_slug_unique" unique ("unique_slug");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_unique_slug_unique";');
    this.addSql('alter table "user" drop column "unique_slug";');
  }

}
