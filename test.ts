const getUrlParams = (path: string, pattern: string) => {
    const pathItems: string[] = (path || '').split('/');
    const patternItems: string[] = (pattern || '').split('/');
    const result: {[key: string]: string} = {};
  
    for (let i: number = 0; i < pathItems.length; i++) {
        const pathItem = pathItems[i];
        const patternItem = patternItems[i];

        if (patternItem.startsWith(':')) {
            const key: string = patternItem.substring(1);

            result[key] = pathItem;
        } else if (patternItem !== pathItem) {
            break;
        }
    }

    return result;
};

const objectDiff = (source: Data, target: Data) => {
    const targetKeys: string[] = Object.keys(target);
    const result = {};

    for (let i: number = 0; i < targetKeys.length; i += 1) {
        if (source[targetKeys[i]] !== target[targetKeys[i]]) {
            const value = {
                [targetKeys[i]]: {
                    old: source[targetKeys[i]],
                    new: target[targetKeys[i]]
                }
            };

            Object.assign(result, value);
        }
    }

    return result;
};


//  ------------------- //


//  getUrlParams  //
const pattern = 'staticOne/:paramOne/staticTwo/staticThree/:paramTwo';

// does not match the first static part: staticOne <> staticZero, returns {}
console.log(getUrlParams('staticZero/one', pattern));

// matched the first static and param part, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one', pattern));

// matched the first static and param part with extra, returns {paramOne: 'one'}
console.log(getUrlParams('staticOne/one/staticThree/three', pattern));

// matched the first, second and third static + param parts
// returns {paramOne: 'one', paramTwo: 'two'}
console.log(getUrlParams('staticOne/one/staticTwo/staticThree/two', pattern));


//  objectDiff  //
type Data = {id: string, name?: string, count: number};

const before: Data = {id: '2', count: 0} 
const after: Data = {id: '1', name: 'khan', count: 1}

// should read {name: {old: undefined, new: 'khan'}, count: {old: 0, new: 1}}
console.log(objectDiff(before, after))
