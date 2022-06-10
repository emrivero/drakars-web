import { changeState } from "../../../store";
import { CityClient } from "../../city/client";
import { MunicipalityClient } from "../../municipality/client";
import { OfficeClient } from "../client";
import { OfficeDto } from "../client/dto/OfficeDto";
import { getOfficeState, OfficeSlice } from "../state";
import { NewOffice } from "./model/NewOffice";

export class UpdateOfficeService {
  private readonly client = new OfficeClient();
  private readonly cityClient = new CityClient();
  private readonly municipalityClient = new MunicipalityClient();

  async fetch(id: string) {
    const response = await this.client.getById(`${id}`);
    changeState((state) => {
      state.editOffice = {
        id: parseInt(id),
        ...state.editOffice,
        ...response.data,
        cityId: response?.data?.municipality?.city?.id,
        municipalityId: response?.data?.municipality?.id,
        searchMunicipality: response?.data?.municipality.name,
        searchCity: response?.data?.municipality?.city?.name,
        eveningTime:
          !!response?.data?.eveningOpeningTime &&
          !!response?.data?.eveningClosingTime,
      };
    });
    return response;
  }

  async update() {
    const { editOffice } = getOfficeState();
    const office = NewOffice.create(editOffice);
    try {
      const response = await this.client.put(`${editOffice.id}`, office);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async searchCity(name: string) {
    if (name) {
      const { data } = await this.cityClient.searchByName(name);

      this.setState({ cities: data, searchCity: name });
    }
  }

  async searchMunicipality(name: string) {
    if (name) {
      const {
        editOffice: { cityId },
      } = getOfficeState();

      if (cityId > -1) {
        const { data } = await this.municipalityClient.getByCity(cityId, name);
        this.setState({ municipalities: data, searchMunicipality: name });
      }
    }
  }

  clear() {
    this.setState(OfficeSlice.editOffice);
  }

  clearSearch() {
    this.setState({
      cities: [],
      cityId: null,
      municipalities: [],
      municipalityId: null,
      searchCity: "",
      searchMunicipality: "",
    });
  }

  clearMunicipalitySerch() {
    this.setState({
      municipalities: [],
      municipalityId: null,
      searchMunicipality: "",
    });
  }

  setState(dto: Partial<OfficeDto>) {
    changeState((state) => {
      if (dto) {
        state.editOffice = { ...state.editOffice, ...dto };
      }
    });
  }
}
