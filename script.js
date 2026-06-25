// ============================================
// LOGIN PAGE - JavaScript Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('remember');
    const statusMessage = document.getElementById('statusMessage');
    const themeToggle = document.getElementById('themeToggle');

    // ============================================
    // 1. PASSWORD VISIBILITY TOGGLE
    // ============================================
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // ============================================
    // 2. FORM SUBMISSION
    // ============================================
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validation
        if (!email || !password) {
            showStatus('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Please enter a valid email address', 'error');
            return;
        }

        // Demo authentication
        if (email === 'demo@example.com' && password === 'demo123') {
            showStatus('✅ Login successful! Welcome back!', 'success');
            
            // Store remember me preference
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Reset form after success
            setTimeout(() => {
                loginForm.reset();
                // Clear status after 3 seconds
                setTimeout(() => {
                    hideStatus();
                }, 3000);
            }, 1500);
        } else {
            showStatus('❌ Invalid email or password. Try: demo@example.com / demo123', 'error');
        }
    });

    // ============================================
    // 3. REMEMBER ME FUNCTIONALITY
    // ============================================
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }

    // ============================================
    // 4. STATUS MESSAGE HELPERS
    // ============================================
    function showStatus(message, type = 'info') {
        statusMessage.textContent = message;
        statusMessage.className = `status-message show ${type}`;
    }

    function hideStatus() {
        statusMessage.className = 'status-message';
    }

    // ============================================
    // 5. EMAIL VALIDATION
    // ============================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // 6. THEME TOGGLE (DARK MODE FEATURE)
    // ============================================
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
        showStatus(isDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'success');
        setTimeout(hideStatus, 2000);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // ============================================
    // 7. KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Press 'Ctrl + Shift + D' to toggle dark mode
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    console.log('🔐 Login Page Loaded!');
    console.log('💡 Tip: Press Ctrl+Shift+D to toggle dark mode');
});