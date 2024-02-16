import Axios, {AxiosObservable} from "axios-observable"
import IFactDto from "../models/dto/IFactDto";

export const getFact = (): AxiosObservable<IFactDto> => {
    return Axios.get<IFactDto>("https://catfact.ninja/fact");
}