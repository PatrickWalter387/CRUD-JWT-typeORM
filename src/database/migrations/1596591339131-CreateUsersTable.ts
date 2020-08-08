import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1596591339131 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'); //Cria a uuid_generate no Pg

        await queryRunner.createTable(new Table({
            name: "users",
            columns:[
                {
                    name: "id",
                    type: "uuid", //tipo do campo
                    isPrimary: true, //Primary Key
                    generationStrategy: "uuid", //Tipo de geracao de valores
                    default: "uuid_generate_v4()", //Mecanismo para gerar o uuid
                },

                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },

                {
                    name: "password",
                    type: "varchar"
                }
            ]
        }));
    }

    //Sempre excluir na ordem inversa da insercao
    //Excluir "de dentro pra fora"
    public async down(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
