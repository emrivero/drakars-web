import { changeState } from "../../../../store";
import { OfficeClient } from "../../../office/client";
import { AdminClient } from "../client";
import { CreateAdminDto } from "../client/dto/CreateAdminDto";
import { CreateEditorDto } from "../client/dto/CreateEditorDto";
import { AdminUserSlice, getAdminState } from "../state";

export class CreateAdminService {
  private readonly officeClient = new OfficeClient();
  private readonly client = new AdminClient();
  private static instance: CreateAdminService = null;
  private constructor() {
    //
  }

  static create(): CreateAdminService {
    if (!this.instance) {
      this.instance = new CreateAdminService();
    }
    return this.instance;
  }

  async searchOffice(name: string) {
    if (name) {
      const { data } = await this.officeClient.searchByName(name);

      changeState(({ newEditor }) => {
        newEditor.offices = data;
        newEditor.searchOffice = name;
      });
    }
  }

  async fetchOffice(name: string) {
    if (name) {
      const { data } = await this.officeClient.searchByName(name);

      return { data, name };
    }
  }

  async clearSearch() {
    changeState(({ newEditor }) => {
      newEditor.offices = [];
      newEditor.officeId = null;
      newEditor.searchOffice = "";
    });
  }

  setAdminState(data: Partial<CreateAdminDto>) {
    changeState((state) => {
      state.newAdmin = {
        ...state.newAdmin,
        ...data,
      };
    });
  }

  setEditorState(data: Partial<CreateEditorDto>) {
    changeState((state) => {
      state.newEditor = {
        ...state.newEditor,
        ...data,
      };
    });
  }

  async createAdmin() {
    const { newAdmin } = getAdminState();

    const response = await this.client.post("create", newAdmin);
    changeState((state) => {
      state.newAdmin = AdminUserSlice.newAdmin;
    });

    return response;
  }

  async createEditor() {
    const { newEditor } = getAdminState();

    const response = await this.client.post("editor/create", newEditor);
    changeState((state) => {
      state.newEditor = AdminUserSlice.newEditor;
    });

    return response;
  }

  clear() {
    changeState((state) => {
      state.newEditor = AdminUserSlice.newEditor;
    });
    changeState((state) => {
      state.newAdmin = AdminUserSlice.newAdmin;
    });
  }
}
