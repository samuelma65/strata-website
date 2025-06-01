let maintenanceData = {
  requests: [
    { id: 'MR001', title: 'Elevator #2 Strange Noises', description: 'Residents report unusual grinding sounds from elevator #2 during operation. Occurs mainly during peak hours.', priority: 'High', unit: '1205', status: 'In Progress', date_created: '2024-12-10 09:15:00', submitted_by: 'sarah.williams', assigned_to: 'Elevator Maintenance Co.', estimated_completion: '2024-12-20' },
    { id: 'MR002', title: 'Pool Filter System Malfunction', description: 'Pool water clarity is deteriorating. Filter system appears to be running but not effectively filtering. Chemical levels normal.', priority: 'High', unit: 'Common', status: 'Scheduled', date_created: '2024-12-12 14:30:00', submitted_by: 'michael.chen', assigned_to: 'Aqua Systems Ltd.', estimated_completion: '2024-12-18' },
    { id: 'MR003', title: 'Parking Garage Light Replacement', description: 'Multiple LED lights in parking level B2 are flickering or completely out. Safety concern for residents.', priority: 'Medium', unit: 'Parking', status: 'Completed', date_created: '2024-12-05 16:45:00', submitted_by: 'emma.thompson', assigned_to: 'Building Maintenance', estimated_completion: '2024-12-08' }
  ],
  financialSummary: {
    total_income: 332500,
    total_expenses: 27850,
    net_balance: 304650,
    category_breakdown: {
      'Levies': 287500,
      'Insurance': 18500,
      'Maintenance': 3200,
      'Grounds': 2800,
      'Pool': 950,
      'Security': 1400,
      'Special Projects': 45000
    }
  }
};

