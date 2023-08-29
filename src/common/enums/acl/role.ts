import { AclModuleInterface } from "./index";

export const AclRolePermissions = {
  List: 'List',
  View: 'View',
  Create: 'Create',
  Edit: 'Edit',
  Status: 'Status',
  Delete: 'Delete',
}

export const AclRoleModule: AclModuleInterface<typeof AclRolePermissions> = {
  moduleName: 'Role',
  permissions: AclRolePermissions,
  permissionsTitle: {
    List: "This is role list",
    View: "This is role view",
    Create: "This is for role create",
    Edit: "This is for role edit",
    Status: "This is for role status",
    Delete: "This is for role delete",
  }
}

