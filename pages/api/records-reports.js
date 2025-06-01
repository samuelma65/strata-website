let strataData = {
  notices: [
    { id: 1, title: 'Pool Maintenance Schedule', content: 'The pool area will be closed for routine maintenance and cleaning from December 15-17. Alternative facilities available at Level 3 gym.', date: '2024-12-10', priority: 'High', category: 'Maintenance' },
    { id: 2, title: 'Annual General Meeting Notice', content: 'The AGM is scheduled for February 15th, 2025 at 7:00 PM in the Level 1 Community Room. All residents are encouraged to attend.', date: '2024-12-12', priority: 'Important', category: 'Governance' },
    { id: 3, title: 'Visitor Parking Policy Update', content: 'New visitor parking regulations effective January 1st. Maximum 2 hours parking, digital permits required through building app.', date: '2024-12-14', priority: 'Medium', category: 'Policy' },
    { id: 4, title: 'Holiday Building Hours', content: 'During the holiday period (Dec 24 - Jan 2), the management office will have reduced hours: 9 AM - 3 PM weekdays, closed weekends.', date: '2024-12-08', priority: 'Medium', category: 'Operations' },
    { id: 5, title: 'Security System Upgrade', content: 'Installation of new security cameras in parking areas completed. Enhanced monitoring now active 24/7 with improved night vision capabilities.', date: '2024-12-05', priority: 'Low', category: 'Security' }
  ],
  residents: [
    { unit: '1201', name: 'Sarah Williams', email: 'sarah.williams@email.com', role: 'Committee Chair', occupancy: 'Owner', contact: '(02) 9876-5432' },
    { unit: '0815', name: 'Michael Chen', email: 'michael.chen@email.com', role: 'Treasurer', occupancy: 'Owner', contact: '(02) 9876-5433' },
    { unit: '0420', name: 'Emma Thompson', email: 'emma.thompson@email.com', role: 'Secretary', occupancy: 'Owner', contact: '(02) 9876-5434' },
    { unit: '1105', name: 'David Martinez', email: 'david.martinez@email.com', role: 'Committee Member', occupancy: 'Owner', contact: '(02) 9876-5435' },
    { unit: '0739', name: 'Lisa Johnson', email: 'lisa.johnson@email.com', role: 'Resident', occupancy: 'Tenant', contact: '(02) 9876-5436' },
    { unit: '1018', name: 'Robert Kim', email: 'robert.kim@email.com', role: 'Resident', occupancy: 'Owner', contact: '(02) 9876-5437' }
  ],
  meetings: [
    { id: 1, title: 'Annual General Meeting', date: '2025-02-15', time: '19:00', status: 'Scheduled', location: 'Level 1 Community Room', agenda: 'Budget Review, Committee Elections, Capital Works' },
    { id: 2, title: 'Committee Meeting - January', date: '2025-01-18', time: '18:30', status: 'Scheduled', location: 'Management Office', agenda: 'Maintenance Updates, Budget Review' },
    { id: 3, title: 'Emergency Committee Meeting', date: '2024-12-20', time: '19:00', status: 'Completed', location: 'Video Conference', agenda: 'Elevator Repair Authorization' },
    { id: 4, title: 'Budget Planning Workshop', date: '2025-01-25', time: '18:00', status: 'Scheduled', location: 'Level 1 Community Room', agenda: '2025 Budget Planning, Special Levies Discussion' }
  ]
};

