import { SetMetadata } from '@nestjs/common';
import {AclModuleInterface, aclModuleMeta} from "../../enums/acl";

export const ADMIN_PERMISSION_KEY = 'Permission';
export const AdminPermission = <T> (aclModule: AclModuleInterface<T>, permissions: (permission: T)=> string)=>{
  const module = aclModuleMeta(aclModule)
  return SetMetadata(ADMIN_PERMISSION_KEY, {moduleName: module.moduleName, permission: permissions(module.permissions)})
}