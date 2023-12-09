import { getCharacterById } from "./characterRawAPI";
import type { CharAttributes, Character } from "./types";

export function charFormater(character: Character) {
  let retAttr;

  const ret: CharAttributes = {
    general: {
      id: character.id,
      name: character.name,
      profession: character.profession,
      race: character.race,
      gender: character.gender,
      age: character.age,
    },
    statistics: {
      intelligence: character.intelligence,
      ref: character.ref,
      dex: character.dex,
      body: character.body,
      spd: character.spd,
      emp: character.emp,
      cra: character.cra,
      will: character.will,
      luck: character.luck,
      stun: character.stun,
      run: character.run,
      leap: character.leap,
      hp: character.hp,
      sta: character.sta,
      enc: character.enc,
      rec: character.rec,
      punch: character.punch,
      kick: character.kick,
    },
    intelligence: {
      awareness: character.awareness,
      business: character.business,
      deduction: character.deduction,
      education: character.education,
      commonSpeech: character.commonSpeech,
      elderSpeech: character.elderSpeech,
      dwarvenSpeech: character.dwarvenSpeech,
      monsterLore: character.monsterLore,
      socialEtiquette: character.socialEtiquette,
      streetwise: character.streetwise,
      tactics: character.tactics,
      teaching: character.teaching,
      wildernessSurvival: character.wildernessSurvival,
    },
    reflex: {
      brawling: character.brawling,
      dodge: character.dodge,
      melee: character.melee,
      riding: character.riding,
      sailing: character.sailing,
      smallBlades: character.smallBlades,
      staff: character.staff,
      swordsmanship: character.swordsmanship,
    },
    dexterity: {
      archery: character.archery,
      athletic: character.athletic,
      crossbow: character.crossbow,
      sleightOfHand: character.sleightOfHand,
      stealth: character.stealth,
    },
    body: {
      physique: character.physique,
      endurance: character.endurance,
    },
    empathy: {
      charisma: character.charisma,
      deceit: character.deceit,
      fineArt: character.fineArt,
      gambling: character.gambling,
      style: character.style,
      humanPerception: character.humanPerception,
      leadership: character.leadership,
      persuasion: character.persuasion,
      performance: character.performance,
      seduction: character.seduction,
    },
    craft: {
      alchemy: character.alchemy,
      crafting: character.crafting,
      disguise: character.disguise,
      firstAid: character.firstAid,
      forgery: character.forgery,
      pickLock: character.pickLock,
      trapCrafting: character.trapCrafting,
    },
    will: {
      courage: character.courage,
      hexWeaving: character.hexWeaving,
      intimidation: character.intimidation,
      spellCasting: character.spellCasting,
      resistMagic: character.resistMagic,
      resistCoercion: character.resistCoercion,
      ritualCrafting: character.ritualCrafting,
    },
  };

  console.log(ret);
  retAttr = ret;

  return retAttr;
}
