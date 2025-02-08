from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from mood_analysis import analyze_mood

#THIS IS FIDHA'S COMMENT
app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    user_message = data.get("message", "")
    mood_result = analyze_mood(user_message)
    return jsonify({"mood": mood_result})

if __name__ == "__main__":
    app.run(debug=True)
