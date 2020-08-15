import { columnName } from '../Infrastructure/Decorators';

export class DietsSheetNames {
    @columnName('SheetNameId')
    Id: string;
    @columnName('SheetDisplayName')
    DisplayName: string;

    constructor(Id: string = '', DisplayName: string = ''){
        this.Id = Id;
        this.DisplayName = DisplayName;
    }
}