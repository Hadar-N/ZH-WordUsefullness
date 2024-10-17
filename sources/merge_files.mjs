import * as fs from 'fs';
import { createInterface } from 'readline';
import * as consts from '../src/assets/consts.js';

const MINI_DICTIONARY_PATH = 'sources\\cedict_ts.u8'
const JSON_HSK_PATH = 'sources/hsk.json'
const JSON_TOCFL_PATH = 'sources/tocfl.json'
const JSON_FREQ_PATH = 'sources/word_frequency.json'

const EXPORT_FILE_PATH = 'sources/merged_dict.csv'

const dictnames = ['traditional', 'simplified', 'pinyin', 'meaning'];
const datanames = ['frequency', 'hsk2', 'hsk3', 'tocfl']

const createExtraDataMap = () => {
    let json_hsk = JSON.parse(fs.readFileSync(JSON_HSK_PATH)).list;
    let json_tocfl = JSON.parse(fs.readFileSync(JSON_TOCFL_PATH)).list;
    let json_freq = JSON.parse(fs.readFileSync(JSON_FREQ_PATH)).list;

    const map_freq = {};
    for (let w of Object.entries(json_freq)) map_freq[w[1]] = { frequency: w[0] };
    for (let w of json_hsk) map_freq[w.word] ? map_freq[w.word].hsk = w.level : map_freq[w.word] = { hsk: w.level };
    for (let w of json_tocfl) map_freq[w.word] ? map_freq[w.word].tocfl = w.level : map_freq[w.word] = { tocfl: w.level };
    // adding the word as new, as trad. will later check data and get all relevant stuff from dictionary that has both versions.

    return map_freq;
}

const get_relevant = (propname, extra_a, extra_b) => extra_a[propname] || extra_b[propname] || "";
const switch_commas = (str) => consts.REPLACED_CHARS.reduce((acc,curr) => acc.replaceAll(curr[0], curr[1]), str);
const objToCSV = (dict_entry, extra_a, extra_b) => {
    let hskres = {old: "", new: "", ...(get_relevant('hsk', extra_a, extra_b) || {})};
    return `\n` + dictnames.map(n => switch_commas(dict_entry[n])).join(',') + `,${get_relevant('frequency', extra_a, extra_b)},${hskres.old},${hskres.new},${get_relevant('tocfl', extra_a, extra_b)}`
}

const combineData = (dict, map) => {
    const find_hanzi = '[^# A-Za-z0-9-,:\/\.\?\!\(\)\=]';
    const re_parse_to_entries = new RegExp(`^[ \r\n]*(?<${dictnames[0]}>${find_hanzi}+) (?<${dictnames[1]}>${find_hanzi}+) \\[(?<${dictnames[2]}>.+)?\\] \\/(?<${dictnames[3]}>.+)\\/`, 'mg')

    let csv = ``;
    let curr_parsed = re_parse_to_entries.exec(dict);
    let extra_data_simp, extra_data_trad;
    while (curr_parsed) {
        extra_data_simp = map[curr_parsed.groups[dictnames[0]]] || {};
        extra_data_trad = map[curr_parsed.groups[dictnames[1]]] || {};
        csv += objToCSV(curr_parsed.groups, extra_data_simp, extra_data_trad);
        curr_parsed = re_parse_to_entries.exec(dict);
    }
    return csv;
}

const extraDataMapped = createExtraDataMap();

const outputStream = fs.createWriteStream(EXPORT_FILE_PATH, { flags: 'a' });
const dictionaryStream = fs.createReadStream(MINI_DICTIONARY_PATH, { encoding: 'utf8' });

let isfirst = true;

const addheader = (str) => isfirst? `${dictnames.join(',')},${datanames.join(',')}${str}` : str;

const rl = createInterface({
    input: dictionaryStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    const csvChunk = combineData(line, extraDataMapped);
    outputStream.write(addheader(csvChunk)); // Append each processed chunk to the CSV file
    isfirst = false;
});

rl.on('close', () => {
    outputStream.end();
    console.log("Finished processing the file.");
});

outputStream.on('finish', () => {
    console.log("CSV file has been written successfully.");
});

outputStream.on('error', (err) => {
    console.error("Error writing to CSV:", err);
});
