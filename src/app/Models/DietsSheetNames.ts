import { columnName } from '../Infrastructure/Decorators';

export class DietsSheetNames {
    @columnName('SheetNameId')
    Id: string;
    @columnName('SheetDisplayName')
    DisplayName: string;
}