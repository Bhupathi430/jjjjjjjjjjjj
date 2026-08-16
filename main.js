// Nexure Pvt Ltd - Management Portal & PDF Quotation Engine
import { 
  createIcons, 
  LayoutDashboard, 
  Globe, 
  PieChart, 
  Users, 
  Briefcase, 
  FileText, 
  Plus, 
  UserPlus, 
  Search, 
  Code2, 
  Download, 
  Eye, 
  Save, 
  Trash2, 
  Pencil,
  CheckCircle2, 
  Clock, 
  FilePlus 
} from 'lucide';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Lucide Icon Initialization
function initIcons() {
  createIcons({
    icons: {
      LayoutDashboard,
      Globe,
      PieChart,
      Users,
      Briefcase,
      FileText,
      Plus,
      UserPlus,
      Search,
      Code2,
      Download,
      Eye,
      Save,
      Trash2,
      Pencil,
      CheckCircle2,
      Clock,
      FilePlus
    }
  });
}

// =====================================================================
// LOCAL STORAGE DATA MANAGER (SEEDING & STATE PERSISTENCE)
// =====================================================================
const STORAGE_KEYS = {
  CLIENTS: 'nexure_clients_data_v1',
  EMPLOYEES: 'nexure_employees_data_v1',
  QUOTES: 'nexure_quotes_data_v1'
};

const DEFAULT_CLIENTS = [
  { id: 'c1', name: 'Ramesh Kumar', company: 'TechCorp Innovations', email: 'ramesh@techcorp.com', phone: '+91 98765 12345', budget: 150000, status: 'Active', date: '2026-07-10' },
  { id: 'c2', name: 'Priya Sundaram', company: 'Apex Digital Media', email: 'priya@apexdigital.io', phone: '+91 98123 45678', budget: 85000, status: 'Active', date: '2026-07-22' },
  { id: 'c3', name: 'Vikramaditya Roy', company: 'Roy Global Logistics', email: 'vikram@roylogistics.com', phone: '+91 99001 12233', budget: 220000, status: 'Lead', date: '2026-08-01' },
  { id: 'c4', name: 'Sneha Patel', company: 'Patel E-Commerce Hub', email: 'sneha@patelhub.in', phone: '+91 97766 55443', budget: 110000, status: 'Active', date: '2026-08-05' },
  { id: 'c5', name: 'David Miller', company: 'CloudSync Inc', email: 'david@cloudsync.com', phone: '+91 91234 56789', budget: 60000, status: 'Inactive', date: '2026-06-15' }
];

const DEFAULT_EMPLOYEES = [
  { id: 'e1', name: 'Bhupathi Vardhinedi', role: 'Founder & Lead Engineer', dept: 'Management', email: 'bhupathi@nexure.com', phone: '+91 98765 43210', date: '2025-01-01', salary: 120000, status: 'Active' },
  { id: 'e2', name: 'Ananya Rao', role: 'Senior Full-Stack Engineer', dept: 'Engineering', email: 'ananya@nexure.com', phone: '+91 98112 23344', date: '2025-03-15', salary: 85000, status: 'Active' },
  { id: 'e3', name: 'Karthik Varma', role: 'UI/UX Product Designer', dept: 'UI/UX Design', email: 'karthik@nexure.com', phone: '+91 99887 76655', date: '2025-06-01', salary: 70000, status: 'Active' },
  { id: 'e4', name: 'Meera Joshi', role: 'Frontend Developer', dept: 'Engineering', email: 'meera@nexure.com', phone: '+91 97654 32109', date: '2025-09-10', salary: 60000, status: 'Active' },
  { id: 'e5', name: 'Rohan Sharma', role: 'Client Success & Sales Lead', dept: 'Sales & Marketing', email: 'rohan@nexure.com', phone: '+91 91122 33445', date: '2025-11-01', salary: 65000, status: 'Active' },
  { id: 'e6', name: 'Divya Nair', role: 'Backend Engineer', dept: 'Engineering', email: 'divya@nexure.com', phone: '+91 92233 44556', date: '2026-02-15', salary: 75000, status: 'Active' }
];

const DEFAULT_QUOTES = [
  {
    quoteNumber: 'NEX-QT-2026-001',
    clientName: 'Ramesh Kumar',
    companyName: 'TechCorp Innovations',
    clientEmail: 'ramesh@techcorp.com',
    clientPhone: '+91 98765 12345',
    issueDate: '2026-08-10',
    validUntil: '2026-09-10',
    currency: '₹',
    items: [
      { name: 'Custom Full-Stack Web Application Engineering', qty: 1, rate: 120000 },
      { name: 'Figma UI/UX Interactive Prototype & Design System', qty: 1, rate: 30000 }
    ],
    terms: '1. 50% advance payment upon quote confirmation.\n2. 50% balance upon final project completion.',
    subtotal: 150000,
    taxPercent: 18,
    taxAmount: 27000,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 177000
  }
];

