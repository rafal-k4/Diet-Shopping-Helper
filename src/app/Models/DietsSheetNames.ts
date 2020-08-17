import { columnName } from '../Infrastructure/Decorators';

export class DietsSheetNames {
    @columnName('SheetNameId')
    idName: string;
    @columnName('SheetDisplayName')
    DisplayName: string;

    constructor(idName: string = '', displayName: string = '') {
        this.idName = idName;
        this.DisplayName = displayName;
    }
}
