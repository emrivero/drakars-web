import { get } from "../../../../store";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { CreateAdminDto } from "../client/dto/CreateAdminDto";
import { CreateEditorDto } from "../client/dto/CreateEditorDto";

export interface AdminUserProps {
  newAdmin: CreateAdminDto;
  newEditor: CreateEditorDto & {
    offices: OfficeVm[];
  };
  rentInfo: RentDataConfirmVm;
  rentRefValue: string;
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
  rentInfo: null,
  rentRefValue: "",
};

export const getAdminState: () => AdminUserProps = () => {
  const { newAdmin, newEditor, rentInfo, rentRefValue } = get();

  return { newAdmin, newEditor, rentInfo, rentRefValue };
};
