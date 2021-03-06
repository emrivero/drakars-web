import { get } from "../../../../store";
import { PaginateVm } from "../../../base/client/view/PaginateVm";
import { PaginateOpts } from "../../../office/application/model/paginate-office";
import { OfficeVm } from "../../../office/client/view/OfficeVm";
import { RentDataConfirmVm } from "../../../rent-car/client/vm/RentDataConfirmVm";
import { VehicleVm } from "../../../vehicle/client/view/VehicleVm";
import { ClientUserVm } from "../../client/client/vm/ClientUserVm";
import { CreateAdminDto } from "../client/dto/CreateAdminDto";
import { CreateEditorDto } from "../client/dto/CreateEditorDto";
import { AdminVm } from "../client/view/AdminVm";
import { EditorVm } from "../client/view/EditorVm";
import { VehicleImageVm } from "../client/view/VehicleImageVm";

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
  paginatedClients: {
    data: PaginateVm<ClientUserVm>;
    paginationOptions: PaginateOpts;
  };
  paginatedAdminVehicles: {
    data: PaginateVm<VehicleVm>;
    paginationOptions: PaginateOpts;
  };
  paginatedRents: {
    data: PaginateVm<RentDataConfirmVm>;
    paginationOptions: PaginateOpts;
  };
  paginatedVehicleImage: {
    data: { results: VehicleImageVm[]; count: number };
    page: number;
    size: number;
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
  paginatedClients: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
  paginatedAdminVehicles: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
  paginatedRents: {
    paginationOptions: {
      currentPage: 0,
      itemsPerPage: 10,
      search: "",
      totalItems: 0,
    },
    data: new PaginateVm(),
  },
  paginatedVehicleImage: {
    data: { results: null, count: 0 },
    page: 0,
    size: 12,
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
    paginatedClients,
    paginatedAdminVehicles,
    paginatedRents,
    paginatedVehicleImage,
  } = get();

  return {
    newAdmin,
    newEditor,
    rentInfo,
    rentRefValue,
    paginatedEditors,
    paginatedAdmins,
    paginatedClients,
    paginatedAdminVehicles,
    paginatedRents,
    paginatedVehicleImage,
  };
};
