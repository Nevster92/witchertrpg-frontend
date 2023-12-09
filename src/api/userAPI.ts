export interface tokenDetails {
  token: string;
  valid: boolean;
}

export interface logInData {
  username: string;
  password: string;
}
export interface registrationData {
  username: string;
  password: string;
  email: string;
}
export interface UserData {
  username: string;
  email: string;
}

export async function logIn(loginData: logInData) {
  await fetch("http://localhost:8081/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(loginData.username + ":" + loginData.password),
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tart almát szövegként
      } else {
        throw new Error("Wrong Answer");
      }
    })
    .then((token) => {
      localStorage.setItem("cookie", token);
      console.log("Token what I get:", token); // Kiíratjuk a tokent a konzolon
      // További teendők a tokennel
    })
    .catch((error) => {
      throw error;
    });
}
export async function registration(regData: registrationData) {
  const requestBody = {
    username: regData.username,
    password: regData.password,
    email: regData.email,
  };
  await fetch("http://localhost:8081/registration", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Wrong Answer");
      }
    })
    .catch((error) => {
      throw error;
    });
}

export async function checkToken(token: string): Promise<boolean> {
  return await fetch("http://localhost:8081/token/validate", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("checktoken");
    console.log(res);
    return true;
  });
}

export async function updateUser(user: registrationData) {
  try {
    let token = localStorage.getItem("cookie");
    const response = await fetch("http://localhost:8081/user/update", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

export async function getUserData() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/user/details", {
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

//************************************************************************************* */
//************************************** */ TESTEK  *************************************
//************************************************************************************* */
export async function getTest() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const jokes = await response.json();
    console.log(jokes);
  } catch (error) {
    console.error(error);
  }

  /*     const res = await fetch("https://catfact.ninja/fact")
    const data = await res.json()
    console.log(data)
    return data */
}

export async function testGet() {
  fetch("http://localhost:8081/stories", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiVGVzdCIsImV4cCI6MTY5Mjg4Njg2MCwiaWF0IjoxNjkyODgzMjYwLCJzY29wZSI6InJlYWQifQ.tpssCzPIKZCPQP1e8nzJzkXrK310bE4H9fgetJV6uNgLw_4xBt0kr-HcF0GrL1rNqYz8yARBQzCC7LD56uvK3gA_Z9orXKHnQr-yMsBQZtLW-wBMm3BKwHtKtGAXwz_xW-hxkbabr1RHqARFF8AgCp3o1ZBRsckoRnKo_RRm8wkecfLVSbDbX8BFxtthaixLoccddPqnNx6OIRSocK2D2yn6yxLWpbqWMtonf61Px2vShlEgLOskCH2GZLnaXFm65D9Ph05zoyaflyfqRbAISGHSaEMJSnG4jQhArWVuh2zsYrZFmAu_EMqWcfU5E455a3xeQ8ocbCevbTysdnev0A",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tartalmát szövegként
      } else {
        throw new Error("Hibás válasz");
      }
    })
    .then((valasz) => {
      console.log("Kapott válasz:", valasz); // Kiíratjuk a választ a konzolon
    })
    .catch((error) => {
      // Hiba kezelése
      console.error("Hiba történt:", error);
    });
}

export async function testGetWithNoCred() {
  fetch("http://localhost:8081/fail", {
    method: "GET",
    headers: {
      //  'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiVGVzdCIsImV4cCI6MTY5Mjg3MjY1MSwiaWF0IjoxNjkyODY5MDUxLCJzY29wZSI6InJlYWQifQ.mDBw3Se_Uf2JnbC0aTPm6DKPRgZpdof_M00gOW4ad82ZBGc3Q2uzuDlV2qTQLGMtqLXTe-SgodWz2FjoB-qugeGOFQopQZZvp5Bo09FAWOHrfIF1_2RNgsYZ2DHa6hQWBXsLDBtX35iezmJaqtNLS5Ig88EfSieWIPGkpp3ULmDGjDD_HHKkFD3M41AHHmC3aSQMTjuh1ocYINEHAZQmoYdZBBFfIpRT7xOZLS2efKnooZsvRETytnmLaTNvhZbMbNZVgxS2bDmGuMkanmKXQ7WDXk5_iIgVJDvrvthTGZK9HqQ-4I_EnRByEaITWpwnaIxpyTQG5XWtIjy4O0OjZw"
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tartalmát szövegként
      } else {
        throw new Error("Hibás válasz");
      }
    })
    .then((valasz) => {
      console.log("Kapott válasz:", valasz); // Kiíratjuk a választ a konzolon
    })
    .catch((error) => {
      // Hiba kezelése
      console.error("Hiba történt:", error);
    });
}

export async function postLogin() {
  fetch("http://localhost:8081/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("Test:12345"),
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tartalmát szövegként
      } else {
        throw new Error("Hibás válasz");
      }
    })
    .then((token) => {
      console.log("Kapott token:", token); // Kiíratjuk a tokent a konzolon
      // További teendők a tokennel
    })
    .catch((error) => {
      // Hiba kezelése
      console.error("Hiba történt:", error);
    });
}

export async function getLogin() {
  fetch("http://localhost:8081/login", {
    method: "GET",
    headers: {
      Authorization: "Basic dXNlcjoxMjM0NQ==",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Válasz  ");
      console.log(response);
      // Kezeled a választ itt
    })
    .catch((error) => {
      console.log("Error:  ");
      console.log(error);
      // Kezeled az esetleges hibákat itt
    });
}

export async function postLoginMasik() {
  fetch("http://localhost:8081/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("Balint:jelszoka"),
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tartalmát szövegként
      } else {
        throw new Error("Hibás válasz");
      }
    })
    .then((token) => {
      console.log("Kapott token:", token); // Kiíratjuk a tokent a konzolon
      // További teendők a tokennel
    })
    .catch((error) => {
      // Hiba kezelése
      console.error("Hiba történt:", error);
    });
}

export async function getNoPrincipal() {
  fetch("http://localhost:8081/stories", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.text(); // Visszaadjuk a válasz tartalmát szövegként
      } else {
        throw new Error("Hibás válasz");
      }
    })
    .then((valasz) => {
      console.log("Kapott válasz:", valasz); // Kiíratjuk a választ a konzolon
    })
    .catch((error) => {
      // Hiba kezelése
      console.error("Hiba történt:", error);
    });
}
