let portalData = {
  registeredResidents: [
    { username: 'sarah.williams', unit: '1201', role: 'Committee Chair', name: 'Sarah Williams' },
    { username: 'michael.chen', unit: '0815', role: 'Treasurer', name: 'Michael Chen' },
    { username: 'emma.thompson', unit: '0420', role: 'Secretary', name: 'Emma Thompson' },
    { username: 'david.martinez', unit: '1105', role: 'Committee Member', name: 'David Martinez' },
    { username: 'lisa.johnson', unit: '0739', role: 'Resident', name: 'Lisa Johnson' },
    { username: 'robert.kim', unit: '1018', role: 'Resident', name: 'Robert Kim' }
  ]
};

function setCookie(res, name, value, maxAge = 7200) {
  res.setHeader('Set-Cookie', `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax`);
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    });
  }
  return cookies;
}

export default function handler(req, res) {
  const buildingName = process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || 'Sydney Crown Towers';
  const cookies = parseCookies(req.headers.cookie);
  
  if (req.method === 'POST') {
    const { action } = req.body;
    
    if (action === 'login') {
      const { username, unit, role } = req.body;
      
      // Simple validation - check if user exists
      const user = portalData.registeredResidents.find(r => 
        r.username === username && r.unit === unit && r.role === role
      );
      
      if (user) {
        const loginTime = new Date().toISOString();
        const sessionToken = Buffer.from(username + loginTime).toString('base64');
        
        // Set multiple cookies
        res.setHeader('Set-Cookie', [
          `resident_username=${username}; Path=/; Max-Age=7200; HttpOnly; SameSite=Lax`,
          `resident_unit=${unit}; Path=/; Max-Age=7200; HttpOnly; SameSite=Lax`,
          `resident_role=${role}; Path=/; Max-Age=7200; HttpOnly; SameSite=Lax`,
          `login_time=${loginTime}; Path=/; Max-Age=7200; HttpOnly; SameSite=Lax`,
          `session_token=${sessionToken}; Path=/; Max-Age=7200; HttpOnly; SameSite=Lax`,
          `portal_visits=${parseInt(cookies.portal_visits || '0') + 1}; Path=/; Max-Age=31536000; SameSite=Lax`,
          `last_visit=${new Date().toISOString()}; Path=/; Max-Age=31536000; SameSite=Lax`
        ]);
        
        return res.json({ 
          success: true, 
          message: `Welcome back, ${username}! Successfully logged into the resident portal.` 
        });
      } else {
        return res.json({ success: false, error: "Invalid credentials. Please check your username, unit, and role." });
      }
    }
    
    if (action === 'logout') {
      // Clear all session cookies
      res.setHeader('Set-Cookie', [
        `resident_username=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `resident_unit=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `resident_role=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `login_time=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
        `session_token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`
      ]);
      
      return res.json({ 
        success: true, 
        message: "You have been securely logged out. Thank you for using the resident portal." 
      });
    }
    
    if (action === 'save_preferences') {
      const { theme, notifications, language } = req.body;
      
      // Set preference cookies with longer expiry
      res.setHeader('Set-Cookie', [
        `portal_theme=${theme}; Path=/; Max-Age=7776000; SameSite=Lax`, // 90 days
        `email_notifications=${notifications ? 'enabled' : 'disabled'}; Path=/; Max-Age=7776000; SameSite=Lax`,
        `portal_language=${language}; Path=/; Max-Age=7776000; SameSite=Lax`
      ]);
      
      return res.json({ 
        success: true, 
        message: "Your preferences have been saved and will be applied to your account." 
      });
    }
  }
  
  // Get current user info from cookies
  const currentUser = cookies.resident_username;
  const currentUnit = cookies.resident_unit;
  const currentRole = cookies.resident_role;
  const loginTime = cookies.login_time;
  const currentTheme = cookies.portal_theme || 'light';
  const notificationsEnabled = cookies.email_notifications || 'enabled';
  const currentLanguage = cookies.portal_language || 'English';
  const totalVisits = parseInt(cookies.portal_visits || '0');
  const lastVisit = cookies.last_visit || 'First visit';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resident Portal - ${buildingName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background-color: ${currentTheme === 'dark' ? '#1a1a1a' : '#667eea'};
            background-image: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #2c2c2c, #1a1a1a)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
            color: ${currentTheme === 'dark' ? '#e0e0e0' : '#333'};
            min-height: 100vh;
        }
        .portal-container {
            background: ${currentTheme === 'dark' ? '#2d2d2d' : 'white'};
            border-radius: 12px;
            padding: 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .header {
            background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #4a4a4a, #5a5a5a)' : 'linear-gradient(135deg, #9b59b6, #8e44ad)'};
            color: white;
            padding: 30px;
            text-align: center;
        }
        .section {
            background: ${currentTheme === 'dark' ? '#3a3a3a' : '#f8f9fa'};
            padding: 25px;
            margin: 20px;
            border-radius: 8px;
            border-left: 4px solid ${currentTheme === 'dark' ? '#8e44ad' : '#9b59b6'};
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .user-dashboard {
            background: ${currentTheme === 'dark' ? 'linear-gradient(135deg, #2d5016, #3d6b1f)' : 'linear-gradient(135deg, #2ecc71, #27ae60)'};
            color: white;
            padding: 25px;
            margin: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: ${currentTheme === 'dark' ? '#e0e0e0' : '#2c3e50'};
        }
        .form-group input, .form-group select {
            width: 100%;
            max-width: 350px;
            padding: 12px;
            border: 2px solid ${currentTheme === 'dark' ? '#555' : '#e1e8ed'};
            border-radius: 6px;
            font-size: 14px;
            background: ${currentTheme === 'dark' ? '#2a2a2a' : 'white'};
            color: ${currentTheme === 'dark' ? '#e0e0e0' : '#333'};
            transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #9b59b6;
        }
        .btn {
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
            margin-right: 10px;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn-danger {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
        }
        .btn-success {
            background: linear-gradient(135deg, #27ae60, #229954);
        }
        .message {
            background: ${currentTheme === 'dark' ? '#1a3d1a' : '#d4edda'};
            color: ${currentTheme === 'dark' ? '#a3d4a3' : '#155724'};
            padding: 15px;
            border-radius: 8px;
            margin: 20px;
            border-left: 4px solid #28a745;
        }
        .error {
            background: ${currentTheme === 'dark' ? '#3d1a1a' : '#f8d7da'};
            color: ${currentTheme === 'dark' ? '#f5b7b1' : '#721c24'};
            padding: 15px;
            border-radius: 8px;
            margin: 20px;
            border-left: 4px solid #dc3545;
        }
        .activity-panel {
            background: ${currentTheme === 'dark' ? '#2a2a2a' : '#fff3cd'};
            color: ${currentTheme === 'dark' ? '#e0e0e0' : '#856404'};
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
        }
        .nav-link {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            margin: 5px;
            transition: transform 0.3s;
            font-weight: 600;
        }
        .nav-link:hover {
            transform: translateY(-2px);
        }
        .nav-link.secondary {
            background: linear-gradient(135deg, #95a5a6, #7f8c8d);
        }
        .resident-directory {
            background: ${currentTheme === 'dark' ? '#333' : '#e9ecef'};
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .preferences-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .feature-highlight {
            background: ${currentTheme === 'dark' ? '#2a2a3a' : '#f8f9ff'};
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #6c5ce7;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="portal-container">
        <div class="header">
            <h1>👤 Resident Portal</h1>
            <p>${buildingName} - Secure Access</p>
            <p>Portal visits: <strong>${totalVisits}</strong> | Last visit: ${lastVisit !== 'First visit' ? new Date(lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + new Date(lastVisit).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : lastVisit}</p>
        </div>

        <div id="message"></div>

        ${currentUser ? `
            <div class="user-dashboard">
                <h3 style="margin-top: 0;">🏠 Welcome, ${currentUser}!</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                    <div>
                        <strong>Resident:</strong> ${currentUser}<br>
                        <strong>Unit:</strong> ${currentUnit}<br>
                    </div>
                    <div>
                        <strong>Position:</strong> ${currentRole}<br>
                        <strong>Session:</strong> ${loginTime ? new Date(loginTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'Active'}
                    </div>
                    <div>
                        <strong>Theme:</strong> ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} mode<br>
                        <strong>Notifications:</strong> ${notificationsEnabled.charAt(0).toUpperCase() + notificationsEnabled.slice(1)}
                    </div>
                </div>
                
                <button onclick="logout()" class="btn btn-danger">🚪 Secure Logout</button>
            </div>

            <div class="feature-highlight">
                <h3 style="margin-top: 0;">🎯 Quick Actions</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <a href="/api/maintenance-portal" class="nav-link">🔧 Submit Maintenance Request</a>
                    <a href="/api/records-reports" class="nav-link">📋 View Building Notices</a>
                    <a href="/api/building-dashboard" class="nav-link">📊 Building Dashboard</a>
                    <a href="/contact" class="nav-link">📞 Contact Management</a>
                </div>
            </div>
        ` : `
            <div class="section">
                <h2>🔐 Resident Authentication</h2>
                <p>Please log in with your registered credentials to access the resident portal</p>
                
                <div class="resident-directory">
                    <strong>🏠 Registered Residents:</strong><br>
                    ${portalData.registeredResidents.map((resident, index) => 
                        `<span style="margin-right: 15px;">${resident.username} (Unit ${resident.unit})</span>${(index + 1) % 2 === 0 ? '<br>' : ''}`
                    ).join('')}
                </div>
                
                <form id="loginForm" style="max-width: 500px;">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required placeholder="e.g., sarah.williams">
                    </div>
                    <div class="form-group">
                        <label for="unit">Unit Number:</label>
                        <input type="text" id="unit" name="unit" required placeholder="e.g., 1201">
                    </div>
                    <div class="form-group">
                        <label for="role">Resident Role:</label>
                        <select id="role" name="role" required>
                            <option value="">Select Your Role</option>
                            <option value="Resident">Resident</option>
                            <option value="Committee Member">Committee Member</option>
                            <option value="Committee Chair">Committee Chair</option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="Secretary">Secretary</option>
                        </select>
                    </div>
                    <button type="submit" class="btn">🔑 Login to Portal</button>
                </form>
            </div>
        `}

        <div class="section">
            <h2>⚙️ Portal Preferences</h2>
            <p>Customize your portal experience and notification settings</p>
            <form id="preferencesForm">
                <div class="preferences-grid">
                    <div class="form-group">
                        <label for="theme">Portal Theme:</label>
                        <select id="theme" name="theme">
                            <option value="light" ${currentTheme === 'light' ? 'selected' : ''}>🌞 Light Theme</option>
                            <option value="dark" ${currentTheme === 'dark' ? 'selected' : ''}>🌙 Dark Theme</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="language">Portal Language:</label>
                        <select id="language" name="language">
                            <option value="English" ${currentLanguage === 'English' ? 'selected' : ''}>🇺🇸 English</option>
                            <option value="Mandarin" ${currentLanguage === 'Mandarin' ? 'selected' : ''}>🇨🇳 Mandarin</option>
                            <option value="Spanish" ${currentLanguage === 'Spanish' ? 'selected' : ''}>🇪🇸 Spanish</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div class="checkbox-container">
                            <input type="checkbox" id="notifications" name="notifications" ${notificationsEnabled === 'enabled' ? 'checked' : ''}>
                            <label for="notifications">📧 Email Notifications</label>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-success">💾 Save Preferences</button>
            </form>
            
            <div style="margin-top: 20px; padding: 15px; background: ${currentTheme === 'dark' ? '#2a2a2a' : '#f8f9fa'}; border-radius: 6px;">
                <h4 style="margin-top: 0;">Current Settings:</h4>
                <p><strong>Theme:</strong> ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode</p>
                <p><strong>Notifications:</strong> ${notificationsEnabled.charAt(0).toUpperCase() + notificationsEnabled.slice(1)}</p>
                <p><strong>Language:</strong> ${currentLanguage}</p>
            </div>
        </div>

        <div class="activity-panel">
            <h3 style="margin-top: 0;">📊 Session Information</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <strong>Portal Visits:</strong> ${totalVisits} times<br>
                    <strong>Session ID:</strong> ${cookies.session_token ? cookies.session_token.substring(0, 8) + '...' : 'None'}
                </div>
                <div>
                    <strong>Current Session:</strong> ${currentUser ? 'Active' : 'Not logged in'}<br>
                    <strong>Security Level:</strong> Encrypted
                </div>
                <div>
                    <strong>Last Activity:</strong> ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}<br>
                    <strong>Auto-logout:</strong> 2 hours
                </div>
            </div>
        </div>

        <div class="section">
            <h3>🔒 Privacy & Security Features</h3>
            <ul style="margin: 15px 0;">
                <li><strong>Secure Sessions:</strong> Encrypted authentication with auto-timeout</li>
                <li><strong>Personal Preferences:</strong> Customizable theme and language settings</li>
                <li><strong>Activity Tracking:</strong> Monitor portal usage and engagement</li>
                <li><strong>Notification Control:</strong> Manage email preferences and updates</li>
                <li><strong>Multi-level Access:</strong> Role-based content and functionality</li>
                <li><strong>Data Protection:</strong> Compliant with privacy regulations</li>
            </ul>
        </div>

        <div style="text-align: center; margin: 30px;">
            <a href="/" class="nav-link secondary">🏠 Back to Home</a>
            <a href="/api/building-dashboard" class="nav-link">🏢 Building Dashboard</a>
            <a href="/api/records-reports" class="nav-link">📊 Records & Reports</a>
            <a href="/api/maintenance-portal" class="nav-link">🔧 Maintenance Portal</a>
        </div>
    </div>

    <script>
        document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            data.action = 'login';
            
            try {
                const response = await fetch('/api/resident-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('message').innerHTML = '<div class="message">✅ ' + result.message + '</div>';
                    setTimeout(() => location.reload(), 1500);
                } else {
                    document.getElementById('message').innerHTML = '<div class="error">❌ ' + result.error + '</div>';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="error">❌ An error occurred. Please try again.</div>';
            }
        });

        document.getElementById('preferencesForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            data.action = 'save_preferences';
            data.notifications = document.getElementById('notifications').checked;
            
            try {
                const response = await fetch('/api/resident-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('message').innerHTML = '<div class="message">✅ ' + result.message + '</div>';
                    setTimeout(() => location.reload(), 1500);
                } else {
                    document.getElementById('message').innerHTML = '<div class="error">❌ ' + result.error + '</div>';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="error">❌ An error occurred. Please try again.</div>';
            }
        });

        async function logout() {
            try {
                const response = await fetch('/api/resident-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'logout' })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('message').innerHTML = '<div class="message">✅ ' + result.message + '</div>';
                    setTimeout(() => location.reload(), 1500);
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="error">❌ An error occurred. Please try again.</div>';
            }
        }
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
} 