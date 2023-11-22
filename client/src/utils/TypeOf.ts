import {HentInnbyggerMedNavnResponse} from "../types";

export function instanceOfHentInnbyggerMedNavnResponse(object: any): object is HentInnbyggerMedNavnResponse {
    return 'navn' in object;
}