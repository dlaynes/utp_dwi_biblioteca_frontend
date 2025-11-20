export class PagedQuery {

    constructor(
        private page: number = 0,
        private size: number = 10,
        private sortColumn: string = 'id',
        private sortDirection: 'asc' | 'desc' = 'asc',
        private extraParams: Record<string, any> = {}
    ){

    }

    public build(addQueryPrefix=true){
        let str = `page=${this.page}&size=${this.size}&sort=${this.sortColumn},${this.sortDirection}`;
        for(let key in this.extraParams){
            // TODO: manejar arrays y objetos
            str += `&${key}=${this.extraParams[key].toString()}`;
        }
        return addQueryPrefix ? '?' + str : str;
    }
}

export interface PagedResponse<T> {
    results: T;
    totalItems: number;
    totalPages: number;
    currentPage: number;
}