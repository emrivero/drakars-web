import { Client } from "../../../base/client";
import { VehicleImageVm } from "./view/VehicleImageVm";

export class VehicleImageClient extends Client<
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
> {
  constructor() {
    super("vehicle-image");
  }
  async paginateVehicleImage(size: number, page: number) {
    return await this.genericRequest<{
      results: VehicleImageVm[];
      count: number;
    }>({
      method: "get",
      resource: `paginate?${new URLSearchParams({
        size: `${size}`,
        page: `${page}`,
      }).toString()}`,
    });
  }

  async create(formData: FormData) {
    return this.genericRequest<{ result: string }, FormData>({
      method: "post",
      body: formData,
      resource: "",
      options: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  }
}
