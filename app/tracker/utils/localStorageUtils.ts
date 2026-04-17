// Local storage utilities for game tracking

export interface User {
  username: string;
  email?: string;
}

// Get current logged in user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Set current user in localStorage
export function setCurrentUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Clear current user (logout)
export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
}

// Get game status for a specific user
export function getGameStatus(gameId: string, user: User): string | null {
  if (typeof window === 'undefined') return null;
  const key = `gameStatus_${user.username}_${gameId}`;
  return localStorage.getItem(key);
}

// Set game status for a specific user
export function setGameStatus(gameId: string, status: string, username: string): void {
  if (typeof window === 'undefined') return;
  const key = `gameStatus_${username}_${gameId}`;
  localStorage.setItem(key, status);
}

// Get all game lists for a user
export function getUserLists(username: string): Record<string, string[]> {
  if (typeof window === 'undefined') return {};
  const key = `gameLists_${username}`;
  const lists = localStorage.getItem(key);
  return lists ? JSON.parse(lists) : {};
}

// Add a game to a user's list
export function addGameToList(listName: string, gameId: string, username: string): void {
  if (typeof window === 'undefined') return;
  const lists = getUserLists(username);
  if (!lists[listName]) {
    lists[listName] = [];
  }
  if (!lists[listName].includes(gameId)) {
    lists[listName].push(gameId);
  }
  const key = `gameLists_${username}`;
  localStorage.setItem(key, JSON.stringify(lists));
}

// Remove a game from a user's list
export function removeGameFromList(listName: string, gameId: string, username: string): void {
  if (typeof window === 'undefined') return;
  const lists = getUserLists(username);
  if (lists[listName]) {
    lists[listName] = lists[listName].filter(id => id !== gameId);
  }
  const key = `gameLists_${username}`;
  localStorage.setItem(key, JSON.stringify(lists));
}

// Create a new list
export function createList(listName: string, username: string): void {
  if (typeof window === 'undefined') return;
  const lists = getUserLists(username);
  if (!lists[listName]) {
    lists[listName] = [];
  }
  const key = `gameLists_${username}`;
  localStorage.setItem(key, JSON.stringify(lists));
}

// Delete a list
export function deleteList(listName: string, username: string): void {
  if (typeof window === 'undefined') return;
  const lists = getUserLists(username);
  delete lists[listName];
  const key = `gameLists_${username}`;
  localStorage.setItem(key, JSON.stringify(lists));
}
