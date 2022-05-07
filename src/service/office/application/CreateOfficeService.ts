import { changeState } from "../../../store";
import { CityClient } from "../../city/client";
import { MunicipalityClient } from "../../municipality/client";
import { OfficeClient } from "../client";
import { OfficeDto } from "../client/dto/OfficeDto";
import { getOfficeState } from "../state";
import { NewOffice } from "./model/NewOffice";

export class CreateOfficeService {
  private readonly client = new OfficeClient();
  private readonly cityClient = new CityClient();
  private readonly municipalityClient = new MunicipalityClient();

  create() {
    const { newOffice } = getOfficeState();
    const office = NewOffice.create(newOffice);
    return this.client.post("", office);
  }

  async searchCity(name: string) {
    if (name) {
      const { data } = await this.cityClient.searchByName(name);

      this.setState({ cities: data, searchCity: name });
    }
  }

  async searchMunicipality(name: string) {
    const {
      newOffice: { cityId },
    } = getOfficeState();

    if (cityId > -1) {
      const { data } = await this.municipalityClient.getByCity(cityId, name);
      this.setState({ municipalities: data, searchMunicipality: name });
    }
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
        state.newOffice = { ...state.newOffice, ...dto };
      }
    });
  }
}
