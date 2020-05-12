export class Project {
    constructor(ti, sD, dD, sU, eU, cU, uN, tR, tag, nS) {
        this._title = ti;
        this._startDate = sD;
        this._dueDate = dD;
        this._startUnit = sU;
        this._endUnit = eU;
        this._currentUnit = cU;
        this._unitName = uN;
        this._totalVsRange = tR;
        this._tags = tag;
        this._notifySettings = nS;
        this._textLimit = /([\w'\- _/])/g //change this to a static method instead?
    }  
    set title(newtitle) {
        if (this._textLimit.test(newtitle)) {
            this._title = newtitle;
        }
        else {
            console.log('title error')
        }
    }
}