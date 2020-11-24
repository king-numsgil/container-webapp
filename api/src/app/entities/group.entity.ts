import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {PermissionEntity} from "./permission.entity";
import {UserEntity} from "./user.entity";

@Entity("Groups")
export class GroupEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({unique: true})
	name!: string;

	@ManyToMany(type => UserEntity, user => user.groups)
	users!: Array<UserEntity>;

	@ManyToMany(type => PermissionEntity, {
		eager: true,
	})
	@JoinTable()
	permissions!: Array<PermissionEntity>;
}
