import { AclList } from ".";

enum SeederRole {
    admin = 'admin',
    admin2 = 'admin2'
}
export const defaultAdminRoleModules = [
    {
        Role:SeederRole.admin,
        Module: AclList.map(module=>module.moduleName)
    },
    {
        Role:SeederRole.admin2,
        Module:[]
    },
];

export const masterAdminUser = [
    {
        Name:'Master Admin',
        UserName: 'admin',
        Password: '123456'
    }
];