import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";

@Entity("users")
class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert() //Antes de inserir no BD, sempre executa oq em embaixo
    @BeforeUpdate() //Antes de atualizar no BD, sempre executa oq em embaixo
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8);
    }
}

export default User;