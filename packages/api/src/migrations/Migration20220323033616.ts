import { Migration } from '@mikro-orm/migrations';

export class Migration20220323033616 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "firebase_uid" varchar(255) not null, "display_name" varchar(255) not null, "email" varchar(255) not null, "profile_photo_url" varchar(255) null);');
    this.addSql('alter table "user" add constraint "user_firebase_uid_unique" unique ("firebase_uid");');

    this.addSql('create table "photo" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "original_file_name" varchar(255) not null, "s3path" varchar(255) not null, "mime_type" varchar(255) not null, "size" int not null, "upload_user_id" int null);');

    this.addSql('create table "vehicle" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "vin" varchar(255) not null, "year" int not null, "make" varchar(255) not null, "model" varchar(255) not null, "name" varchar(255) not null, "description" varchar(4096) not null, "is_manual" boolean not null default false, "is_listed" boolean not null default true, "is_electric" boolean not null, "owner_user_id" int not null);');

    this.addSql('alter table "photo" add constraint "photo_upload_user_id_foreign" foreign key ("upload_user_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "vehicle" add constraint "vehicle_owner_user_id_foreign" foreign key ("owner_user_id") references "user" ("id") on update cascade;');
  }

}
