import { isTestnet } from "./config";
import { ApiResponse, Game, LeaderboardEntry, LoginData, Paginated, Score, User } from "./types";
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

const baseUrl = isTestnet ? 'https://api-dev.0xartcade.xyz' : 'https://api.0xartcade.xyz';
// const csrfCookieName = isTestnet ? 'artcade-csrf-dev' : 'artcade-csrf';
const authCookieName = isTestnet ? 'artcade-auth-dev' : 'artcade-auth';

async function apiFetch(endpoint: string, request?: RequestInit): Promise<Response> {
  const url = new URL(`${baseUrl}${endpoint}`);
  // console.log(getCookie(authCookieName))
  const response = await fetch(url, {
    ...request,
    // credentials: 'include',
    headers: {
      // Set default headers
      'Content-Type': 'application/json',
      'Authorization': `Token ${getCookie(authCookieName)}`,
      // 'X-CSRF-Token': getCookie(csrfCookieName) || '',
      ...request?.headers,
    },
  });

  // Set CSRF client cookie if api returns it in header
  // if (response.headers.get('X-CSRF-Token')) {
  //   setCookie(csrfCookieName, response.headers.get('X-CSRF-Token'), {
  //     expires: new Date(Date.now() + 365 * 24 * 3600 * 1000),
  //   });
  // }

  return response;
}


async function getUserInfo(): Promise<ApiResponse<User>> {
  const r = await apiFetch("/auth/user-info", { method: 'GET' });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: r.status == 401 ? "Unauthorized" : "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: await r.json(),
      error: "",
    }
  }
}

async function getNonce(): Promise<ApiResponse<string>> {
  const r = await apiFetch("/auth/nonce", {
    method: 'GET',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: (await r.json()).value,
      error: "",
    }
  }
}

async function login(message: string, signature: string): Promise<ApiResponse<LoginData>> {
  const r = await apiFetch("/auth/login", {
    method: 'POST',
    body: JSON.stringify({ message, signature }),
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    const data: LoginData = await r.json();
    setCookie(authCookieName, data.token, { maxAge: 365 * 24 * 3600 * 1000 }); // 1 year is fine as backend has token expiry built in
    return {
      success: true,
      data: data,
      error: "",
    }
  }
}

async function generateOTP(): Promise<ApiResponse<string>> {
  const r = await apiFetch("/auth/generate-otp", {
    method: 'POST',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: (await r.json()).code,
      error: "",
    }
  }
}

async function logout(): Promise<ApiResponse<null>> {
  const r = await apiFetch("/auth/logout", {
    method: 'POST',
  });

  // delete auth cookie
  deleteCookie(authCookieName);

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: null,
      error: "",
    }
  }
}

async function getGames({ limit = 100, offset = 0 }: { limit?: number, offset?: number }): Promise<ApiResponse<Paginated<Game>>> {
  const params = new URLSearchParams({
    limit: limit.toString(), offset: offset.toString()
  });
  const r = await apiFetch(`/games?${params.toString()}`, {
    method: 'GET',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: await r.json(),
      error: "",
    }
  }
}

async function getGame(id: number): Promise<ApiResponse<Game>> {
  const r = await apiFetch(`/games/${id}`, {
    method: 'GET',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: r.status === 404 ? "Game not found" : "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: await r.json(),
      error: "",
    }
  }
}

async function getScores({ limit = 100, offset = 0 }: { limit?: number, offset?: number }): Promise<ApiResponse<Paginated<Score>>> {
  const params = new URLSearchParams({
    limit: limit.toString(), offset: offset.toString()
  });
  const r = await apiFetch(`/scores?${params.toString()}`, {
    method: 'GET',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: await r.json(),
      error: "",
    }
  }
}

async function getLeaderboard(gameId: number, { limit = 100, offset = 0 }: { limit?: number, offset?: number }): Promise<ApiResponse<Paginated<LeaderboardEntry>>> {
  const params = new URLSearchParams({
    limit: limit.toString(), offset: offset.toString()
  });
  const r = await apiFetch(`/leaderboard/${gameId}?${params.toString()}`, {
    method: 'GET',
  });

  if (!r.ok) {
    return {
      success: false,
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      success: true,
      data: await r.json(),
      error: "",
    }
  }
}

export const api = {
  getUserInfo,
  getNonce,
  login,
  generateOTP,
  logout,
  getGames,
  getGame,
  getScores,
  getLeaderboard
}