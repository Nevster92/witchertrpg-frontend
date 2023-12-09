import type { Campaign, JoiningRequest } from "./types";

export async function getAllCampaignsAsDm() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/campaign/get/all_as_dm",
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

export async function getAllCampaignsAsPlayer() {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/campaign/get/all_as_player",
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

export async function createNewCampaign(details: Campaign) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/campaign/new", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteCampaign(camapignId: number) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/campaign/delete/" + camapignId,
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

export async function joinCampaign(requestDetails: JoiningRequest) {
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch("http://localhost:8081/campaign/join", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestDetails),
    });

    if (!response.ok) {
      throw new Error("Wrong Answer");
    }
  } catch (error) {
    throw error;
  }
}

export async function getCampaignById(campaignId: string) {
  parseInt(campaignId);
  try {
    let token = localStorage.getItem("cookie");

    const response = await fetch(
      "http://localhost:8081/campaign/get/" + campaignId,
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
