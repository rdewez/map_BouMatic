// ===== SYSTÈME D'AUTHENTIFICATION BOUMATIC =====
// Configuration des identifiants (obfusqués avec base64)
const LOGIN_CREDENTIALS = {
    username: atob('Ym91bWF0aWMtbWFw'), // boumatic-map
    password: atob('RGVhbGVyc21hcFJE')  // DealersmapRD
};

// Fonction d'initialisation de l'authentification
function initAuth() {
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Vérifier si déjà connecté (sessionStorage)
    if (sessionStorage.getItem('boumatic_authenticated') === 'true') {
        hideLoginScreen();
        return;
    }

    // Gestionnaire du formulaire de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === LOGIN_CREDENTIALS.username && password === LOGIN_CREDENTIALS.password) {
            // Authentification réussie
            sessionStorage.setItem('boumatic_authenticated', 'true');
            hideLoginScreen();
        } else {
            // Authentification échouée
            showLoginError('Incorrect username or password');
        }
    });
}

function hideLoginScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    
    // Charger les données sécurisées après authentification
    loadSecureMapData();
}

function showLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    
    // Effacer le message d'erreur après 5 secondes
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}

// Fonction de déconnexion (optionnelle)
function logout() {
    sessionStorage.removeItem('boumatic_authenticated');
    location.reload();
}

// Fonction pour charger les données sécurisées dynamiquement
function loadSecureMapData() {
    // Créer et ajouter le script pour charger les données
    const script = document.createElement('script');
    script.src = 'map-data.js';
    script.onload = function() {
        console.log('Données sécurisées chargées');
        // Initialiser la carte après chargement des données
        if (window.secureMapData && typeof initializeMapWithData === 'function') {
            window.secureMapData.loadData();
            initializeMapWithData();
        }
    };
    script.onerror = function() {
        console.error('Erreur lors du chargement des données sécurisées');
    };
    document.head.appendChild(script);
}