export default function handler(req, res) {
  const buildingName = process.env.NEXT_PUBLIC_STRATA_BUILDING_NAME || 'Sydney Crown Towers';
  
  if (req.method === 'POST') {
    // Handle form submission
    const { title, unit, priority, contact_info, description } = req.body;
    
    // Simple validation
    const errors = [];
    if (!title || title.length < 5) errors.push("Title must be at least 5 characters long");
    if (!description || description.length < 10) errors.push("Description must be at least 10 characters long");
    if (!priority || !['Low', 'Medium', 'High', 'Urgent'].includes(priority)) errors.push("Valid priority level is required");
    if (!unit) errors.push("Unit number or location is required");
    if (!contact_info || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_info)) errors.push("Valid email address is required for contact");
    
    if (errors.length === 0) {
      // Add new request
      const newId = 'MR' + String(maintenanceData.requests.length + 1).padStart(3, '0');
      const newRequest = {
        id: newId,
        title: title,
        description: description,
        priority: priority,
        unit: unit,
        status: 'Submitted',
        date_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
        submitted_by: 'guest',
        contact_info: contact_info,
        assigned_to: 'Pending Assignment',
        estimated_completion: null
      };
      
      maintenanceData.requests.push(newRequest);
      
      // Return success response
      return res.json({ 
        success: true, 
        message: `Maintenance request submitted successfully! Your request ID is: ${newId}. You will receive email updates on progress.`,
        request_id: newId 
      });
    } else {
      return res.json({ success: false, errors: errors });
    }
  }

  if (req.query.export === 'maintenance') {
    // Handle CSV export
    let csv = "Request ID,Title,Description,Priority,Unit/Location,Status,Date Submitted,Submitted By,Assigned To,Est. Completion\n";
    
    maintenanceData.requests.forEach(request => {
      csv += `"${request.id}","${request.title}","${request.description}","${request.priority}","${request.unit}","${request.status}","${request.date_created}","${request.submitted_by}","${request.assigned_to}","${request.estimated_completion || 'TBD'}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="maintenance_requests_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.status(200).send(csv);
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance Portal - ${buildingName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            min-height: 100vh;
        }
        .portal-container {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .header {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .stats-banner {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 25px;
            margin: 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 0;
        }
        .stat-item {
            text-align: center;
        }
        .stat-number {
            font-size: 2.2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .section {
            padding: 30px;
            margin: 0;
            border-bottom: 1px solid #eee;
        }
        .section h2 {
            color: #2c3e50;
            margin-top: 0;
            border-bottom: 3px solid #ff6b6b;
            padding-bottom: 10px;
            display: inline-block;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        .form-group input, .form-group select, .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e8ed;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
            outline: none;
            border-color: #ff6b6b;
        }
        .btn {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
            text-decoration: none;
            display: inline-block;
            margin-right: 15px;
        }
        .btn:hover {
            transform: translateY(-3px);
        }
        .btn-secondary {
            background: linear-gradient(135deg, #3498db, #2980b9);
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .table th, .table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #f1f3f4;
        }
        .table th {
            background: #34495e;
            color: white;
            font-weight: 600;
        }
        .table tr:hover {
            background: #f8f9fa;
        }
        .priority-urgent { background: #ffebee; color: #c62828; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .priority-high { background: #fff3e0; color: #ef6c00; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .priority-medium { background: #e8f5e8; color: #2e7d32; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .priority-low { background: #f3e5f5; color: #7b1fa2; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-submitted { color: #f39c12; font-weight: bold; }
        .status-inprogress { color: #3498db; font-weight: bold; }
        .status-scheduled { color: #9b59b6; font-weight: bold; }
        .status-completed { color: #27ae60; font-weight: bold; }
        .success { background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 30px; border-left: 4px solid #28a745; }
        .error { background: #f8d7da; color: #721c24; padding: 20px; border-radius: 8px; margin: 20px 30px; border-left: 4px solid #dc3545; }
        .financial-positive { color: #27ae60; font-weight: 600; }
        .financial-negative { color: #e74c3c; font-weight: 600; }
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
    <div class="portal-container">
        <div class="header">
            <h1>🔧 Maintenance Portal</h1>
            <p>${buildingName} - Professional Building Management</p>
            <p>Submit requests, track progress, and manage building maintenance efficiently</p>
        </div>

        <div class="stats-banner">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">${maintenanceData.requests.length}</div>
                    <div>Total Requests</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${maintenanceData.requests.filter(r => r.status === 'In Progress').length}</div>
                    <div>Active Jobs</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">$${maintenanceData.financialSummary.net_balance.toLocaleString()}</div>
                    <div>Current Balance</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${maintenanceData.requests.filter(r => r.status === 'Completed').length}</div>
                    <div>Completed</div>
                </div>
            </div>
        </div>

        <div id="message"></div>

        <div class="section">
            <h2>📝 Submit Maintenance Request</h2>
            <p>Report building issues, request repairs, or schedule routine maintenance</p>
            <form id="maintenanceForm">
                <div class="form-grid">
                    <div>
                        <div class="form-group">
                            <label for="title">Request Title:</label>
                            <input type="text" id="title" name="title" required placeholder="Brief description of the issue">
                        </div>
                        <div class="form-group">
                            <label for="unit">Unit/Location:</label>
                            <input type="text" id="unit" name="unit" required placeholder="e.g., Unit 1205, Parking Level B2, Pool Area">
                        </div>
                        <div class="form-group">
                            <label for="priority">Priority Level:</label>
                            <select id="priority" name="priority" required>
                                <option value="">Select Priority</option>
                                <option value="Low">Low - Cosmetic/Non-urgent</option>
                                <option value="Medium">Medium - General maintenance</option>
                                <option value="High">High - Safety concern</option>
                                <option value="Urgent">Urgent - Emergency repair</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="contact_info">Contact Email:</label>
                            <input type="email" id="contact_info" name="contact_info" required placeholder="your.email@example.com">
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <label for="description">Detailed Description:</label>
                            <textarea id="description" name="description" rows="8" required placeholder="Please provide detailed information about the issue, including when it occurs, what you've observed, and any safety concerns..."></textarea>
                        </div>
                        <button type="submit" class="btn">🚀 Submit Request</button>
                    </div>
                </div>
            </form>
        </div>

        <div class="section">
            <h2>📊 Current Maintenance Requests</h2>
            <div style="margin-bottom: 20px;">
                <a href="?export=maintenance" class="btn btn-secondary">📥 Export Report (CSV)</a>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Assigned To</th>
                    </tr>
                </thead>
                <tbody>
                    ${maintenanceData.requests.slice().reverse().map(request => `
                    <tr>
                        <td><strong>${request.id}</strong></td>
                        <td>${request.title}</td>
                        <td><span class="priority-${request.priority.toLowerCase()}">${request.priority}</span></td>
                        <td>${request.unit}</td>
                        <td><span class="status-${request.status.toLowerCase().replace(' ', '')}">${request.status}</span></td>
                        <td>${new Date(request.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td>${request.assigned_to}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>💰 Financial Overview</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
                <div>
                    <h3>💼 Financial Summary</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                            <span>Total Income:</span>
                            <strong class="financial-positive">$${maintenanceData.financialSummary.total_income.toLocaleString()}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                            <span>Total Expenses:</span>
                            <strong class="financial-negative">$${maintenanceData.financialSummary.total_expenses.toLocaleString()}</strong>
                        </div>
                        <hr>
                        <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                            <span><strong>Net Balance:</strong></span>
                            <strong class="financial-positive">$${maintenanceData.financialSummary.net_balance.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>📈 Spending by Category</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        ${Object.entries(maintenanceData.financialSummary.category_breakdown).map(([category, amount]) => `
                        <div style="display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; border-bottom: 1px solid #eee;">
                            <span>${category}:</span>
                            <strong>$${amount.toLocaleString()}</strong>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center; padding: 30px;">
            <a href="/" class="nav-link secondary">🏠 Back to Home</a>
            <a href="/api/building-dashboard" class="nav-link">🏢 Building Dashboard</a>
            <a href="/api/records-reports" class="nav-link">📊 Records & Reports</a>
            <a href="/api/resident-portal" class="nav-link">👤 Resident Portal</a>
        </div>
    </div>

    <script>
        document.getElementById('maintenanceForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/api/maintenance-portal', {
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
                    // Reload page to show new request
                    setTimeout(() => location.reload(), 2000);
                } else {
                    document.getElementById('message').innerHTML = '<div class="error"><strong>Please correct the following errors:</strong><ul>' + 
                        result.errors.map(error => '<li>' + error + '</li>').join('') + '</ul></div>';
                }
            } catch (error) {
                document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
            }
        });
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
} 