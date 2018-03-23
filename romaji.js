const convertRomajiToHiragana = function(string, options) {
  "use strict"

  let hash = {"n":"ん","a":"あ","i":"い","u":"う","e":"え","o":"お","ka":"か","ki":"き","ku":"く","ke":"け","ko":"こ","sa":"さ","shi":"し","su":"す","se":"せ","so":"そ","ta":"た","chi":"ち","tsu":"つ","te":"て","to":"と","na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の","ha":"は","hi":"ひ","fu":"ふ","he":"へ","ho":"ほ","ma":"ま","mi":"み","mu":"む","me":"め","mo":"も","ya":"や","yu":"ゆ","yo":"よ","ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ","wa":"わ","wi":"ゐ","we":"ゑ","wo":"を","ga":"が","gi":"ぎ","gu":"ぐ","ge":"げ","go":"ご","za":"ざ","ji":"じ","zu":"ず","ze":"ぜ","zo":"ぞ","da":"だ","di":"ぢ","du":"づ","de":"で","do":"ど","ba":"ば","bi":"び","bu":"ぶ","be":"べ","bo":"ぼ","pa":"ぱ","pi":"ぴ","pu":"ぷ","pe":"ぺ","po":"ぽ"};
  let output = "";
  let length = string.length;
  let isFirstSyllable = true;
  let geminate;
  const smallTsu = 'っ';

  if (options && options['skipObsolete']) {
    delete hash['wi'];
    delete hash['we'];
  }

  const checkGeminates = function(string) {
    if (isFirstSyllable) {
      return false;
    }
    let singleLetterGeminateChars = { "k":true, "s":true, "t":true, "p":true };
    let firstChar = string[0];
    let secondChar = string[1];
    let nextChars = string.substring(1);
    let matching = firstChar === secondChar;
    if (matching && singleLetterGeminateChars[firstChar] && hash[nextChars]) {
      return smallTsu + hash[nextChars];
    }
    return false;
  }

  while (string.length > 0) {
    let test = string.substr(0, 4);
    if (test === 'cchi') {
      output += (smallTsu + hash['chi']);
      isFirstSyllable = false;
      string = string.substring(4);
      continue;
    }
    test = string.substr(0, 3);
    if (hash[test]) {
      output += hash[test];
      isFirstSyllable = false;
      string = string.substring(3);
      continue;
    }
    geminate = checkGeminates(test);
    if (geminate) {
      output += geminate;
      isFirstSyllable = false;
      string = string.substring(3);
      geminate = undefined;
      continue;
    }
    test = string.substring(0, 2);
    if (hash[test]) {
      output += hash[test];
      isFirstSyllable = false;
      string = string.substring(2);
      continue;
    }
    geminate = checkGeminates(test);
    if (geminate) {
      output += geminate;
      isFirstSyllable = false;
      string = string.substring(2);
      geminate = undefined;
      continue;
    }
    test = string.substring(0, 1);
    if (hash[test]) {
      output += hash[test];
      isFirstSyllable = false;
      string = string.substring(1);
      continue;
    };
    if (test === ' ') {
      string = string.substring(1);
      isFirstSyllable = true;
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

// cases for geminates

convertRomajiToHiragana('matte');
convertRomajiToHiragana('hippu');
convertRomajiToHiragana('kocchi');
convertRomajiToHiragana('summo');
convertRomajiToHiragana('ma tte');
