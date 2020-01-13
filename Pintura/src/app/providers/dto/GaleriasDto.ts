export class GaleriasDto {
    GaleriasId?: number;
    elementesPerPage?: number;
    page?: number;

    constructor(GaleriasId?: number, elementsPerPage?: number, page?: number) {
        this.GaleriasId = GaleriasId;
        this.elementesPerPage = elementsPerPage;
        this.page = page;
    }
}
