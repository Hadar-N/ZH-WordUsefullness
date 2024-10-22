# LexiTier Chinese

LexiTier Chinese is an open-source project meant to include within a Chinese vocabulary other relevant information, including frequency, HSK and TOCFL level. [Web App](https://lexitierchinese.netlify.app/)

## Description
The project is based off a csv file `public/merged_dict.csv` made to include all relevant data.\
A [Front-End](https://lexitierchinese.netlify.app/) (built with Vue.js) was developed to provide an easy-to-use interface for searching and displaying the data.

### TOCFL levels map:
TOCFL exams are divided into 6 levels, but the list includes 5 levels alone, as level 6 does not have a defined vocabulary.
```javascript
{
    "入門級": 1,
    "基礎級": 2,
    "進階級": 3,
    "高階級": 4,
    "流利級": 5
}
```

## Sources

All files- including the dictionary and vocabulary lists- are originated from online-available resources.\
The data in `merged_dict.csv` can be traced back to the original resources below:
- Chinese dictionary: "CC-CEDICT" by mdbg, Oct 2024 ([link](https://www.mdbg.net/chinese/dictionary?page=cc-cedict))
=> merged_dict: "traditional", "simplified", "pinyin" & "meaning" columns
- HSK list: "complete-hsk-vocabulary" by Dr.Kameleon, Oct 2023 ([link](https://github.com/drkameleon/complete-hsk-vocabulary))
=> merged_dict: "hsk2" & "hsk3" columns
- TOCFL list: "Vocabulary List Traditional Characters: Vokabelliste" by Taipei Economic and Cultural Office in Austria, 2020 ([link](https://www.roc-taiwan.org/at_de/post/634.html))
=> merged_dict: "tocfl" column'\
- Frequency list: "SUBTLEX-CH: Chinese word and character frequencies based on film subtitles" by Cai, Q., & Brysbaert, M., 2010 ([link](https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexch))
=> merged_dict: "frequency" column


## License

MIT License

Copyright (c) 2024 Hadar Natanson (aka Hadar-N)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
