from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('kredoswift.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS service_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_name TEXT NOT NULL,
            conversion_rate REAL NOT NULL,
            min_amount REAL NOT NULL,
            max_amount REAL NOT NULL,
            recipient_number TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert default values if table is empty
    c.execute('SELECT COUNT(*) FROM service_config')
    if c.fetchone()[0] == 0:
        default_services = [
            ('Safaricom', 0.85, 50, 1000, '254700000000'),
            ('Airtel', 0.80, 50, 1000, '254700000001'),
            ('Bonga Points', 0.90, 100, 2000, '254700000002')
        ]
        c.executemany('''
            INSERT INTO service_config (service_name, conversion_rate, min_amount, max_amount, recipient_number)
            VALUES (?, ?, ?, ?, ?)
        ''', default_services)
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/api/get-service-config')
def get_service_config():
    conn = sqlite3.connect('kredoswift.db')
    c = conn.cursor()
    c.execute('SELECT service_name, conversion_rate, min_amount, max_amount, recipient_number FROM service_config')
    services = c.fetchall()
    conn.close()
    
    config = {}
    for service in services:
        config[service[0]] = {
            'conversionRate': service[1],
            'minAmount': service[2],
            'maxAmount': service[3],
            'recipientNumber': service[4]
        }
    
    return jsonify(config)

@app.route('/api/update-service-config', methods=['POST'])
def update_service_config():
    data = request.json
    service_name = data.get('service_name')
    conversion_rate = data.get('conversion_rate')
    min_amount = data.get('min_amount')
    max_amount = data.get('max_amount')
    recipient_number = data.get('recipient_number')
    
    if not all([service_name, conversion_rate, min_amount, max_amount, recipient_number]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    conn = sqlite3.connect('kredoswift.db')
    c = conn.cursor()
    c.execute('''
        UPDATE service_config 
        SET conversion_rate = ?, min_amount = ?, max_amount = ?, recipient_number = ?, updated_at = CURRENT_TIMESTAMP
        WHERE service_name = ?
    ''', (conversion_rate, min_amount, max_amount, recipient_number, service_name))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Service configuration updated successfully'})

if __name__ == '__main__':
    app.run(debug=True) 