export default function handler(req, res) {
  // Building data
  const buildingName = process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || 'Sydney Crown Towers';
  const totalUnits = 156;
  const buildingAge = 12;
  const lastInspection = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const nextAGM = new Date(Date.now() + 85 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const occupancyRate = 94;
  const maintenanceBudget = 185000;

  const currentMaintenance = [
    'Elevator modernization - Level 15-20',
    'Pool filtration system upgrade',
    'Security camera installation - Parking areas',
    'Garden irrigation system maintenance',
    'Fire safety system inspection'
  ];
  const randomMaintenance = currentMaintenance[Math.floor(Math.random() * currentMaintenance.length)];
  const responseTime = Math.floor(Math.random() * 100) + 50;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Building Dashboard - ${buildingName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5rem;
        }
        .urgent-notice {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        .quick-stats {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-item {
            text-align: center;
            padding: 15px;
            background: rgba(255,255,255,0.2);
            color: white;
            border-radius: 8px;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .info-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-left: 4px solid #3498db;
            transition: transform 0.3s ease;
        }
        .info-card:hover {
            transform: translateY(-5px);
        }
        .info-card h2 {
            color: #2c3e50;
            margin-top: 0;
            font-size: 1.3rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .status-indicator {
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
        }
        .status-good {
            background: #d4edda;
            color: #155724;
        }
        .status-warning {
            background: #fff3cd;
            color: #856404;
        }
        .nav-link {
            display: inline-block;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            margin: 8px;
            transition: transform 0.3s;
            font-weight: 600;
        }
        .nav-link:hover {
            transform: translateY(-2px);
        }
        .nav-link.secondary {
            background: linear-gradient(135deg, #95a5a6, #7f8c8d);
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏢 ${buildingName}</h1>
        <p>Building Management Dashboard</p>
        <p>${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
    </div>

    <div class="urgent-notice">
        <h3 style="margin-top: 0;">🔧 Current Maintenance Activity</h3>
        <p style="margin: 0; font-size: 1.1rem;">
            <strong>Active:</strong> ${randomMaintenance}
            <span style="opacity: 0.8;">(Updated: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })})</span>
        </p>
    </div>

    <div class="quick-stats">
        <h3 style="margin-top: 0; color: white;">📊 Building Overview</h3>
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-number">${totalUnits}</div>
                <div>Total Units</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${occupancyRate}%</div>
                <div>Occupied</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${buildingAge}</div>
                <div>Years Old</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">$${maintenanceBudget.toLocaleString()}</div>
                <div>Annual Budget</div>
            </div>
        </div>
    </div>

    <div class="dashboard-grid">
        <div class="info-card">
            <h2>🏗️ Building Status</h2>
            <div class="status-indicator status-good">
                Operational - All Systems Normal
            </div>
            <ul style="margin: 15px 0;">
                <li><strong>Last Safety Inspection:</strong> ${lastInspection}</li>
                <li><strong>Fire Safety:</strong> Compliant (Next check: ${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})</li>
                <li><strong>Building Insurance:</strong> Current until ${new Date(Date.now() + 8 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</li>
                <li><strong>Structural Assessment:</strong> Excellent condition</li>
            </ul>
        </div>

        <div class="info-card">
            <h2>📅 Upcoming Events</h2>
            <div style="margin: 15px 0;">
                <div style="background: #e8f4fd; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                    <strong>Annual General Meeting</strong><br>
                    ${nextAGM} at 7:00 PM<br>
                    <small>Level 1 Community Room</small>
                </div>
                <div style="background: #fff3cd; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                    <strong>Quarterly Committee Meeting</strong><br>
                    ${new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at 6:30 PM<br>
                    <small>Management Office</small>
                </div>
                <div style="background: #d1ecf1; padding: 10px; border-radius: 6px;">
                    <strong>Building BBQ Event</strong><br>
                    ${new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} from 4:00 PM<br>
                    <small>Rooftop Terrace</small>
                </div>
            </div>
        </div>

        <div class="info-card">
            <h2>💰 Financial Summary</h2>
            <div style="margin: 15px 0;">
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>Quarterly Levies:</span>
                    <strong style="color: #27ae60;">$245,000</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>Operating Expenses:</span>
                    <strong style="color: #e74c3c;">$178,000</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>Reserve Fund:</span>
                    <strong style="color: #3498db;">$485,000</strong>
                </div>
                <hr>
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span><strong>Net Position:</strong></span>
                    <strong style="color: #27ae60;">$67,000</strong>
                </div>
            </div>
        </div>

        <div class="info-card">
            <h2>🔧 Maintenance Schedule</h2>
            <div style="margin: 15px 0;">
                ${currentMaintenance.map((item, index) => `
                <div style="padding: 8px; margin: 5px 0; background: ${index % 2 == 0 ? '#f8f9fa' : '#e9ecef'}; border-radius: 4px;">
                    ${item}
                </div>
                `).join('')}
            </div>
            <div class="status-indicator status-warning">
                2 Priority Items Scheduled
            </div>
        </div>
    </div>

    <div class="info-card">
        <h2>🌐 System Information</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0;">
            <div>
                <strong>Portal Version:</strong> 3.2.1<br>
                <strong>Last Updated:</strong> ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div>
                <strong>Server Status:</strong> Online<br>
                <strong>Response Time:</strong> ${responseTime}ms
            </div>
            <div>
                <strong>Data Backup:</strong> ${new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}<br>
                <strong>Security Scan:</strong> ${new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 30px;">
        <a href="/" class="nav-link secondary">🏠 Back to Home</a>
        <a href="/api/maintenance-portal" class="nav-link">🔧 Maintenance Portal</a>
        <a href="/api/records-reports" class="nav-link">📊 Records & Reports</a>
        <a href="/api/resident-portal" class="nav-link">👤 Resident Portal</a>
    </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
} 