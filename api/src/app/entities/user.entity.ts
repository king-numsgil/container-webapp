import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {UserWithPermissions} from "@foal/typeorm";

@Entity()
export class User extends UserWithPermissions {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({unique: true})
	email!: string;

	@Column({select: false})
	password!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@CreateDateColumn()
	createdAt!: number;

	@UpdateDateColumn()
	updatedAt!: number;
}

export {Group, Permission, DatabaseSession} from "@foal/typeorm";
