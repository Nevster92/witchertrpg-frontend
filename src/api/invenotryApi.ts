import type { ItemToWearing, UpdateItem, Weapon } from "./types";

export async function getAllWeaponByCharacterId(characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" + characterId + "/get/all_weapon",
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

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllArmorByCharacterId(characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" + characterId + "/get/all_armor",
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

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function setWeaponAttr(itemDetails: UpdateItem) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/inventory/mod/weapon", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemDetails),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function setArmorAttr(itemDetails: UpdateItem) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/inventory/mod/armor", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemDetails),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllWeapons() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/all_weapon", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllArmors() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/all_armor", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addWeaponToInv(weapon: Weapon, characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" +
        characterId +
        "/inventory/weapon/add",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weapon),
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}
export async function addArmorToInv(armor: Armor, characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" + characterId + "/inventory/armor/add",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(armor),
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteWeaponFromInvenotry(weaponId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/inventory/weapon/delete/" + weaponId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}
export async function deleteArmorFromInvenotry(armorId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/inventory/armor/delete/" + armorId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllWearedWeapons(characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" + characterId + "/wear_weapon",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllWearedArmor(characterId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" + characterId + "/wear_armor",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function wearItem(itemToWearing: ItemToWearing) {
  itemToWearing.characterId = parseInt(itemToWearing.characterId);
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/inventory/wear",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToWearing),
      }
    );

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function dropItem(characterId: number, bodyPart: string) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/character/" +
        characterId +
        "/dropitem/" +
        bodyPart,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}
