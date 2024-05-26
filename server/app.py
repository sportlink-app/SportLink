from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

import secrets
import smtplib
from email.mime.text import MIMEText


app = Flask(__name__)
CORS(app)  # Enable CORS if necessary

# Database configuration
db_config = {
    'user': 'roota',
    'password': 'root',
    'host': 'localhost',
    'database': 'SPL',
    'raise_on_warnings': True
}

# Connect to the database
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        app.logger.error("Error connecting to database: %s", str(err))
        return None

@app.route('/')
def home():
    return jsonify({"message": "Welcome to SportLink API!"})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']  # In a real app, you should hash the password
    email = data['email']

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, password, email))
        conn.commit()
        return jsonify({"message": "User created successfully", "status": "success"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": str(err), "status": "error"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']  # In a real app, you should verify hashed passwords

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection failed", "status": "error"}), 500

    cursor = conn.cursor()
    try:
        cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
        record = cursor.fetchone()
        if record and record[0] == password:
            return jsonify({"message": "Login successful", "status": "success"}), 200
        else:
            return jsonify({"message": "Invalid username or password", "status": "error"}), 401
    except mysql.connector.Error as err:
        app.logger.error("Error during login: %s", str(err))
        return jsonify({"message": str(err), "status": "error"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/reset-password-request', methods=['POST'])
def reset_password_request():
    data = request.get_json()
    email = data['email']

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection failed", "status": "error"}), 500

    cursor = conn.cursor()
    try:
        cursor.execute("SELECT username FROM users WHERE email = %s", (email,))
        username = cursor.fetchone()
        if username:
            reset_token = secrets.token_urlsafe(16)
            cursor.execute("UPDATE users SET reset_token = %s WHERE email = %s", (reset_token, email))
            conn.commit()
            send_reset_email(email, reset_token)
            return jsonify({"message": "Reset link sent to your email", "status": "success"}), 200
        else:
            return jsonify({"message": "Email not found", "status": "error"}), 404
    except mysql.connector.Error as err:
        return jsonify({"message": str(err), "status": "error"}), 500
    finally:
        cursor.close()
        conn.close()

def send_reset_email(email, token):
    sender_email = "mahla.esa@gmail.com"
    sender_password = "euqdtwbutkhzguxe"  # Make sure the app password is correct and has no spaces
    msg = MIMEText(f"Please use this link to reset your password: http://100.25.202.2/reset-password?token={token}")
    msg['Subject'] = 'Reset Your Password'
    msg['From'] = sender_email
    msg['To'] = email

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Start TLS encryption
            server.login(sender_email, sender_password)
            server.send_message(msg)
            print("Email sent successfully!")
    except SMTPException as e:
        print(f"Failed to send email: {e}")

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data['token']
    new_password = data['new_password']  # Should be hashed in production

    conn = get_db_connection()
    if not conn:
        return jsonify({"message": "Database connection failed", "status": "error"}), 500

    cursor = conn.cursor()
    try:
        cursor.execute("SELECT email FROM users WHERE reset_token = %s", (token,))
        user_email = cursor.fetchone()
        if user_email:
            cursor.execute("UPDATE users SET password = %s, reset_token = NULL WHERE reset_token = %s", (new_password, token))
            conn.commit()
            return jsonify({"message": "Password reset successfully", "status": "success"}), 200
        else:
            return jsonify({"message": "Invalid token", "status": "error"}), 404
    except mysql.connector.Error as err:
        return jsonify({"message": str(err), "status": "error"}), 500
    finally:
        cursor.close()
        conn.close()


# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5005)

