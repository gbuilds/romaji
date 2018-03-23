const convertRomajiToHiragana = function(string, options) {
  "use strict"

  let hash = {"n":"ん","a":"あ","i":"い","u":"う","e":"え","o":"お","ka":"か","ki":"き","ku":"く","ke":"け","ko":"こ","sa":"さ","shi":"し","su":"す","se":"せ","so":"そ","ta":"た","chi":"ち","tsu":"つ","te":"て","to":"と","na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の","ha":"は","hi":"ひ","fu":"ふ","he":"へ","ho":"ほ","ma":"ま","mi":"み","mu":"む","me":"め","mo":"も","ya":"や","yu":"ゆ","yo":"よ","ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ","wa":"わ","wi":"ゐ","we":"ゑ","wo":"を","ga":"が","gi":"ぎ","gu":"ぐ","ge":"げ","go":"ご","za":"ざ","ji":"じ","zu":"ず","ze":"ぜ","zo":"ぞ","da":"だ","di":"ぢ","du":"づ","de":"で","do":"ど","ba":"ば","bi":"び","bu":"ぶ","be":"べ","bo":"ぼ","pa":"ぱ","pi":"ぴ","pu":"ぷ","pe":"ぺ","po":"ぽ"};
  let output = "";
  let length = string.length;

  if (options && options['skipObsolete']) {
    delete hash['wi'];
    delete hash['we'];
  }

  while (string.length > 0) {
    let test = string.substr(0, 3);
    if (hash[test]) {
      output += hash[test];
      string = string.substring(3);
      continue;
    }
    test = string.substring(0, 2);
    if (hash[test]) {
      output += hash[test];
      string = string.substring(2);
      continue;
    }
    test = string.substring(0, 1);
    if (hash[test]) {
      output += hash[test];
      string = string.substring(1);
      continue;
    };
    if (test === ' ') {
      string = string.substring(1);
      continue;
    }
    output = "invalid input";
    break;
  }
  console.log(output);
}

// initial cases

convertRomajiToHiragana('konnichiha');
convertRomajiToHiragana('oyasuminasai');
convertRomajiToHiragana('yoroshiku ne');
convertRomajiToHiragana('kana');
convertRomajiToHiragana('kan a');
convertRomajiToHiragana('cheese');
convertRomajiToHiragana('exodia');

// cases for obsolete

convertRomajiToHiragana('uwi no okuyama');
convertRomajiToHiragana('wehi mo sesu');
convertRomajiToHiragana('uwi no okuyama', { skipObsolete: true });
convertRomajiToHiragana('wehi mo sesu', { skipObsolete: true });
