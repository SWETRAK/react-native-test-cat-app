import IFactDto from "../models/dto/IFactDto";
import {Observable} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";

export const getFact = (): Observable<AjaxResponse<IFactDto>> => {
    return ajax.get<IFactDto>("https://catfact.ninja/fact");
}