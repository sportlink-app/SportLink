
# SportLink

Introduction
SportLink is a platform designed to connect athletes and sports enthusiasts for real-life street games and sports activities. Our goal is to simplify the process of finding and gathering teams for various sports, helping users stay active and social through sports.

Deployed Site: SportLink

Blog Article: SportLink Development Journey

Authors:

Simon
Seifeddine Aaza
Mohamed Mahla
Installation
To get a local copy up and running, follow these simple steps:

Clone the repository:

sh
Copier le code
git clone https://github.com/sportlink-app/SportLink.git
Navigate to the project directory:

sh
Copier le code
cd SportLink/server
Create a virtual environment:

sh
Copier le code
python3 -m venv venv
Activate the virtual environment:

sh
Copier le code
source venv/bin/activate
Install the dependencies:

sh
Copier le code
pip install -r requirements.txt
Run the application:

sh
Copier le code
gunicorn --bind 0.0.0.0:5005 app:app
Usage
Home Endpoint:

sh
Copier le code
curl -X GET http://localhost:5005/
Sign-up Endpoint:

sh
Copier le code
curl -X POST http://localhost:5005/signup -H "Content-Type: application/json" -d '{"username":"simoowolf", "password":"password123", "email":"simoowolf@example.com"}'
Login Endpoint:

sh
Copier le code
curl -X POST http://localhost:5005/login -H "Content-Type: application/json" -d '{"email":"simoowolf@example.com", "password":"password123"}'
Reset Password Request Endpoint:

sh
Copier le code
curl -X POST http://localhost:5005/reset-password-request -H "Content-Type: application/json" -d '{"email":"simoowolf@example.com"}'
Reset Password Endpoint:

sh
Copier le code
curl -X POST http://localhost:5005/reset-password -H "Content-Type: application/json" -d '{"token":"your_reset_token", "new_password":"newpassword123"}'
Get User Profile Endpoint:

sh
Copier le code
curl -X GET http://localhost:5005/profile?username=simoowolf
Update User Profile Endpoint:

sh
Copier le code
curl -X PUT http://localhost:5005/profile -H "Content-Type: application/json" -d '{"username":"simoowolf", "tel":"1234567890", "bio":"I love sports!", "sports":["BOX","basketball"], "availability":true, "city":"Agadir"}'
Delete User Account Endpoint:

sh
Copier le code
curl -X DELETE http://localhost:5005/profile?username=simoowolf
Get All Users Endpoint:

sh
Copier le code
curl -X GET http://localhost:5005/users
Get Single User Endpoint:

sh
Copier le code
curl -X GET http://localhost:5005/user/simoowolf
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch:
sh
Copier le code
git checkout -b feature/AmazingFeature
Commit your Changes:
sh
Copier le code
git commit -m 'Add some AmazingFeature'
Push to the Branch:
sh
Copier le code
git push origin feature/AmazingFeature
Open a Pull Request
Related Projects
Airbnb Clone
Another Related Project
Licensing
Distributed under the MIT License. See LICENSE for more information.
