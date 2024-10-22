import Papa from 'papaparse';
import { tw2cn, cn2tw } from 'cjk-conv';
import { TOTAL_FREQUENCY_ENTRIES, TOCFL_LEVEL_MAP, MAX_RELATED } from './consts'

export const fetchcsv = async () => {
    const parseFile = (path) => {
        return new Promise(resolve => {
            Papa.parse(path, {
                download: true,
                header: true,
                complete: (log) => resolve(log.data)
            });
        });
    };
    let parsedData = await parseFile("/merged_dict.csv");

    return parsedData;
}

const createregexps = (text) => {
    const simp = tw2cn(text);
    const trad = cn2tw(text);
    let res = '';
    let char_t, char_s;
    for (let i = 0; i< simp.length; i++) {
        char_s = simp.charAt(i);
        char_t = trad.charAt(i);
        if (char_s === char_t) res += char_t;
        else res+= `[${char_s}${char_t}]`;
    }
    return {re_complete: new RegExp(`^${res}$`), re_includes: new RegExp(`.*${res}.*`)};
}

const calcimportance = (word) => {
    const freq = (Number(word.frequency) || TOTAL_FREQUENCY_ENTRIES)/TOTAL_FREQUENCY_ENTRIES;
    const hsk = !word.hsk2 && !word.hsk3 ? 1 : (Number(word.hsk2 || 7) + Number(word.hsk3 == "7+" ? 7 : (word.hsk3 || 10)))/(7+10);
    const tocfl = (TOCFL_LEVEL_MAP[word.tocfl] || 6)/6;
    return(freq+hsk+tocfl)
}

export const findWord = (dict,text) => {
    const {re_complete, re_includes} = createregexps(text);
    let specific = [];
    let variants = [];
    let including = dict.filter(w => {
        if (w.simplified.match(re_complete) || w.traditional.match(re_complete)) specific.push(w)
        else if (w.simplified.match(re_includes) || w.traditional.match(re_includes)) return true;
        return false;
    })
    if(specific.length > 1) {
        const re_varients = /^(old )?variant.*/
        variants = specific.filter(i => i.meaning.match(re_varients));
        specific = specific.filter(i => !i.meaning.match(re_varients));
    }
    including = including.sort((a,b)=> calcimportance(a) > calcimportance(b) ? 1 : -1).slice(0, MAX_RELATED);
    return({specific, including, variants});
}