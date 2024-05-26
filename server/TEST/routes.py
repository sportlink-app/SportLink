from flask import Flask, request, jsonify

app = Flask(__name__)

users = {
    'alice': 'password123',
    'bob': 'securepassword'
}

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    if username in users and users[username] == password:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    else:
        return jsonify({"message": "Invalid credentials", "status": "error"}), 401

@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    if username in users:
        return jsonify({"message": "Username already exists", "status": "error"}), 409
    else:
        users[username] = password
        return jsonify({"message": "User created successfully", "status": "success"}), 201

@app.route('/reset-password-request', methods=['POST'])
def reset_password_request():
    username = request.json['username']
    if username in users:
        # Simulate sending email
        return jsonify({"message": "Password reset email sent", "status": "success"}), 200
    else:
        return jsonify({"message": "Username not found", "status": "error"}), 404

@app.route('/reset-password', methods=['POST'])
def reset_password():
    username = request.json['username']
    new_password = request.json['new_password']
    if username in users:
        users[username] = new_password
        return jsonify({"message": "Password has been reset successfully", "status": "success"}), 200
    else:
        return jsonify({"message": "Username not found", "status": "error"}), 404


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

