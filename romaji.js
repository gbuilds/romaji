"use strict"

let singleCharacters = {"n":"ん","a":"あ","i":"い","u":"う","e":"え","o":"お","ka":"か","ki":"き","ku":"く","ke":"け","ko":"こ","sa":"さ","shi":"し","su":"す","se":"せ","so":"そ","ta":"た","chi":"ち","tsu":"つ","te":"て","to":"と","na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の","ha":"は","hi":"ひ","fu":"ふ","he":"へ","ho":"ほ","ma":"ま","mi":"み","mu":"む","me":"め","mo":"も","ya":"や","yu":"ゆ","yo":"よ","ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ","wa":"わ","wo":"を","ga":"が","gi":"ぎ","gu":"ぐ","ge":"げ","go":"ご","za":"ざ","ji":"じ","zu":"ず","ze":"ぜ","zo":"ぞ","da":"だ","di":"ぢ","du":"づ","de":"で","do":"ど","ba":"ば","bi":"び","bu":"ぶ","be":"べ","bo":"ぼ","pa":"ぱ","pi":"ぴ","pu":"ぷ","pe":"ぺ","po":"ぽ"};
let specialDigraphs = {"ju":"じゅ","ja":"じゃ","jo":"じょ","shu":"しゅ","sha": "しゃ","sho":"しょ","chu":"ちゅ","cha":"ちゃ","cho":"ちょ"};
const smallTsu = 'っ';
let allCharacterMappings = Object.assign({}, singleCharacters, specialDigraphs);

const convertRomajiToHiragana = function(string, options) {
  let hash = allCharacterMappings;
  if (options && options['includeObsolete']) {
    hash = Object.assign({}, hash, { "wi":"ゐ","we":"ゑ"})
  }

  let output = "";
  let length = string.length;
  let isFirstSyllable = true;
  let geminate, digraph;

  const checkForGeminates = function(string) {
    if (isFirstSyllable) {
      return false;
    }
    let geminatePairs = { "kk":true, "ss":true, "tt":true, "pp":true };
    let firstTwoChars = string.substr(0, 2)
    let nextChars = string.substring(1);
    if (geminatePairs[firstTwoChars] && hash[nextChars]) {
      return smallTsu + hash[nextChars];
    }
    return false;
  }

  const checkForMostDigraphs = function(string) {
    let firstChar = string[0];
    if (firstChar === 'w') {
      return false;
    }
    let firstKana = firstChar + 'i';
    let hiragana = hash[firstKana];
    if (!hiragana) {
      return false;
    }
    let vowels = {'a': 'ゃ', 'u': 'ゅ', 'o': 'ょ'};
    if (string[1] !== 'y') {
      return false;
    }
    let thirdChar = string[2];
    let specialChar = vowels[thirdChar];
    if (specialChar) {
      return hiragana + specialChar;
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
    geminate = checkForGeminates(test);
    if (geminate) {
      output += geminate;
      isFirstSyllable = false;
      string = string.substring(3);
      geminate = undefined;
      continue;
    }
    digraph = checkForMostDigraphs(test);
    if (digraph) {
      output += digraph;
      isFirstSyllable = false;
      string = string.substring(3);
      digraph = undefined;
      continue;
    }
    test = string.substring(0, 2);
    if (hash[test]) {
      output += hash[test];
      isFirstSyllable = false;
      string = string.substring(2);
      continue;
    }
    geminate = checkForGeminates(test);
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

// // cases for obsolete

convertRomajiToHiragana('uwi no okuyama', { includeObsolete: true });
convertRomajiToHiragana('wehi mo sesu', { includeObsolete: true });
convertRomajiToHiragana('uwi no okuyama');
convertRomajiToHiragana('wehi mo sesu');

// // cases for geminates

convertRomajiToHiragana('matte');
convertRomajiToHiragana('hippu');
convertRomajiToHiragana('kocchi');
convertRomajiToHiragana('summo');
convertRomajiToHiragana('ma tte');

// cases for digraphs

convertRomajiToHiragana('kya');
convertRomajiToHiragana('ju');
convertRomajiToHiragana('cho');
convertRomajiToHiragana('wya');
convertRomajiToHiragana('nye');
convertRomajiToHiragana('tya');
convertRomajiToHiragana('shyo');
