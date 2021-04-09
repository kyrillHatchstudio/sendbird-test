/**
 * Global error handler
 */
import { ErrorHandler, Injectable, Inject, Injector } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {

    constructor(
        @Inject(Injector) private readonly injector: Injector
    ) {
        super();
    }

    /**
     * Checks if an object contains a specific (deep) property and will return it
     * @param lvl 
     * @param obj 
     * @returns empty string if no string can be found
     */
    getDeepProperty(p: string, obj: {}, recursiveLevel: number = 0): '' {
        // string is of form <propertyy-name>.<next-level-property-name>....
        const props = p.split('.');
        const prop = props[recursiveLevel];
        if (obj[prop]) {
            if (recursiveLevel == props.length-1) {
                // finished as no deeper can be gone
                if (typeof obj[prop] === 'string') {
                    return obj[prop];
                } else {
                    return '';
                }
            } 
            return this.getDeepProperty(p, obj[prop], recursiveLevel+1);
        } 

        return '';
    }


    /**
    * Extract the error message to display to the user
    * @param error 
    */
    beautifyError(error: any): string {
        var msg = '';
        const DEFAULT_ERROR_MSG = 'An unknown Error occured. If the issue persists, feel free to get in touch with us!';

        // if error is a string, dont do unneccessary deep checking
        if (typeof error === 'string') return error;
        // sorted array from where to retrieve the error from.
        // E.g. will look for a message first in error.error.message, if not found, will look in .error.message
        const retrieveFrom = ['error.message', 'message'];
        var retrieveCounter = 0;
        while (msg === '' && retrieveCounter < retrieveFrom.length) {
            msg = this.getDeepProperty(retrieveFrom[retrieveCounter], error);
            retrieveCounter++;
        }

        return msg ? msg : DEFAULT_ERROR_MSG;
    }

    handleError(error) {
        if (!environment.production) {
            console.error('Not in production:\n Caught Error in CustomErrorHandler');
            console.error(error);
        }
        const msg = this.beautifyError(error);
        console.error(msg);
        //super.handleError(error);
    }

}