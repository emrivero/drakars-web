import { OfficeVm } from "../../client/view/OfficeVm";
import { CityWithOfficesVO } from "../model/CityWithOfficesVO";

export class CityWithOffices {
  constructor(private offices: OfficeVm[]) {}

  static create(offices: OfficeVm[]) {
    return new CityWithOffices(offices);
  }

  get data(): CityWithOfficesVO[] {
    const cities: CityWithOfficesVO[] = [];

    this.offices.forEach((office) => {
      const {
        municipality: { city },
      } = office;

      const foundVO = cities.find((obj) => obj.city.id === city.id);

      const instanceOffice = OfficeVm.create(office);
      if (!foundVO) {
        cities.push({
          city: office.municipality.city,
          offices: [instanceOffice],
        });
      } else {
        foundVO.offices.push(instanceOffice);
      }
    });

    return cities.sort((c1, c2) => c1.city.name.localeCompare(c2.city.name));
  }
}
