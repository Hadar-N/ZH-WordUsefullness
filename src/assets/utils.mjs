import Papa from 'papaparse';

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
    let parsedData = await parseFile("/public/merged_dict.csv");

    return parsedData;
}