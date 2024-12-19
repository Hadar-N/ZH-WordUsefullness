import Papa from 'papaparse';
import { tw2cn, cn2tw } from 'cjk-conv';
import { TOTAL_FREQUENCY_ENTRIES, TOCFL_LEVEL_MAP, MAX_RELATED, REPLACED_CHARS } from './consts'

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
    return {re_complete: new RegExp(`^${res}$`), re_includes: new RegExp(`.*${res}.*`), re_chars: new RegExp(`^[${text}]$`)};
}

export const calcimportance = (word) => {
    const freq = (Number(word.frequency) || TOTAL_FREQUENCY_ENTRIES)/TOTAL_FREQUENCY_ENTRIES;
    const hsk = !word.hsk2 && !word.hsk3 ? 1 : (Number(word.hsk2 || 7) + Number(word.hsk3 == "7+" ? 7 : (word.hsk3 || 10)))/(7+10);
    const tocfl = (TOCFL_LEVEL_MAP[word.tocfl] || 6)/6;
    return(freq+hsk+tocfl)
}

const chinesefindword = (dict,text) => {
    const {re_complete, re_includes, re_chars} = createregexps(text);
    const re_varients = /^((old )?variant|surname).*/
    let specific = [], variants = [], chars = [], including = [];
    dict.forEach(w => {
        if (w.simplified.match(re_complete) || w.traditional.match(re_complete)) specific.push(w);
        else if (w.simplified.match(re_chars) || w.traditional.match(re_chars)) chars.push(w)
        else if (w.simplified.match(re_includes) || w.traditional.match(re_includes)) including.push(w);
    })
    including = including.sort((a,b)=> calcimportance(a) > calcimportance(b) ? 1 : -1).slice(0, MAX_RELATED);
    if(specific.length > 1) {
        variants = specific.filter(i => i.meaning.match(re_varients));
        specific = specific.filter(i => !i.meaning.match(re_varients));
    }
    let specific_obj = reorgspecific(specific);
    let chars_in_order = [], temp;
    Array.from(text).forEach(c => {
        temp = chars.filter(i => i.simplified === c || i.traditional === c);
        if (temp.length > 1) {
            temp.filter(i => !i.meaning.match(re_varients))
        }
        chars_in_order.push(...temp);
    })
    return({specific : specific_obj, including, variants, chars: chars_in_order});
}

const reorgspecific = arr => {
    const res= {};
    for (let def of arr) {
        if (res[def.traditional]) {res[def.traditional].data.push({meaning: def.meaning, pinyin: def.pinyin})}
        else {res[def.traditional] = {
            traditional:def.traditional,
            simplified: def.simplified,
            frequency: def.frequency,
            hsk2: def.hsk2,
            hsk3: def.hsk3,
            tocfl: def.tocfl,
            data: [{meaning: def.meaning, pinyin: def.pinyin}]
        }}
    }
    return res;
}

const englishfindword = (dict,text) => {
    const re_word = new RegExp(`^(?:.* /?)?${text.toLowerCase()}(?:/? .*)$`);
    let relevant = dict.filter(w => {
        if (w.meaning.toLowerCase().match(re_word)) return true;
        return false;
    }).sort((a,b)=> calcimportance(a) > calcimportance(b) ? 1 : -1);
    relevant = relevant.slice(0, MAX_RELATED*2);
    const res = relevant.map(i => {return {specific: reorgspecific([i])}})
    return(res);
}

export const findWord = (dict,text) => {
    const res = (text.match(/^[a-zA-Z]/)) ? englishfindword(dict,text) : text.split(' ').filter(w => w.trim()).map(w => chinesefindword(dict, w.trim()));
    return res
}

export const fixDef = (str) => {
    return REPLACED_CHARS.reduce((acc, i) => acc.replaceAll(i[1], i[0]), str)
}