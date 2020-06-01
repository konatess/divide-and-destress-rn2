export class Project {
    constructor(ti, sD, dD, sU, eU, cU, uN, tR, tag, freq, time) {
        this._title = ti;
        this._startDate = sD;
        this._dueDate = dD;
        this._startUnit = sU || 1;
        this._endUnit = eU;
        this._currentUnit = cU;
        this._unitName = uN;
        this._totalVsRange = tR || false;
        this._tags = tag;
        this._frequency = freq || 0;
        this._time = time || 'default';
        this._textLimit = /([\w'\- _/])/g //change this to a static method instead?
    }  
    get title() {
        return this._title
    }
    set title(newtitle) {
        if (this._textLimit.test(newtitle)) {
            this._title = newtitle;
        }
        else {
            console.log('title error');
        }
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(date) {
        this._startDate = date;
    }
    get dueDate() { 
        return this._dueDate;
    }
    set dueDate(date) {
        this._dueDate = date;
    }
    get startUnit() {
        return this._startUnit;
    }  
    set startUnit(number) {
        this._startUnit = number;
    }  
    get endUnit() {
        return this._endUnit;
    }
    set endUnit(number) {
        this._endUnit = number;
    }
    get currentUnit() {
        return this._currentUnit;
    }
    set currentUnit(number) {
        this._currentUnit = number;
    }
    get unitName() {
        return this._unitName;
    }
    set unitName(unit) {
        this._unitName = unit;
    }
    get totalVsRange() {
        return this._totalVsRange;
    }
    set totalVsRange(boolean) {
        this._totalVsRange = boolean;
    }
    get tags() {
        return this._tags;
    }
    set tags(tagsArr) {
        this._tags = tagsArr;
    }
    get freq() {
        return this._frequency;
    }
    set freq(number) {
        this._frequency = number;
    }
    get time() {
        return this._time;
    }
    set time(timestring) {
        this._time = timestring;
    }
}