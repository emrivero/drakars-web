import { get } from "../../../../store";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { CreateAdminDto } from "../client/dto/CreateAdminDto";
import { CreateEditorDto } from "../client/dto/CreateEditorDto";

export interface AdminUserProps {
  newAdmin: CreateAdminDto;
  newEditor: CreateEditorDto & {
    offices: OfficeVm[];
  };
}

export const AdminUserSlice: AdminUserProps = {
  newAdmin: {
    email: "",
    family_name: "",
    name: "",
  },
  newEditor: {
    offices: [],
    email: "",
    family_name: "",
    name: "",
    officeId: null,
    searchOffice: "",
  },
};

export const getAdminState: () => AdminUserProps = () => {
  const { newAdmin, newEditor } = get();

  return { newAdmin, newEditor };
};
