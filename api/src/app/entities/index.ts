import {PermissionEntity} from "./permission.entity";
import {GroupEntity} from "./group.entity";
import {UserEntity} from "./user.entity";
import {getRepository} from "typeorm";

export async function fetchUser(id: string | number): Promise<any> {
	return await getRepository(UserEntity).findOne(id);
}

export {
	PermissionEntity,
	GroupEntity,
	UserEntity,
};
