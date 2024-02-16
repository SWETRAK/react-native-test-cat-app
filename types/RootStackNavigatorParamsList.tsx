import IFactDto from "../models/dto/IFactDto";

export type RootStackNavigatorParamsList = {
    Home: undefined;
    Profile: undefined | IFactDto;
};
