import { tw2cn, cn2tw } from 'cjk-conv';

const orig_str = '所谓知己知彼百战不殆，作为星际2职业选手，他们在平时练习中不仅要练好自己的本族，还会经常选择其他两个族进行练习，这样可以更加了解本族之外两个种族的运营流程、弱点、真空期等。因此不只有Flash，全世界许多职业选手都会在练习时偶尔使用下别的种族，这也是他们众多练习手段的一种。'
const text = cn2tw(orig_str);

const blah = (aaa) => {
    console.log("aaa", aaa)
}

blah(text);