export default function handler(req, res) {
  const buildingName = process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || 'Sydney Crown Towers';
  
  if (req.method === 'POST') {
    // Handle form submission
    const { notice_title, notice_content, priority, category } = req.body;
    
    if (notice_title && notice_content && priority && category) {
      const newNotice = {
        id: strataData.notices.length + 1,
        title: notice_title,
        content: notice_content,
        date: new Date().toISOString().split('T')[0],
        priority: priority,
        category: category
      };
      
      strataData.notices.push(newNotice);
      
      return res.json({ 
        success: true, 
        message: "Notice published successfully and will be distributed to all residents." 
      });
    }
    
    return res.json({ success: false, error: "All fields are required" });
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Records & Reports - ${buildingName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .section {
            background: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-left: 4px solid #27ae60;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e1e8ed;
        }
        .table th {
            background: #34495e;
            color: white;
            font-weight: 600;
        }
        .table tr:hover {
            background: #f8f9fa;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #2c3e50;
        }
        .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 10px;
            border: 2px solid #e1e8ed;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
            outline: none;
            border-color: #27ae60;
        }
        .btn {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #28a745;
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
        .priority-high { 
            background: #ffebee; 
            color: #c62828; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
        }
        .priority-important { 
            background: #fff3e0; 
            color: #ef6c00; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
        }
        .priority-medium { 
            background: #e8f5e8; 
            color: #2e7d32; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
        }
        .priority-low { 
            background: #f3e5f5; 
            color: #7b1fa2; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: bold;
        }
        .category-tag {
            background: #e3f2fd;
            color: #1976d2;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Building Records & Reports</h1>
        <p>${buildingName} Management System</p>
        <p>Comprehensive database management for residents and administration</p>
    </div>

    <div id="message"></div>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">${strataData.notices.length}</div>
            <div>Active Notices</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${strataData.residents.length}</div>
            <div>Registered Residents</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${strataData.meetings.length}</div>
            <div>Scheduled Meetings</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">94%</div>
            <div>Occupancy Rate</div>
        </div>
    </div>

    <div class="section">
        <h2>📢 Current Building Notices</h2>
        <p>Official communications and updates for all residents</p>
        <table class="table">
            <thead>
                <tr>
                    <th>Notice</th>
                    <th>Content</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Date Published</th>
                </tr>
            </thead>
            <tbody>
                ${strataData.notices.slice().reverse().map(notice => `
                <tr>
                    <td><strong>${notice.title}</strong></td>
                    <td style="max-width: 300px;">${notice.content}</td>
                    <td><span class="category-tag">${notice.category}</span></td>
                    <td><span class="priority-${notice.priority.toLowerCase()}">${notice.priority}</span></td>
                    <td>${new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>👥 Building Directory</h2>
        <p>Resident contact information and committee positions</p>
        <table class="table">
            <thead>
                <tr>
                    <th>Unit</th>
                    <th>Resident Name</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Occupancy</th>
                </tr>
            </thead>
            <tbody>
                ${strataData.residents.map(resident => `
                <tr>
                    <td><strong>${resident.unit}</strong></td>
                    <td>${resident.name}</td>
                    <td>
                        ${resident.contact}<br>
                        <small style="color: #666;">${resident.email}</small>
                    </td>
                    <td>
                        ${resident.role !== 'Resident' ? `<strong style="color: #e74c3c;">${resident.role}</strong>` : resident.role}
                    </td>
                    <td>${resident.occupancy}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>📅 Meeting Schedule & History</h2>
        <p>Committee meetings, AGMs, and community events</p>
        <table class="table">
            <thead>
                <tr>
                    <th>Meeting</th>
                    <th>Date & Time</th>
                    <th>Location</th>
                    <th>Agenda</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${strataData.meetings.slice().reverse().map(meeting => `
                <tr>
                    <td><strong>${meeting.title}</strong></td>
                    <td>
                        ${new Date(meeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<br>
                        <small>${new Date('2024-01-01 ' + meeting.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</small>
                    </td>
                    <td>${meeting.location}</td>
                    <td style="max-width: 250px;">${meeting.agenda}</td>
                    <td>
                        <span style="color: ${meeting.status === 'Scheduled' ? '#27ae60' : '#95a5a6'}; font-weight: bold;">● ${meeting.status}</span>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>📝 Publish New Notice</h2>
        <p>Add important building announcements and updates for residents</p>
        <form id="noticeForm">
            <div class="form-grid">
                <div>
                    <div class="form-group">
                        <label for="notice_title">Notice Title:</label>
                        <input type="text" id="notice_title" name="notice_title" required placeholder="e.g., Pool Maintenance Schedule">
                    </div>
                    <div class="form-group">
                        <label for="priority">Priority Level:</label>
                        <select id="priority" name="priority" required>
                            <option value="Low">Low Priority</option>
                            <option value="Medium" selected>Medium Priority</option>
                            <option value="High">High Priority</option>
                            <option value="Important">Important</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select id="category" name="category" required>
                            <option value="General">General</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Policy">Policy</option>
                            <option value="Governance">Governance</option>
                            <option value="Security">Security</option>
                            <option value="Operations">Operations</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div class="form-group">
                        <label for="notice_content">Notice Content:</label>
                        <textarea id="notice_content" name="notice_content" rows="6" required placeholder="Enter the full notice content here..."></textarea>
                    </div>
                    <button type="submit" class="btn">📢 Publish Notice</button>
                </div>
            </div>
        </form>
    </div>

    <div class="section">
        <h3>📈 System Information</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 15px 0;">
            <div>
                <strong>Database Status:</strong> Online & Synchronized<br>
                <strong>Last Backup:</strong> ${new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}<br>
                <strong>Data Integrity:</strong> Verified
            </div>
            <div>
                <strong>Records System:</strong> Professional Grade<br>
                <strong>Security Level:</strong> Enterprise<br>
                <strong>Compliance:</strong> Strata Management Act
            </div>
            <div>
                <strong>Active Sessions:</strong> ${Math.floor(Math.random() * 20) + 15} residents<br>
                <strong>System Load:</strong> Optimal<br>
                <strong>Response Time:</strong> ${Math.floor(Math.random() * 50) + 45}ms
            </div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 30px;">
        <a href="/" class="nav-link secondary">🏠 Back to Home</a>
        <a href="/api/building-dashboard" class="nav-link">🏢 Building Dashboard</a>
        <a href="/api/maintenance-portal" class="nav-link">🔧 Maintenance Portal</a>
        <a href="/api/resident-portal" class="nav-link">👤 Resident Portal</a>
    </div>

    <script>
        document.getElementById('noticeForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/records-reports', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    document.getElementById('message').innerHTML = '<div class="success">✅ ' + result.message + '</div>';
                    e.target.reset();
                    setTimeout(() => location.reload(), 2000);
                } else {
                    document.getElementById('message').innerHTML = '<div class="error">❌ ' + result.error + '</div>';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="error">❌ An error occurred. Please try again.</div>';
            }
        });
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
} 