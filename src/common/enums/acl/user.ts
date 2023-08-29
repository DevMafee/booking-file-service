import {AclModuleInterface} from "./index";
export const AclUserPermissions = {
  List: 'List',
  View: 'View',
  Create: 'Create',
  Edit: 'Edit',
  Status: 'Status',
  Delete: 'Delete',
  Approve: 'Approve',
}

export const AclUserModule: AclModuleInterface<typeof AclUserPermissions> = {
  moduleName: "User",
  permissions: AclUserPermissions,
  permissionsTitle: {
    List: "This is user list",
    View: "This is user view",
    Create: "This is for user create",
    Edit: "This is for user edit",
    Status: "This is for user status",
    Delete: "This is for user delete",
    Approve: "This is for Approval",
  }
}