import type { Character, CharacterCard } from "@/api/types";
import { defineStore } from "pinia";

export const useCharacterStore = defineStore("characterStore", {
  state: () => ({
    characterList: [] as Character[],
  }),

  getters: {
    getCharacterCards() {
      var charCardList = [] as CharacterCard[];
      for (const item of this.characterList) {
        charCardList.push({
          id: item.id,
          name: item.name,
          profession: item.profession,
          race: item.race,
          gender: item.gender,
          age: item.age,
        });
      }
      return charCardList;
    },
    getCharacterById:
      (state) =>
      (id: number): Character => {
        for (const item of state.characterList) {
          if (item.id == id) {
            return item;
          }
        }
        return { id: 3, name: "fasz" };
      },

    getAllCharacter(): Character[] {
      return this.characterList;
    },
  },
  actions: {
    setAllCharacters(characters: Character[]) {
      this.characterList = characters;
    },
  },
});
