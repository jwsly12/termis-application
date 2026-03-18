export class ThermostatStatusDto {
  currentTemperature: number;
  setPoint: number;
  mode: string;
}

export class UpdateSetPointDto {
  setPoint: number;
}

export class UpdateModeDto {
  mode: string;
}
