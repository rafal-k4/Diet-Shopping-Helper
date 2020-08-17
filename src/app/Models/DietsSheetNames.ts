import { columnName } from '../Infrastructure/Decorators';

export class DietsSheetNames {
    @columnName('SheetNameId')
    id: string;
    @columnName('SheetDisplayName')
    displayName: string;

    constructor(id: string = '', displayName: string = '') {
        this.id = id;
        this.displayName = displayName;
    }
}
