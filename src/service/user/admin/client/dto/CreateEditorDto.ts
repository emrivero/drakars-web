import { CreateAdminDto } from "./CreateAdminDto";

export class CreateEditorDto extends CreateAdminDto {
  officeId: number;
  searchOffice: string;
}
