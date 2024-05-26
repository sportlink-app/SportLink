import smtplib
from email.mime.text import MIMEText

def send_email(recipient_email, reset_link):
    sender_email = "mahla.esa@gmail.com"
    sender_password = "euqdtwbutkhzguxe"  # Make sure the app password is correct and has no spaces

    # Create the MIMEText object
    message = MIMEText(f"Please click on the link to reset your password: {reset_link}")
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = "Password Reset Request"

    # Connect to Gmail's SMTP server
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Start TLS encryption
            server.login(sender_email, sender_password)
            server.send_message(message)
            print("Email sent successfully!")
    except smtplib.SMTPException as e:
        print("Failed to send email:", e)

# Example usage
send_email("simoowolf8@gmail.com", "https://yourwebsite.com/reset?token=someuniqueid")

