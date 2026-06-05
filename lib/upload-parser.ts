import type { Customer } from './mock-data';

type UploadedRow = Record<string, unknown>;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export async function parseCustomerFile(file: File): Promise<Customer[]> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv') {
    return rowsToCustomers(parseCsv(await file.text()));
  }

  if (extension === 'xlsx' || extension === 'xls') {
    const XLSX = await import('xlsx');
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<UploadedRow>(firstSheet, { defval: '' });

    return rowsToCustomers(rows);
  }

  throw new Error('Please upload a CSV, XLS, or XLSX file.');
}

function rowsToCustomers(rows: UploadedRow[]): Customer[] {
  const customers = rows
    .map((row, index) => rowToCustomer(normalizeRow(row), index))
    .filter((customer): customer is Customer => Boolean(customer));

  if (customers.length === 0) {
    throw new Error('No usable customer rows were found. Include at least a customer name or email column.');
  }

  return customers;
}

function rowToCustomer(row: Record<string, unknown>, index: number): Customer | null {
  const name = textValue(row, ['customername', 'name', 'fullname', 'customer']);
  const email = textValue(row, ['email', 'emailaddress']);

  if (!name && !email) {
    return null;
  }

  return {
    id: `upload-${index + 1}`,
    name: name || email || `Customer ${index + 1}`,
    email: email || `customer${index + 1}@example.com`,
    phone: textValue(row, ['phone', 'phonenumber', 'mobile', 'mobilephone']) || '-',
    lastPurchaseDays: lastPurchaseDays(row),
    lifetimeSpend: numberValue(row, ['lifetimespend', 'ltv', 'revenue', 'totalspend', 'spend']) ?? 0,
    ordersCount: numberValue(row, ['orderscount', 'orders', 'ordercount', 'totalorders']) ?? 1,
    preferredCategory: textValue(row, ['preferredcategory', 'category', 'favoritecategory']) || 'General',
    location: textValue(row, ['location', 'city', 'region']) || 'Unknown',
    engagementScore: clamp(numberValue(row, ['agementscore', 'engagementscore', 'engagement', 'score']) ?? 50, 0, 100),
  };
}

function lastPurchaseDays(row: Record<string, unknown>) {
  const explicitDays = numberValue(row, ['lastpurchasedays', 'dayssincelastpurchase', 'daysinactive']);

  if (explicitDays !== undefined) {
    return Math.max(0, Math.round(explicitDays));
  }

  const rawDate = valueFor(row, ['lastpurchasedate', 'lastpurchase', 'lastorderdate']);

  if (rawDate instanceof Date && !Number.isNaN(rawDate.getTime())) {
    return Math.max(0, Math.round((Date.now() - rawDate.getTime()) / MS_PER_DAY));
  }

  if (typeof rawDate === 'number') {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    return Math.max(0, Math.round((Date.now() - (excelEpoch.getTime() + rawDate * MS_PER_DAY)) / MS_PER_DAY));
  }

  if (typeof rawDate === 'string' && rawDate.trim()) {
    const parsed = new Date(rawDate);

    if (!Number.isNaN(parsed.getTime())) {
      return Math.max(0, Math.round((Date.now() - parsed.getTime()) / MS_PER_DAY));
    }

    const daysMatch = rawDate.match(/\d+/);
    if (daysMatch) {
      return Number(daysMatch[0]);
    }
  }

  return 90;
}

function parseCsv(input: string): UploadedRow[] {
  const rows: string[][] = [];
  let current = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        index += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  row.push(current);
  rows.push(row);

  const [headers = [], ...dataRows] = rows.filter((cells) => cells.some((cell) => cell.trim()));

  return dataRows.map((cells) =>
    headers.reduce<UploadedRow>((record, header, index) => {
      record[header] = cells[index] ?? '';
      return record;
    }, {}),
  );
}

function normalizeRow(row: UploadedRow) {
  return Object.entries(row).reduce<Record<string, unknown>>((normalized, [key, value]) => {
    normalized[normalizeKey(key)] = value;
    return normalized;
  }, {});
}

function normalizeKey(key: string) {
  return key.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function valueFor(row: Record<string, unknown>, keys: string[]) {
  return keys.map((key) => row[key]).find((value) => value !== undefined && value !== '');
}

function textValue(row: Record<string, unknown>, keys: string[]) {
  const value = valueFor(row, keys);

  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
}

function numberValue(row: Record<string, unknown>, keys: string[]) {
  const value = valueFor(row, keys);

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}
