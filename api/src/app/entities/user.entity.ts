import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {PermissionEntity} from "./permission.entity";
import {GroupEntity} from "./group.entity";

@Entity("Users")
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({unique: true, length: 64})
	email!: string;

	@Column({select: false})
	password!: string;

	@Column({length: 50})
	firstName!: string;

	@Column({length: 50})
	lastName!: string;

	@CreateDateColumn()
	createdAt!: number;

	@UpdateDateColumn()
	updatedAt!: number;

	@ManyToMany(type => GroupEntity, group => group.users, {
		eager: true,
	})
	@JoinTable()
	groups!: Array<GroupEntity>;

	@ManyToMany(type => PermissionEntity, {
		eager: true,
	})
	@JoinTable()
	permissions!: Array<PermissionEntity>;
}
