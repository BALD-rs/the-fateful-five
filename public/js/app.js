// public/js/app.js
import { createAuth0Client } from '@auth0/auth0-spa-js';

let auth0Client = null;

// Fetch configuration from the auth_config.json file
const fetchAuthConfig = () => fetch("/auth_config.json");

// Initialize the Auth0 client
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};

window.onload = async () => {
  await configureClient();
  updateUI();

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    return;
  }

  // Handle login redirect callback
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    updateUI();
    window.history.replaceState({}, document.title, "/");
  }
};

// Update UI based on authentication state
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  document.getElementById("btn-login").style.display = isAuthenticated ? "none" : "block";
  document.getElementById("btn-logout").style.display = isAuthenticated ? "block" : "none";
  document.getElementById("gated-content").classList.toggle("hidden", !isAuthenticated);

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    document.getElementById("ipt-access-token").innerText = await auth0Client.getTokenSilently();
    document.getElementById("ipt-user-profile").textContent = JSON.stringify(user, null, 2);
  }
};

// Log in function
const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};

// Log out function
const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
};

window.login = login;
window.logout = logout;
