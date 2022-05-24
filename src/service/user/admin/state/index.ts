import { get } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { CreateAdminDto } from "../client/dto/CreateAdminDto";
import { CreateEditorDto } from "../client/dto/CreateEditorDto";
import { AdminVm } from "../client/view/AdminVm";
import { EditorVm } from "../client/view/EditorVm";

export interface AdminUserProps {
  newAdmin: CreateAdminDto;
  newEditor: CreateEditorDto & {
    offices: OfficeVm[];
  };
  rentInfo: RentDataConfirmVm;
  rentRefValue: string;
  paginatedEditors: {
    data: PaginateVm<EditorVm>;
    paginationOptions: PaginateOpts;
  };
  paginatedAdmins: {
    data: PaginateVm<AdminVm>;
    paginationOptions: PaginateOpts;
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
  rentInfo: null,
  rentRefValue: "",
  paginatedEditors: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
  paginatedAdmins: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
};

export const getAdminState: () => AdminUserProps = () => {
  const {
    newAdmin,
    newEditor,
    rentInfo,
    rentRefValue,
    paginatedEditors,
    paginatedAdmins,
  } = get();

  return {
    newAdmin,
    newEditor,
    rentInfo,
    rentRefValue,
    paginatedEditors,
    paginatedAdmins,
  };
};
