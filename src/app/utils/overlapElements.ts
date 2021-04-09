/**
 * Will overlap elements from top to bottom
 * the "highest"/ most foreground element will be elements[0]
 * @param elements 
 * @param marginTop The amount of marginTop to use for overlapping. Dont forget to specify a negative value!
 */
export const overlapElements = (elements: HTMLElement[], marginTop: string) => {
    const total = elements.length;
    let counter = total+1;
    elements.forEach((e, index) => {
        if (e === undefined) {
            throw new Error('Missing element. Can\'t overlap elements with an undefined element');
        }
        e.style.zIndex = `${counter--}`;
        e.style.position = 'relative';
        if (index !== 0) {
            e.style.marginTop = marginTop;
        }
    })
}