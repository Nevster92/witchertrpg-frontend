export type Character = {
  id: number;
  name: string;
  profession: string;
  race: string;
  gender: string;
  age: number;
  intelligence: number;
  ref: number;
  dex: number;
  body: number;
  spd: number;
  emp: number;
  cra: number;
  will: number;
  luck: number;
  stun: number;
  run: number;
  leap: number;
  hp: number;
  sta: number;
  enc: number;
  rec: number;
  punch: number;
  kick: number;
  awareness: number;
  business: number;
  deduction: number;
  education: number;
  commonSpeech: number;
  elderSpeech: number;
  dwarvenSpeech: number;
  monsterLore: number;
  socialEtiquette: number;
  streetwise: number;
  tactics: number;
  teaching: number;
  wildernessSurvival: number;
  brawling: number;
  dodge: number;
  melee: number;
  riding: number;
  sailing: number;
  smallBlades: number;
  staff: number;
  swordsmanship: number;
  archery: number;
  athletic: number;
  crossbow: number;
  sleightOfHand: number;
  stealth: number;
  physique: number;
  endurance: number;
  charisma: number;
  deceit: number;
  fineArt: number;
  gambling: number;
  style: number;
  humanPerception: number;
  leadership: number;
  persuasion: number;
  performance: number;
  seduction: number;
  alchemy: number;
  crafting: number;
  disguise: number;
  firstAid: number;
  forgery: number;
  pickLock: number;
  trapCrafting: number;
  courage: number;
  hexWeaving: number;
  intimidation: number;
  spellCasting: number;
  resistMagic: number;
  resistCoercion: number;
  ritualCrafting: number;
};
export type attrPair = {
  attrKey: any;
  attrValue: string | number;
};
export type CharacterCard = {
  id: number;
  name: string;
  profession: string;
  race: string;
  gender: string;
  age: number;
};
export type CampaignCard = {
  id: number;
  title: string;
  description: string;
  dm: string;
};
export type newCharacterAttributes = {
  name: string;
  profession: string;
  race: string;
  gender: string;
  intelligence: number;
  ref: number;
  dex: number;
  body: number;
  spd: number;
  emp: number;
  cra: number;
  will: number;
  luck: number;
};

export type CharAttributes = {
  general: {
    id: number;
    name: string;
    profession: string;
    race: string;
    gender: string;
    age: number;
  };
  statistics: {
    intelligence: number;
    ref: number;
    dex: number;
    body: number;
    spd: number;
    emp: number;
    cra: number;
    will: number;
    luck: number;
    stun: number;
    run: number;
    leap: number;
    hp: number;
    sta: number;
    enc: number;
    rec: number;
    punch: number;
    kick: number;
  };
  intelligence: {
    awareness: number;
    business: number;
    deduction: number;
    education: number;
    commonSpeech: number;
    elderSpeech: number;
    dwarvenSpeech: number;
    monsterLore: number;
    socialEtiquette: number;
    streetwise: number;
    tactics: number;
    teaching: number;
    wildernessSurvival: number;
  };
  reflex: {
    brawling: number;
    dodge: number;
    melee: number;
    riding: number;
    sailing: number;
    smallBlades: number;
    staff: number;
    swordsmanship: number;
  };
  dexterity: {
    archery: number;
    athletic: number;
    crossbow: number;
    sleightOfHand: number;
    stealth: number;
  };
  body: {
    physique: number;
    endurance: number;
  };
  empathy: {
    charisma: number;
    deceit: number;
    fineArt: number;
    gambling: number;
    style: number;
    humanPerception: number;
    leadership: number;
    persuasion: number;
    performance: number;
    seduction: number;
  };
  craft: {
    alchemy: number;
    crafting: number;
    disguise: number;
    firstAid: number;
    forgery: number;
    pickLock: number;
    trapCrafting: number;
  };
  will: {
    courage: number;
    hexWeaving: number;
    intimidation: number;
    spellCasting: number;
    resistMagic: number;
    resistCoercion: number;
    ritualCrafting: number;
  };
};

export type Weapon = {
  id: number;
  category: string;
  name: string;
  type: string;
  weapon_accuracy: number;
  availability: string;
  damage: string;
  reliability: number;
  hands_required: number;
  range: string;
  effect: string;
  concealment: string;
  enhancements: number;
  weight: number;
  cost: number;
};

export type Armor = {
  id: number;
  name: string;
  category: string;
  stopping_power: number;
  availability: string;
  armor_enhancement: number;
  effect: string;
  encumbrance_value: number;
  weight: number;
  price: number;
};

export type UpdateItem = {
  itemId: number;
  attribute: string;
  value: string | number;
};

export type ItemToWearing = {
  characterId: number;
  bodyPart: string;
  itemId: number;
};

export type Campaign = {
  id?: number;
  dm?: number;
  title: string;
  description: string;
  invitationLink?: string;
  characterId?: number;
};

export type JoiningRequest = {
  invitationLink?: string;
  characterId?: number;
};
