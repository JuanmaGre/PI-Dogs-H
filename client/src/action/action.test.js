import { filterByTemperaments, alphabeticalOrder, filterByBreeds } from "../action/index";

describe("Actions", () => {
    it('Debería retornar una action con las propiedades type "filterByTemperaments" y payload, su valor lo recibe por argumento:', () => {
        expect(filterByTemperaments("Playful")).toEqual({
            type: "FILTER_BY_TEMPERAMENTS",
            payload: "Playful",
        });
    });
    it('Debería retornar una action con las propiedades type "filterByBreeds" y payload, su valor lo recibe por argumento:', () => {
        expect(filterByBreeds("94a588eb-e98a-43c1-b54a-b5e889660a92")).toEqual({
            type: "FILTER_BY_BREEDS",
            payload: "94a588eb-e98a-43c1-b54a-b5e889660a92",
        });
    });
    it('Debería retornar una action con la propiedad type "alphabeticalOrder" y el payload, su valor lo recibe por argumento:', () => {
        expect(alphabeticalOrder("Terrier")).toEqual({
            type: "ALPHABETICAL_ORDER",
            payload: "Terrier",
        });
    }); 
});