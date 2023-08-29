import {AclUserModule} from "./user";
import {AclRoleModule} from "./role";
import { AclMasterSetupModule } from "./master-setup";

export interface AclModuleInterface<T>{
  moduleName: string;
  permissions: T;
  permissionsTitle: T
}

export const aclModuleMeta = <T> (aclModule: AclModuleInterface<T>)=>{
  return {
    moduleName: aclModule.moduleName,
    permissions: aclModule.permissions
  }
}

//setup point 
export const AclList: AclModuleInterface<Record<string, string>>[] = [
  AclUserModule,
  AclRoleModule,
  AclMasterSetupModule,
]