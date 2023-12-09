import { charFormater } from "./characterApi";
import type { Character, newCharacterAttributes } from "./types";

export async function getAllCharacters() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/all_characters",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }

    const data = await response.json(); // JSON adatok beolvasása

    return data; // Visszaadjuk az adatokat
  } catch (error) {
    throw error;
  }
}

export async function getCharacterById(id: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/character/get/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }

    const data = await response.json(); // JSON adatok beolvasása

    return data; // Visszaadjuk az adatokat
  } catch (error) {
    throw error;
  }
}

export async function setCharacterAttribute(
  characterId: number,
  attribute: string,
  value: number
) {
  try {
    let token = localStorage.getItem("cookie");
    const requestBody = {
      id: characterId,
      attribute: attribute,
      value: Number(value),
    };

    const response = await fetch("http://localhost:8081/character/mod", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function createNewCharacter(
  characterAttr: newCharacterAttributes
) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/character/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterAttr),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}
