import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("Permissions")
export class PermissionEntity {
	@PrimaryColumn()
	codeName!: string;

	@Column()
	description!: string;
}