class DataManager {
  static getClients() {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      this.saveClients(DEFAULT_CLIENTS);
      return DEFAULT_CLIENTS;
    }
    return JSON.parse(raw);
  }

  static saveClients(clients) {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }

  static getEmployees() {
    const raw = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (!raw) {
      this.saveEmployees(DEFAULT_EMPLOYEES);
      return DEFAULT_EMPLOYEES;
    }
    return JSON.parse(raw);
  }

  static saveEmployees(employees) {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }

  static getQuotes() {
    const raw = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (!raw) {
      this.saveQuotes(DEFAULT_QUOTES);
      return DEFAULT_QUOTES;
    }
    return JSON.parse(raw);
  }

  static saveQuotes(quotes) {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }
}

// Toast Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Format Currency
function formatCurrency(val, currency = '₹') {
  return `${currency}${Number(val || 0).toLocaleString('en-IN')}`;
}

// =====================================================================
// APPLICATION LOGIC CONTROLLER
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
  initIcons();

  // Hide loading screen after 1s
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => loadingScreen.classList.add('hidden'), 1000);
  }

  // State Variables
  let clients = DataManager.getClients();
  let employees = DataManager.getEmployees();
  let quotes = DataManager.getQuotes();

  // Global View Switcher (Management Portal vs Public Website)
  const btnShowManagement = document.getElementById('btnShowManagement');
  const btnShowWebsite = document.getElementById('btnShowWebsite');
  const btnSwitchToMgmt = document.getElementById('btnSwitchToMgmt');
  const heroOpenMgmtBtn = document.getElementById('heroOpenMgmtBtn');
  const managementPortalView = document.getElementById('managementPortalView');
  const publicWebsiteView = document.getElementById('publicWebsiteView');

  function switchGlobalView(isManagement) {
    if (isManagement) {
      managementPortalView.classList.add('active');
      publicWebsiteView.classList.remove('active');
      btnShowManagement.classList.add('active');
      btnShowWebsite.classList.remove('active');
    } else {
      managementPortalView.classList.remove('active');
      publicWebsiteView.classList.add('active');
      btnShowManagement.classList.remove('active');
      btnShowWebsite.classList.add('active');
    }
  }

  btnShowManagement?.addEventListener('click', () => switchGlobalView(true));
  btnShowWebsite?.addEventListener('click', () => switchGlobalView(false));
  btnSwitchToMgmt?.addEventListener('click', () => switchGlobalView(true));
  heroOpenMgmtBtn?.addEventListener('click', () => switchGlobalView(true));

  // Management Subnav Tabs Switcher
  const mgmtTabs = document.querySelectorAll('.mgmt-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function switchMgmtTab(tabId) {
    mgmtTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });
    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('id') === tabId);
    });
  }

  mgmtTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchMgmtTab(targetTab);
    });
  });

  document.getElementById('dashViewAllClients')?.addEventListener('click', () => switchMgmtTab('tabClients'));
  document.getElementById('dashViewAllEmp')?.addEventListener('click', () => switchMgmtTab('tabEmployees'));
  document.getElementById('dashCreateQuoteBtn')?.addEventListener('click', () => switchMgmtTab('tabQuotes'));

  // =====================================================================
  // DASHBOARD METRICS & RECENT TABLES RENDERING
  // =====================================================================
  function renderDashboardMetrics() {
    const totalClients = clients.length;
    const activeClients = clients.filter(c => c.status === 'Active').length;
    const leadClients = clients.filter(c => c.status === 'Lead').length;

    const totalEmployees = employees.length;
    const engCount = employees.filter(e => e.dept === 'Engineering').length;
    const uiCount = employees.filter(e => e.dept === 'UI/UX Design').length;

    const totalQuotes = quotes.length;
    const totalQuoteVal = quotes.reduce((acc, q) => acc + (q.grandTotal || 0), 0);

    // Update Counter Badges
    document.getElementById('badgeTotalClients').textContent = totalClients;
    document.getElementById('badgeTotalEmployees').textContent = totalEmployees;
    document.getElementById('badgeTotalQuotes').textContent = totalQuotes;

    // Metric Cards Numbers
    document.getElementById('dashMetricClients').textContent = totalClients;
    document.getElementById('dashActiveClients').textContent = activeClients;
    document.getElementById('dashLeadClients').textContent = leadClients;

    document.getElementById('dashMetricEmployees').textContent = totalEmployees;
    document.getElementById('dashEmpDeptSubtext').textContent = `Engineering: ${engCount} • Design: ${uiCount}`;

    document.getElementById('dashMetricQuotes').textContent = totalQuotes;
    document.getElementById('dashMetricQuoteValue').textContent = formatCurrency(totalQuoteVal, '₹');

    // Render Recent Clients Table
    const recentClientsBody = document.getElementById('dashRecentClientsTable');
    if (recentClientsBody) {
      recentClientsBody.innerHTML = clients.slice(0, 4).map(c => `
        <tr>
          <td>
            <div class="user-cell">
              <div class="avatar-circle">${c.name.charAt(0)}</div>
              <div>
                <div class="user-name">${c.name}</div>
                <div class="user-sub">${c.company}</div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-${c.status.toLowerCase()}">${c.status}</span></td>
          <td><strong>${formatCurrency(c.budget, '₹')}</strong></td>
          <td>${c.email}</td>
        </tr>
      `).join('');
    }

    // Render Recent Employees Table
    const recentEmployeesBody = document.getElementById('dashRecentEmployeesTable');
    if (recentEmployeesBody) {
      recentEmployeesBody.innerHTML = employees.slice(0, 4).map(e => `
        <tr>
          <td>
            <div class="user-cell">
              <div class="avatar-circle">${e.name.charAt(0)}</div>
              <div>
                <div class="user-name">${e.name}</div>
                <div class="user-sub">${e.email}</div>
              </div>
            </div>
          </td>
          <td>${e.role}</td>
          <td><span class="badge badge-dept">${e.dept}</span></td>
          <td><span class="badge badge-active">${e.status}</span></td>
        </tr>
      `).join('');
    }
  }

  // =====================================================================
  // CLIENT MANAGEMENT SYSTEM
  // =====================================================================
  const clientsTableBody = document.getElementById('clientsTableBody');
  const searchClientInput = document.getElementById('searchClientInput');
  const filterClientStatus = document.getElementById('filterClientStatus');
  const clientsSummaryText = document.getElementById('clientsSummaryText');

  function renderClientsTable() {
    const query = (searchClientInput?.value || '').toLowerCase();
    const statusFilter = filterClientStatus?.value || 'ALL';

    const filtered = clients.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(query) ||
                            c.company.toLowerCase().includes(query) ||
                            c.email.toLowerCase().includes(query);
      const matchesStatus = (statusFilter === 'ALL') || (c.status === statusFilter);
      return matchesSearch && matchesStatus;
    });

    const activeCount = clients.filter(c => c.status === 'Active').length;
    const leadCount = clients.filter(c => c.status === 'Lead').length;
    if (clientsSummaryText) {
      clientsSummaryText.textContent = `Showing ${filtered.length} of ${clients.length} Clients (${activeCount} Active, ${leadCount} Prospects)`;
    }

    if (clientsTableBody) {
      if (filtered.length === 0) {
        clientsTableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted">No clients found matching filter.</td></tr>`;
        return;
      }

      clientsTableBody.innerHTML = filtered.map(c => `
        <tr>
          <td>
            <div class="user-cell">
              <div class="avatar-circle">${c.name.charAt(0)}</div>
              <div>
                <div class="user-name">${c.name}</div>
              </div>
            </div>
          </td>
          <td><strong>${c.company}</strong></td>
          <td>${c.email}</td>
          <td>${c.phone}</td>
          <td><strong>${formatCurrency(c.budget, '₹')}</strong></td>
          <td><span class="badge badge-${c.status.toLowerCase()}">${c.status}</span></td>
          <td>${c.date}</td>
          <td class="text-right">
            <button class="btn-icon edit-client-btn" data-id="${c.id}" title="Edit Client"><i data-lucide="pencil"></i></button>
            <button class="btn-icon btn-danger delete-client-btn" data-id="${c.id}" title="Delete Client"><i data-lucide="trash-2"></i></button>
          </td>
        </tr>
      `).join('');

      initIcons();

      // Attach Edit & Delete Listeners
      document.querySelectorAll('.edit-client-btn').forEach(btn => {
        btn.addEventListener('click', () => openClientModal(btn.getAttribute('data-id')));
      });

      document.querySelectorAll('.delete-client-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteClient(btn.getAttribute('data-id')));
      });
    }
  }

  searchClientInput?.addEventListener('input', renderClientsTable);
  filterClientStatus?.addEventListener('change', renderClientsTable);

  // Client Modal Handler
  const clientModal = document.getElementById('clientModal');
  const clientForm = document.getElementById('clientForm');
  const openAddClientModalBtn = document.getElementById('openAddClientModalBtn');
  const dashAddClientBtn = document.getElementById('dashAddClientBtn');
  const closeClientModalBtn = document.getElementById('closeClientModalBtn');
  const cancelClientModalBtn = document.getElementById('cancelClientModalBtn');

  function openClientModal(clientId = null) {
    clientForm.reset();
    if (clientId) {
      const client = clients.find(c => c.id === clientId);
      if (client) {
        document.getElementById('clientModalTitle').textContent = 'Edit Client Record';
        document.getElementById('clientId').value = client.id;
        document.getElementById('inputClientName').value = client.name;
        document.getElementById('inputClientCompany').value = client.company;
        document.getElementById('inputClientEmail').value = client.email;
        document.getElementById('inputClientPhone').value = client.phone;
        document.getElementById('inputClientBudget').value = client.budget;
        document.getElementById('inputClientStatus').value = client.status;
      }
    } else {
      document.getElementById('clientModalTitle').textContent = 'Add New Client';
      document.getElementById('clientId').value = '';
    }
    clientModal.classList.add('open');
  }

  function closeClientModal() {
    clientModal.classList.remove('open');
  }

  openAddClientModalBtn?.addEventListener('click', () => openClientModal());
  dashAddClientBtn?.addEventListener('click', () => openClientModal());
  closeClientModalBtn?.addEventListener('click', closeClientModal);
  cancelClientModalBtn?.addEventListener('click', closeClientModal);

  clientForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('clientId').value;
    const name = document.getElementById('inputClientName').value;
    const company = document.getElementById('inputClientCompany').value;
    const email = document.getElementById('inputClientEmail').value;
    const phone = document.getElementById('inputClientPhone').value;
    const budget = Number(document.getElementById('inputClientBudget').value);
    const status = document.getElementById('inputClientStatus').value;

    if (id) {
      clients = clients.map(c => c.id === id ? { ...c, name, company, email, phone, budget, status } : c);
      showToast(`Updated client ${name} successfully!`);
    } else {
      const newClient = {
        id: 'c_' + Date.now(),
        name,
        company,
        email,
        phone,
        budget,
        status,
        date: new Date().toISOString().split('T')[0]
      };
      clients.unshift(newClient);
      showToast(`Added new client ${name}!`);
    }

    DataManager.saveClients(clients);
    closeClientModal();
    renderClientsTable();
    renderDashboardMetrics();
    populateClientQuoteDropdown();
  });

  function deleteClient(id) {
    const client = clients.find(c => c.id === id);
    if (confirm(`Are you sure you want to delete client "${client?.name}"?`)) {
      clients = clients.filter(c => c.id !== id);
      DataManager.saveClients(clients);
      showToast(`Deleted client record.`);
      renderClientsTable();
      renderDashboardMetrics();
      populateClientQuoteDropdown();
    }
  }

  // =====================================================================
  // EMPLOYEE MANAGEMENT SYSTEM
  // =====================================================================
  const employeesTableBody = document.getElementById('employeesTableBody');
  const searchEmployeeInput = document.getElementById('searchEmployeeInput');
  const filterEmployeeDept = document.getElementById('filterEmployeeDept');
  const employeesSummaryText = document.getElementById('employeesSummaryText');
  const deptSummaryPills = document.getElementById('deptSummaryPills');

  function renderEmployeesTable() {
    const query = (searchEmployeeInput?.value || '').toLowerCase();
    const deptFilter = filterEmployeeDept?.value || 'ALL';

    const filtered = employees.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(query) ||
                            e.role.toLowerCase().includes(query) ||
                            e.email.toLowerCase().includes(query);
      const matchesDept = (deptFilter === 'ALL') || (e.dept === deptFilter);
      return matchesSearch && matchesDept;
    });

    if (employeesSummaryText) {
      employeesSummaryText.textContent = `Showing ${filtered.length} of ${employees.length} Total Employees`;
    }

    // Render Department Pills
    if (deptSummaryPills) {
      const depts = ['Engineering', 'UI/UX Design', 'Sales & Marketing', 'Management'];
      deptSummaryPills.innerHTML = depts.map(d => {
        const cnt = employees.filter(e => e.dept === d).length;
        return `<div class="dept-pill">${d}: <strong>${cnt}</strong></div>`;
      }).join('');
    }

    if (employeesTableBody) {
      if (filtered.length === 0) {
        employeesTableBody.innerHTML = `<tr><td colspan="9" class="text-center text-muted">No employees found matching filter.</td></tr>`;
        return;
      }

      employeesTableBody.innerHTML = filtered.map(e => `
        <tr>
          <td>
            <div class="user-cell">
              <div class="avatar-circle">${e.name.charAt(0)}</div>
              <div>
                <div class="user-name">${e.name}</div>
              </div>
            </div>
          </td>
          <td><strong>${e.role}</strong></td>
          <td><span class="badge badge-dept">${e.dept}</span></td>
          <td>${e.email}</td>
          <td>${e.phone}</td>
          <td>${e.date}</td>
          <td><strong>${formatCurrency(e.salary, '₹')}</strong></td>
          <td><span class="badge badge-active">${e.status}</span></td>
          <td class="text-right">
            <button class="btn-icon edit-employee-btn" data-id="${e.id}" title="Edit Employee"><i data-lucide="pencil"></i></button>
            <button class="btn-icon btn-danger delete-employee-btn" data-id="${e.id}" title="Delete Employee"><i data-lucide="trash-2"></i></button>
          </td>
        </tr>
      `).join('');

      initIcons();

      document.querySelectorAll('.edit-employee-btn').forEach(btn => {
        btn.addEventListener('click', () => openEmployeeModal(btn.getAttribute('data-id')));
      });

      document.querySelectorAll('.delete-employee-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteEmployee(btn.getAttribute('data-id')));
      });
    }
  }

  searchEmployeeInput?.addEventListener('input', renderEmployeesTable);
  filterEmployeeDept?.addEventListener('change', renderEmployeesTable);

  // Employee Modal Handler
  const employeeModal = document.getElementById('employeeModal');
  const employeeForm = document.getElementById('employeeForm');
  const openAddEmployeeModalBtn = document.getElementById('openAddEmployeeModalBtn');
  const dashAddEmpBtn = document.getElementById('dashAddEmpBtn');
  const closeEmployeeModalBtn = document.getElementById('closeEmployeeModalBtn');
  const cancelEmployeeModalBtn = document.getElementById('cancelEmployeeModalBtn');

  function openEmployeeModal(empId = null) {
    employeeForm.reset();
    if (empId) {
      const emp = employees.find(e => e.id === empId);
      if (emp) {
        document.getElementById('employeeModalTitle').textContent = 'Edit Employee Details';
        document.getElementById('employeeId').value = emp.id;
        document.getElementById('inputEmpName').value = emp.name;
        document.getElementById('inputEmpRole').value = emp.role;
        document.getElementById('inputEmpDept').value = emp.dept;
        document.getElementById('inputEmpEmail').value = emp.email;
        document.getElementById('inputEmpPhone').value = emp.phone;
        document.getElementById('inputEmpSalary').value = emp.salary;
        document.getElementById('inputEmpStatus').value = emp.status;
      }
    } else {
      document.getElementById('employeeModalTitle').textContent = 'Add New Employee';
      document.getElementById('employeeId').value = '';
    }
    employeeModal.classList.add('open');
  }

  function closeEmployeeModal() {
    employeeModal.classList.remove('open');
  }

  openAddEmployeeModalBtn?.addEventListener('click', () => openEmployeeModal());
  dashAddEmpBtn?.addEventListener('click', () => openEmployeeModal());
  closeEmployeeModalBtn?.addEventListener('click', closeEmployeeModal);
  cancelEmployeeModalBtn?.addEventListener('click', closeEmployeeModal);

  employeeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('inputEmpName').value;
    const role = document.getElementById('inputEmpRole').value;
    const dept = document.getElementById('inputEmpDept').value;
    const email = document.getElementById('inputEmpEmail').value;
    const phone = document.getElementById('inputEmpPhone').value;
    const salary = Number(document.getElementById('inputEmpSalary').value);
    const status = document.getElementById('inputEmpStatus').value;

    if (id) {
      employees = employees.map(e => e.id === id ? { ...e, name, role, dept, email, phone, salary, status } : e);
      showToast(`Updated employee ${name}!`);
    } else {
      const newEmp = {
        id: 'e_' + Date.now(),
        name,
        role,
        dept,
        email,
        phone,
        salary,
        status,
        date: new Date().toISOString().split('T')[0]
      };
      employees.unshift(newEmp);
      showToast(`Added employee ${name}!`);
    }

    DataManager.saveEmployees(employees);
    closeEmployeeModal();
    renderEmployeesTable();
    renderDashboardMetrics();
  });

  function deleteEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (confirm(`Are you sure you want to remove employee "${emp?.name}"?`)) {
      employees = employees.filter(e => e.id !== id);
      DataManager.saveEmployees(employees);
      showToast(`Removed employee record.`);
      renderEmployeesTable();
      renderDashboardMetrics();
    }
  }

  // =====================================================================
  // INSTANT PDF QUOTATION ENGINE & CALCULATOR
  // =====================================================================
  const subtabCreateQuote = document.getElementById('subtabCreateQuote');
  const subtabQuoteHistory = document.getElementById('subtabQuoteHistory');
  const quoteCreateSubView = document.getElementById('quoteCreateSubView');
  const quoteHistorySubView = document.getElementById('quoteHistorySubView');

  subtabCreateQuote?.addEventListener('click', () => {
    subtabCreateQuote.classList.add('active');
    subtabQuoteHistory.classList.remove('active');
    quoteCreateSubView.classList.add('active');
    quoteHistorySubView.classList.remove('active');
  });

  subtabQuoteHistory?.addEventListener('click', () => {
    subtabCreateQuote.classList.remove('active');
    subtabQuoteHistory.classList.add('active');
    quoteCreateSubView.classList.remove('active');
    quoteHistorySubView.classList.add('active');
    renderQuoteHistoryTable();
  });

  // Client Quick Select Options
  function populateClientQuoteDropdown() {
    const selectClientForQuote = document.getElementById('selectClientForQuote');
    if (!selectClientForQuote) return;
    selectClientForQuote.innerHTML = `<option value="">-- Choose Existing Client --</option>` +
      clients.map(c => `<option value="${c.id}">${c.name} (${c.company})</option>`).join('');
  }

  document.getElementById('selectClientForQuote')?.addEventListener('change', (e) => {
    const clientId = e.target.value;
    if (!clientId) return;
    const client = clients.find(c => c.id === clientId);
    if (client) {
      document.getElementById('quoteClientName').value = client.name;
      document.getElementById('quoteCompanyName').value = client.company;
      document.getElementById('quoteClientEmail').value = client.email;
      document.getElementById('quoteClientPhone').value = client.phone;
    }
  });

  // Initialize Default Form Dates & Ref Number
  function initQuoteFormDefaults() {
    const quoteNumberInput = document.getElementById('quoteNumber');
    const quoteDateInput = document.getElementById('quoteDate');
    const quoteValidInput = document.getElementById('quoteValidUntil');

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    if (quoteNumberInput) quoteNumberInput.value = `NEX-QT-${today.getFullYear()}-${String(quotes.length + 1).padStart(3, '0')}`;
    if (quoteDateInput) quoteDateInput.value = today.toISOString().split('T')[0];
    if (quoteValidInput) quoteValidInput.value = nextMonth.toISOString().split('T')[0];
  }

  // Dynamic Line Items State & Renderer
  let quoteLineItems = [
    { name: 'Full-Stack Web Engineering & Portal Development', qty: 1, rate: 85000 },
    { name: 'UI/UX Design & Interactive Prototype', qty: 1, rate: 25000 }
  ];

  const lineItemsTbody = document.getElementById('lineItemsTbody');
  const addLineItemBtn = document.getElementById('addLineItemBtn');

  function renderLineItems() {
    if (!lineItemsTbody) return;
    lineItemsTbody.innerHTML = quoteLineItems.map((item, index) => `
      <tr>
        <td>
          <input type="text" class="form-input item-name-input" data-index="${index}" value="${item.name}" placeholder="Service description...">
        </td>
        <td>
          <input type="number" class="form-input item-qty-input" data-index="${index}" value="${item.qty}" min="1" style="text-align:center">
        </td>
        <td>
          <input type="number" class="form-input item-rate-input" data-index="${index}" value="${item.rate}" min="0">
        </td>
        <td><strong>${formatCurrency(item.qty * item.rate, document.getElementById('quoteCurrency')?.value || '₹')}</strong></td>
        <td class="text-right">
          <button type="button" class="btn-icon btn-danger remove-item-btn" data-index="${index}"><i data-lucide="trash-2"></i></button>
        </td>
      </tr>
    `).join('');

    initIcons();

    // Input listeners
    lineItemsTbody.querySelectorAll('.item-name-input').forEach(input => {
      input.addEventListener('input', (e) => {
        quoteLineItems[e.target.dataset.index].name = e.target.value;
      });
    });

    lineItemsTbody.querySelectorAll('.item-qty-input').forEach(input => {
      input.addEventListener('input', (e) => {
        quoteLineItems[e.target.dataset.index].qty = Number(e.target.value) || 0;
        calculateQuoteTotals();
        renderLineItems();
      });
    });

    lineItemsTbody.querySelectorAll('.item-rate-input').forEach(input => {
      input.addEventListener('input', (e) => {
        quoteLineItems[e.target.dataset.index].rate = Number(e.target.value) || 0;
        calculateQuoteTotals();
        renderLineItems();
      });
    });

    lineItemsTbody.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        quoteLineItems.splice(idx, 1);
        renderLineItems();
        calculateQuoteTotals();
      });
    });

    calculateQuoteTotals();
  }

  addLineItemBtn?.addEventListener('click', () => {
    quoteLineItems.push({ name: 'Additional Service / Deliverable', qty: 1, rate: 10000 });
    renderLineItems();
  });

  // Calculate Subtotal, Tax, Discount, Grand Total
  function calculateQuoteTotals() {
    const currency = document.getElementById('quoteCurrency')?.value || '₹';
    const subtotal = quoteLineItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const taxPercent = Number(document.getElementById('quoteTaxPercent')?.value || 0);
    const discountPercent = Number(document.getElementById('quoteDiscount')?.value || 0);

    const taxAmount = (subtotal * taxPercent) / 100;
    const discountAmount = (subtotal * discountPercent) / 100;
    const grandTotal = subtotal + taxAmount - discountAmount;

    document.getElementById('calcSubtotalDisplay').textContent = formatCurrency(subtotal, currency);
    document.getElementById('calcTaxDisplay').textContent = formatCurrency(taxAmount, currency);
    document.getElementById('calcDiscountDisplay').textContent = formatCurrency(discountAmount, currency);
    document.getElementById('calcGrandTotalDisplay').textContent = formatCurrency(grandTotal, currency);

    return { currency, subtotal, taxPercent, taxAmount, discountPercent, discountAmount, grandTotal };
  }

  document.getElementById('quoteCurrency')?.addEventListener('change', () => { renderLineItems(); });
  document.getElementById('quoteTaxPercent')?.addEventListener('input', calculateQuoteTotals);
  document.getElementById('quoteDiscount')?.addEventListener('input', calculateQuoteTotals);

  // Populate PDF Document Template for Preview & Download
  function populatePdfTemplate() {
    const totals = calculateQuoteTotals();
    const quoteNum = document.getElementById('quoteNumber')?.value || 'NEX-QT-001';
    const issueDate = document.getElementById('quoteDate')?.value || '';
    const validUntil = document.getElementById('quoteValidUntil')?.value || '';
    const clientName = document.getElementById('quoteClientName')?.value || 'Client Name';
    const companyName = document.getElementById('quoteCompanyName')?.value || 'Company';
    const clientEmail = document.getElementById('quoteClientEmail')?.value || '';
    const clientPhone = document.getElementById('quoteClientPhone')?.value || '';
    const terms = document.getElementById('quoteTerms')?.value || '';

    document.getElementById('pdfRenderNumber').textContent = quoteNum;
    document.getElementById('pdfRenderDate').textContent = issueDate;
    document.getElementById('pdfRenderValidUntil').textContent = validUntil;
    document.getElementById('pdfRenderClientName').textContent = clientName;
    document.getElementById('pdfRenderCompanyName').textContent = companyName;
    document.getElementById('pdfRenderClientEmail').textContent = clientEmail;
    document.getElementById('pdfRenderClientPhone').textContent = clientPhone;

    document.getElementById('pdfRenderTerms').innerHTML = terms.replace(/\n/g, '<br>');

    // Render Table Items
    const pdfItemsTbody = document.getElementById('pdfRenderItemsTbody');
    if (pdfItemsTbody) {
      pdfItemsTbody.innerHTML = quoteLineItems.map((item, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${item.name}</strong></td>
          <td class="text-center">${item.qty}</td>
          <td class="text-right">${formatCurrency(item.rate, totals.currency)}</td>
          <td class="text-right"><strong>${formatCurrency(item.qty * item.rate, totals.currency)}</strong></td>
        </tr>
      `).join('');
    }

    document.getElementById('pdfRenderSubtotal').textContent = formatCurrency(totals.subtotal, totals.currency);
    document.getElementById('pdfRenderTaxRate').textContent = totals.taxPercent;
    document.getElementById('pdfRenderTax').textContent = formatCurrency(totals.taxAmount, totals.currency);

    const discountRow = document.getElementById('pdfRenderDiscountRow');
    if (totals.discountPercent > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('pdfRenderDiscountRate').textContent = totals.discountPercent;
      document.getElementById('pdfRenderDiscount').textContent = `-${formatCurrency(totals.discountAmount, totals.currency)}`;
    } else {
      discountRow.style.display = 'none';
    }

    document.getElementById('pdfRenderGrandTotal').textContent = formatCurrency(totals.grandTotal, totals.currency);

    return { quoteNum, clientName, companyName, totals };
  }

  // Live PDF Preview Modal
  const pdfPreviewModal = document.getElementById('pdfPreviewModal');
  const previewPdfBtn = document.getElementById('previewPdfBtn');
  const closePdfModalBtn = document.getElementById('closePdfModalBtn');

  previewPdfBtn?.addEventListener('click', () => {
    populatePdfTemplate();
    pdfPreviewModal.classList.add('open');
  });

  closePdfModalBtn?.addEventListener('click', () => {
    pdfPreviewModal.classList.remove('open');
  });

  // INSTANT PDF GENERATION ENGINE (jsPDF + html2canvas)
  async function downloadInstantPDF() {
    const { quoteNum } = populatePdfTemplate();
    pdfPreviewModal.classList.add('open');
    showToast('Generating high-resolution PDF quotation...');

    const pdfDocumentTemplate = document.getElementById('pdfDocumentTemplate');
    if (!pdfDocumentTemplate) return;

    try {
      const canvas = await html2canvas(pdfDocumentTemplate, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Nexure_Quotation_${quoteNum}.pdf`);

      showToast(`Downloaded Nexure_Quotation_${quoteNum}.pdf successfully!`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      window.print();
    }
  }

  document.getElementById('generatePdfBtn')?.addEventListener('click', downloadInstantPDF);
  document.getElementById('modalDownloadPdfBtn')?.addEventListener('click', downloadInstantPDF);

  // Save Quote to History
  document.getElementById('saveQuoteBtn')?.addEventListener('click', () => {
    const totals = calculateQuoteTotals();
    const quoteNum = document.getElementById('quoteNumber')?.value || 'NEX-QT-001';
    const clientName = document.getElementById('quoteClientName')?.value || 'Client';
    const companyName = document.getElementById('quoteCompanyName')?.value || 'Company';

    const newQuote = {
      quoteNumber: quoteNum,
      clientName,
      companyName,
      clientEmail: document.getElementById('quoteClientEmail')?.value || '',
      clientPhone: document.getElementById('quoteClientPhone')?.value || '',
      issueDate: document.getElementById('quoteDate')?.value || '',
      validUntil: document.getElementById('quoteValidUntil')?.value || '',
      currency: totals.currency,
      items: [...quoteLineItems],
      terms: document.getElementById('quoteTerms')?.value || '',
      subtotal: totals.subtotal,
      taxPercent: totals.taxPercent,
      taxAmount: totals.taxAmount,
      discountPercent: totals.discountPercent,
      discountAmount: totals.discountAmount,
      grandTotal: totals.grandTotal
    };

    // Replace existing if same number, or unshift new
    const existingIdx = quotes.findIndex(q => q.quoteNumber === quoteNum);
    if (existingIdx >= 0) {
      quotes[existingIdx] = newQuote;
    } else {
      quotes.unshift(newQuote);
    }

    DataManager.saveQuotes(quotes);
    showToast(`Quotation ${quoteNum} saved to history!`);
    renderDashboardMetrics();
    initQuoteFormDefaults();
  });

  // Render Quote History Table
  function renderQuoteHistoryTable() {
    const quoteHistoryTbody = document.getElementById('quoteHistoryTbody');
    const quoteHistoryCount = document.getElementById('quoteHistoryCount');

    if (quoteHistoryCount) quoteHistoryCount.textContent = quotes.length;

    if (quoteHistoryTbody) {
      if (quotes.length === 0) {
        quoteHistoryTbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No quotes created yet.</td></tr>`;
        return;
      }

      quoteHistoryTbody.innerHTML = quotes.map((q, idx) => `
        <tr>
          <td><strong>${q.quoteNumber}</strong></td>
          <td>${q.clientName}</td>
          <td>${q.companyName}</td>
          <td>${q.issueDate}</td>
          <td><strong>${formatCurrency(q.grandTotal, q.currency || '₹')}</strong></td>
          <td class="text-right">
            <button class="btn btn-emerald btn-xs re-download-btn" data-idx="${idx}"><i data-lucide="download"></i> Download PDF</button>
            <button class="btn-icon btn-danger delete-quote-btn" data-idx="${idx}"><i data-lucide="trash-2"></i></button>
          </td>
        </tr>
      `).join('');

      initIcons();

      quoteHistoryTbody.querySelectorAll('.re-download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const q = quotes[Number(btn.dataset.idx)];
          if (q) {
            quoteLineItems = [...q.items];
            document.getElementById('quoteNumber').value = q.quoteNumber;
            document.getElementById('quoteDate').value = q.issueDate;
            document.getElementById('quoteValidUntil').value = q.validUntil;
            document.getElementById('quoteClientName').value = q.clientName;
            document.getElementById('quoteCompanyName').value = q.companyName;
            document.getElementById('quoteClientEmail').value = q.clientEmail;
            document.getElementById('quoteClientPhone').value = q.clientPhone;
            document.getElementById('quoteTerms').value = q.terms;
            renderLineItems();
            downloadInstantPDF();
          }
        });
      });

      quoteHistoryTbody.querySelectorAll('.delete-quote-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.idx);
          if (confirm('Delete this saved quote record?')) {
            quotes.splice(idx, 1);
            DataManager.saveQuotes(quotes);
            showToast('Quote record deleted.');
            renderQuoteHistoryTable();
            renderDashboardMetrics();
          }
        });
      });
    }
  }

  // INITIALIZE ENTIRE SYSTEM STATE
  renderDashboardMetrics();
  renderClientsTable();
  renderEmployeesTable();
  populateClientQuoteDropdown();
  initQuoteFormDefaults();
  renderLineItems();

  console.log('Nexure Pvt Ltd Management System initialized successfully.');
});
