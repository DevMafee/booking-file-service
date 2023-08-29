import {AclModuleInterface} from "./index";

export const AclMasterSetupPermissions = {
  List: 'List',
  View: 'View',
  Create: 'Create',
  Edit: 'Edit',
  Status: 'Status',
  Delete: 'Delete',
}

export const AclMasterSetupModule: AclModuleInterface<typeof AclMasterSetupPermissions> = {
  moduleName: 'Master_Setup',
  permissions: AclMasterSetupPermissions,
  permissionsTitle: {
    List: "This is Setup list",
    View: "This is Setup view",
    Create: "This is for Setup create",
    Edit: "This is for Setup edit",
    Status: "This is for Setup status",
    Delete: "This is for Setup delete",
  }
}